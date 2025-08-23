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
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  // Advanced mouse interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMouse({ x: mouseX, y: mouseY });
    setIsMouseInside(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
  }, []);

  // Physics simulation
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

          if (isMouseInside && distance < CURSOR_INFLUENCE_RADIUS) {
            // Repulsion from cursor
            const force = (1 - distance / CURSOR_INFLUENCE_RADIUS) * REPEL_FORCE;
            const angle = Math.atan2(dy, dx);
            newVx += Math.cos(angle) * force * 0.1;
            newVy += Math.sin(angle) * force * 0.1;
            energy = Math.min(1, energy + force * 0.5);
          }

          // Gentle attraction back to original position
          const returnDx = particle.originalX - newX;
          const returnDy = particle.originalY - newY;
          newVx += returnDx * 0.002;
          newVy += returnDy * 0.002;

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
            pulsePhase: particle.pulsePhase + 0.05,
          };
        });

        // Update active connections
        const connections: string[] = [];
        for (let i = 0; i < newParticles.length; i++) {
          for (let j = i + 1; j < newParticles.length; j++) {
            const dx = newParticles[i].x - newParticles[j].x;
            const dy = newParticles[i].y - newParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONNECTION_DISTANCE) {
              const energy = (newParticles[i].energy + newParticles[j].energy) / 2;
              if (energy > 0.1 || Math.random() < 0.3) {
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
  }, [mouse, isMouseInside]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }} />
      </div>

      {/* Main SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full cursor-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0080ff" stopOpacity="0.4" />
          </radialGradient>
          
          <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.2" />
          </radialGradient>

          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.6" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Pulse filter */}
          <filter id="pulse" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {particles.map((a, i) =>
          particles.slice(i + 1).map((b, j) => {
            const realJ = i + 1 + j;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONNECTION_DISTANCE) {
              const opacity = Math.max(0.1, 1 - distance / CONNECTION_DISTANCE);
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
                  strokeWidth={isActive && energy > 0.3 ? "0.4" : "0.2"}
                  strokeOpacity={opacity * (0.3 + energy * 0.7)}
                  filter={isActive && energy > 0.3 ? "url(#glow)" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: isActive ? 1 : 0.7,
                    strokeOpacity: opacity * (0.3 + energy * 0.7)
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            }
            return null;
          })
        )}

        {/* Particles/Nodes */}
        {particles.map((particle, i) => {
          const pulseSize = 1.5 + Math.sin(particle.pulsePhase) * 0.5;
          const energySize = 1 + particle.energy * 2;
          const finalSize = pulseSize * energySize;
          
          return (
            <g key={particle.id}>
              {/* Energy glow */}
              {particle.energy > 0.2 && (
                <motion.circle
                  cx={particle.x}
                  cy={particle.y}
                  r={finalSize * 1}
                  fill="url(#energyGradient)"
                  fillOpacity={particle.energy * 0.3}
                  filter="url(#glow)"
                  animate={{
                    r: [finalSize * 1.5, finalSize * 2.5, finalSize * 1.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
            
              
<motion.circle
  cx={particle.x}
  cy={particle.y}
  r={finalSize * 0.6}   // ⬅️ smaller size
  fill={particle.energy > 0.3 ? "url(#energyGradient)" : "url(#nodeGradient)"}
  filter="url(#pulse)"
  animate={{
    r: finalSize * 1,  // ⬅️ keep animation consistent
    fillOpacity: 0.7 + particle.energy * 0.3,
  }}
  transition={{ duration: 0.2 }}
/>

              
              {/* Core dot */}
              <circle
  cx={particle.x}
  cy={particle.y}
  r="0.3"
  fill="#ffffff"
  fillOpacity={0.9 + particle.energy * 0.1}
/>
            </g>
          );
        })}

        {/* Cursor glow effect */}
        {isMouseInside && (
          <motion.circle
            cx={mouse.x}
            cy={mouse.y}
            r="15"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            filter="url(#glow)"
            initial={{ r: 0, strokeOpacity: 0 }}
            animate={{ r: 15, strokeOpacity: 0.4 }}
            exit={{ r: 0, strokeOpacity: 0 }}
          />
        )}
      </svg>

      

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NeuronCursor;