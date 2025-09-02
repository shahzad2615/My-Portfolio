import React, { useState, useEffect } from 'react';
import { Heart, Github, Linkedin, Mail, Code, ArrowUp, Star, Sparkles, Terminal, Coffee, Zap, Globe, MapPin, Calendar, Eye, MousePointer, CodeIcon } from 'lucide-react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [particlesVisible, setParticlesVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('footer').getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight);
      }
    };

    const footer = document.querySelector('footer');
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      if (footer) {
        footer.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home', icon: Globe },
    { name: 'About', href: '#about', icon: Eye },
    { name: 'Skills', href: '#skills', icon: Zap },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Experience', href: '#experience', icon: Calendar },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/shahzad2615",
    color: "from-gray-400 to-gray-600",
    hoverColor: "from-white to-gray-300",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shahzad-ali-17584424b/",
    color: "from-blue-400 to-blue-600",
    hoverColor: "from-blue-300 to-blue-500",
  },
  {
    icon: Code,
    name: "LeetCode",
    href: "https://leetcode.com/your-username/", // ✅ replace with your profile
    color: "from-orange-400 to-orange-600",
    hoverColor: "from-orange-300 to-orange-500",
  },
  {
    icon: Mail,
    name: "Email",
    href: "mailto:shahzadaliidrishi@gmail.com",
    color: "from-red-400 to-red-600",
    hoverColor: "from-red-300 to-red-500",
  },
];

const techStack = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Data Structures & Algorithm",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Postman",
];

const stats = [
  { label: "Projects Completed", value: "7+", icon: Code },
  { label: "Tech Connections & Network", value: "3.2k+", icon: Linkedin },
  { label: "DSA Solved", value: "450+", icon: Code },
  { label: "Years Experience", value: "1+", icon: Calendar },
];

// ---- Floating particle (fixed with pointer-events-none so it won’t block clicks) ----
const FloatingParticle = ({ delay, duration, startX, startY }) => (
  <div
    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 pointer-events-none"
    style={{
      left: `${startX}%`,
      top: `${startY}%`,
      animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 0 0 40px rgba(147, 51, 234, 0.3); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(6, 182, 212, 0.3); }
          50% { border-color: rgba(6, 182, 212, 0.8); }
        }
        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }
        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .glass-morphism {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <footer className="relative bg-gradient-to-t from-black via-[#0a0a0f] to-[#1a1a1d] py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            duration={3 + (i % 3)}
            startX={Math.random() * 100}
            startY={Math.random() * 100}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <div
              className={`lg:col-span-1 transform transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="relative group">
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6 glow-effect">
                  Shahzad Ali
                </h3>
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 opacity-70 group-hover:animate-spin" size={20} />
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Full Stack Developer || Problem Solver (DSA)
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-xs font-medium text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Links with Advanced Hover Effects */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative block p-3 rounded-xl bg-gradient-to-r ${social.color} hover:${social.hoverColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 transform`}
                    >
                      <social.icon size={24} className="text-white drop-shadow-lg" />
                      
                      {/* Hover Tooltip */}
                      <div
                        className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded transition-all duration-300 ${
                          hoveredSocial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                      >
                        {social.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                      </div>
                    </a>
                    
                    {/* Ripple Effect */}
                    {hoveredSocial === index && (
                      <div className="absolute inset-0 rounded-xl animate-ping bg-cyan-400/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links with Icons */}
            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Terminal className="mr-2 text-cyan-400" size={20} />
                Quick Navigation
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index} className="group">
                    <a
                      href={link.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/5 group-hover:translate-x-2"
                    >
                      <link.icon size={16} className="text-cyan-400/60 group-hover:text-cyan-400" />
                      <span>{link.name}</span>
                      <div className="w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ml-auto" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Contact Section */}
            <div
              className={`transform transition-all duration-1000 delay-600 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
            >
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <MousePointer className="mr-2 text-purple-400" size={20} />
                Let's Connect
              </h4>
              <div className="space-y-4 glass-morphism rounded-xl p-6 pulse-border">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-cyan-400" size={18} />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400 text-sm">Mumbai, Maharashtra</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="text-purple-400" size={18} />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:shahzadaliidrishi@gmail.com" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                      shahzadaliidrishi@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Shahzad_Ali_Resume.pdf';
                    link.click();
                  }}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Download Resume</span>
                    <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="pt-8 border-t border-gradient-to-r from-transparent via-white/20 to-transparent">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div
                className={`text-gray-400 text-sm flex items-center transform transition-all duration-1000 delay-800 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                © {currentYear} Shahzad Ali. Crafted with{' '}
                <Heart className="text-red-400 mx-2 animate-pulse" size={16} />
                and powered by{' '}
                <Coffee className="text-amber-400 ml-2 animate-bounce" size={16} />
                <span className="ml-2 text-cyan-400">| Always learning, always growing</span>
              </div>
              
              {/* <button
                onClick={scrollToTop}
                className={`mt-4 md:mt-0 relative p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white hover:from-purple-600 hover:to-cyan-500 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 group glow-effect ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: '1s' }}
              >
                <ArrowUp size={24} className="group-hover:animate-bounce" />
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-70" />
      </footer>
    </>
  );
};

export default Footer;