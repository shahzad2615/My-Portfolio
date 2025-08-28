// NeuronCursor.tsx - Fully Responsive with Mobile Support
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PARTICLE_COUNT = 24;
const CONNECTION_DISTANCE = 35;
const CURSOR_INFLUENCE_RADIUS = 40;
const REPEL_FORCE = 0.8;
const ATTRACTION_FORCE = 0.3;

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  pulsePhase: number;
  energy: number;
}

const generateParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return {
      id: i,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      originalX: x,
      originalY: y,
      pulsePhase: Math.random() * Math.PI * 2,
      energy: 0,
    };
  });

const NeuronCursor: React.FC = () => {
  const [particles, setParticles] = useState(generateParticles);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  // Detect mobile device and screen dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  // Get normalized coordinates from any event type
  const getCoordinatesFromEvent = useCallback((
    e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>
  ) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;

    let clientX: number, clientY: number;

    if ('touches' in e && e.touches.length > 0) {
      // Touch event - use first touch point
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      // Touch end event
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if ('clientX' in e) {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return null;
    }

    // Convert to normalized coordinates (0-100)
    const mouseX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const mouseY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    return { x: mouseX, y: mouseY };
  }, []);

  // Desktop mouse interactions
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isMobile) return; // Skip mouse events on mobile devices
    
    const coords = getCoordinatesFromEvent(e);
    if (coords) {
      setMouse(coords);
      setIsInteracting(true);
    }
  }, [isMobile, getCoordinatesFromEvent]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsInteracting(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsInteracting(false);
    }
  }, [isMobile]);

  // Mobile touch interactions
  const handleTouchStart = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault(); // Prevent scrolling and other default behaviors
    const coords = getCoordinatesFromEvent(e);
    if (coords) {
      setMouse(coords);
      setIsInteracting(true);
    }
  }, [getCoordinatesFromEvent]);

  const handleTouchMove = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault(); // Prevent scrolling
    const coords = getCoordinatesFromEvent(e);
    if (coords) {
      setMouse(coords);
      setIsInteracting(true);
    }
  }, [getCoordinatesFromEvent]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault();
    // Keep interaction active for a short moment after touch ends
    setTimeout(() => setIsInteracting(false), 800);
  }, []);

  // Continuous auto-movement ONLY for mobile devices
  useEffect(() => {
    if (!isMobile) return; // Only run on mobile

    let animationId: number;
    let angle = 0;
    const centerX = 50;
    const centerY = 50;
    const radiusX = 25;
    const radiusY = 20;

    const animate = () => {
      if (!isInteracting) {
        // Create smooth circular/orbital movement for mobile only
        angle += 0.008; // Slow, smooth movement
        const x = centerX + Math.sin(angle) * radiusX + Math.sin(angle * 2.3) * 8;
        const y = centerY + Math.cos(angle) * radiusY + Math.cos(angle * 1.7) * 6;
        
        setMouse({
          x: Math.max(5, Math.min(95, x)),
          y: Math.max(5, Math.min(95, y))
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMobile, isInteracting]);

  // Physics simulation with responsive adjustments
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      
      setParticles(prevParticles => {
        const newParticles = prevParticles.map(particle => {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx * 0.98; // Damping
          let newVy = particle.vy * 0.98;
          let energy = particle.energy * 0.95;

          // Responsive interaction effects
          const mobileMultiplier = isMobile ? 1.8 : 1; // Stronger effect on mobile
          const influenceRadius = CURSOR_INFLUENCE_RADIUS * mobileMultiplier;
          const forceMultiplier = isMobile ? 1.2 : 1;

          // Desktop: hover-based interaction, Mobile: always active with auto-movement
          const shouldInteract = isMobile ? true : isInteracting;

          if (shouldInteract && distance < influenceRadius) {
            const force = (1 - distance / influenceRadius) * REPEL_FORCE * forceMultiplier;
            const angle = Math.atan2(dy, dx);
            newVx += Math.cos(angle) * force * 0.12;
            newVy += Math.sin(angle) * force * 0.12;
            energy = Math.min(1, energy + force * 0.6);
          }

          // Gentle attraction back to original position
          const returnDx = particle.originalX - newX;
          const returnDy = particle.originalY - newY;
          const returnForce = isMobile ? 0.003 : 0.002;
          newVx += returnDx * returnForce;
          newVy += returnDy * returnForce;

          // Boundary conditions with soft bounce
          if (newX < 0 || newX > 100) {
            newVx *= -0.7;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY < 0 || newY > 100) {
            newVy *= -0.7;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            energy,
            pulsePhase: particle.pulsePhase + (isMobile ? 0.04 : 0.05),
          };
        });

        // Update active connections
        const connections: string[] = [];
        const connectionDistance = isMobile ? CONNECTION_DISTANCE * 1.1 : CONNECTION_DISTANCE;
        
        for (let i = 0; i < newParticles.length; i++) {
          for (let j = i + 1; j < newParticles.length; j++) {
            const dx = newParticles[i].x - newParticles[j].x;
            const dy = newParticles[i].y - newParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const energy = (newParticles[i].energy + newParticles[j].energy) / 2;
              if (energy > 0.1 || Math.random() < 0.4) {
                connections.push(`${i}-${j}`);
              }
            }
          }
        }
        setActiveConnections(connections);

        return newParticles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouse, isInteracting, isMobile]);

  // Responsive values
  const gridSize = isMobile ? '25px 25px' : dimensions.width < 1024 ? '35px 35px' : '50px 50px';
  const ambientParticleCount = isMobile ? 3 : dimensions.width < 1024 ? 5 : 8;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Responsive background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: gridSize
          }} 
        />
      </div>

      {/* Main SVG with full touch and mouse support */}
      <svg
        ref={svgRef}
        className={`absolute inset-0 w-full h-full ${isMobile ? 'touch-none' : 'cursor-none'}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <defs>
          {/* Responsive gradient definitions */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity={isMobile ? "0.9" : "0.8"} />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity={isMobile ? "0.7" : "0.6"} />
            <stop offset="100%" stopColor="#0080ff" stopOpacity={isMobile ? "0.5" : "0.4"} />
          </radialGradient>
          
          <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity={isMobile ? "0.9" : "0.8"} />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity={isMobile ? "0.3" : "0.2"} />
          </radialGradient>

          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity={isMobile ? "0.7" : "0.6"} />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity={isMobile ? "0.9" : "0.8"} />
            <stop offset="100%" stopColor="#00ffff" stopOpacity={isMobile ? "0.7" : "0.6"} />
          </linearGradient>

          {/* Responsive filters for performance */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isMobile ? "1.2" : "2"} result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="pulse" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={isMobile ? "0.8" : "1.5"} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Responsive connections */}
        {particles.map((a, i) =>
          particles.slice(i + 1).map((b, j) => {
            const realJ = i + 1 + j;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const connectionDistance = isMobile ? CONNECTION_DISTANCE * 1.1 : CONNECTION_DISTANCE;
            
            if (distance < connectionDistance) {
              const opacity = Math.max(0.15, 1 - distance / connectionDistance);
              const energy = (a.energy + b.energy) / 2;
              const isActive = activeConnections.includes(`${i}-${realJ}`);
              
              return (
                <motion.line
                  key={`connection-${i}-${realJ}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isActive && energy > 0.3 ? "url(#connectionGradient)" : "#00ffff"}
                  strokeWidth={
                    isActive && energy > 0.3 
                      ? (isMobile ? "0.6" : "0.4")
                      : (isMobile ? "0.4" : "0.2")
                  }
                  strokeOpacity={opacity * (0.4 + energy * 0.6)}
                  filter={isActive && energy > 0.3 ? "url(#glow)" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: isActive ? 1 : 0.7,
                    strokeOpacity: opacity * (0.4 + energy * 0.6)
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            }
            return null;
          })
        )}

        {/* Responsive particles/nodes */}
        {particles.map((particle, i) => {
          const basePulseSize = 1.5 + Math.sin(particle.pulsePhase) * 0.5;
          const energySize = 1 + particle.energy * 2;
          const mobileScale = isMobile ? 1.4 : 1;
          const finalSize = basePulseSize * energySize * mobileScale;
          
          return (
            <g key={particle.id}>
              {/* Enhanced energy glow for mobile visibility */}
              {particle.energy > (isMobile ? 0.15 : 0.2) && (
                <motion.circle
                  cx={particle.x}
                  cy={particle.y}
                  r={finalSize * (isMobile ? 2 : 1.5)}
                  fill="url(#energyGradient)"
                  fillOpacity={particle.energy * (isMobile ? 0.4 : 0.3)}
                  filter="url(#glow)"
                  animate={{
                    r: [
                      finalSize * (isMobile ? 2 : 1.5), 
                      finalSize * (isMobile ? 3 : 2.5), 
                      finalSize * (isMobile ? 2 : 1.5)
                    ],
                  }}
                  transition={{
                    duration: isMobile ? 1.5 : 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              {/* Main particle with responsive sizing */}
              <motion.circle
                cx={particle.x}
                cy={particle.y}
                r={finalSize * (isMobile ? 0.8 : 0.6)}
                fill={particle.energy > 0.3 ? "url(#energyGradient)" : "url(#nodeGradient)"}
                filter="url(#pulse)"
                animate={{
                  r: finalSize * (isMobile ? 1.2 : 1),
                  fillOpacity: 0.7 + particle.energy * 0.3,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Core dot with responsive sizing */}
              <circle
                cx={particle.x}
                cy={particle.y}
                r={isMobile ? "0.5" : "0.3"}
                fill="#ffffff"
                fillOpacity={0.9 + particle.energy * 0.1}
              />
            </g>
          );
        })}

        {/* Interaction indicator: Desktop = hover only, Mobile = always visible */}
        {(isMobile || isInteracting) && (
          <motion.circle
            cx={mouse.x}
            cy={mouse.y}
            r={isMobile ? "25" : "15"}
            fill="none"
            stroke="#ffffff"
            strokeWidth={isMobile ? "0.8" : "0.5"}
            strokeOpacity={isMobile ? "0.5" : "0.4"}
            filter="url(#glow)"
            initial={{ r: 0, strokeOpacity: 0 }}
            animate={{ 
              r: isMobile ? 25 : 15, 
              strokeOpacity: isMobile ? 0.5 : 0.4 
            }}
            exit={{ r: 0, strokeOpacity: 0 }}
          />
        )}
      </svg>

      {/* Mobile instruction overlay only */}
      {isMobile && !isInteracting && (
        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs sm:text-sm text-center px-3 py-2 bg-black/60 rounded-lg backdrop-blur-sm border border-cyan-400/20 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          🌟 Auto-orbiting neurons • Touch for manual control
        </motion.div>
      )}

      {/* Responsive ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: ambientParticleCount }, (_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'
            } bg-cyan-400 rounded-full opacity-60`}
            animate={{
              x: [
                Math.random() * dimensions.width, 
                Math.random() * dimensions.width
              ],
              y: [
                Math.random() * dimensions.height, 
                Math.random() * dimensions.height
              ],
            }}
            transition={{
              duration: isMobile ? 12 : 18 + Math.random() * 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
          {isMobile ? 'Mobile' : 'Desktop'} | {dimensions.width}x{dimensions.height}
        </div>
      )}
    </div>
  );
};

export default NeuronCursor;