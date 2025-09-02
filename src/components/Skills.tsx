import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Server, Wrench, Award, BookOpen, Zap, Star, Sparkles, Target, Trophy, Medal, Brain, Rocket, Bolt } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-blue-400 via-purple-500 to-pink-500',
      accent: 'cyan',
      skills: [
        { name: 'Java', level: 90, years: 3, projects: 15 },
        { name: 'JavaScript', level: 85, years: 2, projects: 20 },
        { name: 'Python', level: 80, years: 2, projects: 12 },
        { name: 'C++', level: 85, years: 3, projects: 8 },
        { name: 'C#', level: 75, years: 1, projects: 5 },
        { name: 'SQL', level: 80, years: 2, projects: 18 },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      icon: Server,
      color: 'from-emerald-400 via-teal-500 to-blue-500',
      accent: 'emerald',
      skills: [
        { name: 'React.js', level: 90, years: 2, projects: 25 },
        { name: 'Next.js', level: 85, years: 1, projects: 10 },
        { name: 'Express.js', level: 80, years: 2, projects: 15 },
        { name: 'Tailwind CSS', level: 90, years: 2, projects: 30 },
        { name: '.NET', level: 75, years: 1, projects: 8 },
        { name: 'Selenium', level: 70, years: 1, projects: 6 },
      ],
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      color: 'from-orange-400 via-red-500 to-pink-500',
      accent: 'orange',
      skills: [
        { name: 'MongoDB', level: 85, years: 2, projects: 18 },
        { name: 'Firebase', level: 80, years: 1, projects: 12 },
        { name: 'Git/GitHub', level: 90, years: 3, projects: 50 },
        { name: 'VS Code', level: 95, years: 3, projects: 100 },
        { name: 'IntelliJ', level: 80, years: 2, projects: 20 },
        { name: 'Netbeans', level: 75, years: 2, projects: 15 },
      ],
    },
    {
      title: 'Specialized Skills',
      icon: Wrench,
      color: 'from-violet-400 via-purple-500 to-indigo-500',
      accent: 'violet',
      skills: [
        { name: 'Data Structures & Algorithms', level: 85, years: 3, projects: 450 },
        { name: 'Object-Oriented Programming', level: 90, years: 3, projects: 35 },
        { name: 'REST APIs', level: 80, years: 2, projects: 22 },
        { name: 'Responsive Design', level: 85, years: 2, projects: 40 },
        { name: 'Problem Solving', level: 90, years: 4, projects: 500 },
        { name: 'Team Collaboration', level: 85, years: 2, projects: 25 },
      ],
    },
  ];

  const achievements = [
    {
      title: 'Master Badge',
      description: 'Coding Ninjas Elite',
      icon: Trophy,
      count: '1',
      color: 'from-yellow-400 to-orange-500',
      glow: 'shadow-yellow-500/50'
    },
    {
      title: 'Coding Streaks',
      description: 'LeetCode Champion',
      icon: Bolt,
      count: '150+',
      color: 'from-blue-400 to-purple-500',
      glow: 'shadow-blue-500/50'
    },
    {
      title: 'Problem Solver',
      description: 'DSA Master',
      icon: Brain,
      count: '450+',
      color: 'from-green-400 to-emerald-500',
      glow: 'shadow-green-500/50'
    },
    {
      title: 'Community Leader',
      description: 'LinkedIn Influence',
      icon: Star,
      count: '2.5K+',
      color: 'from-pink-400 to-rose-500',
      glow: 'shadow-pink-500/50'
    },
  ];

  const certifications = [
    { name: 'Web Development Internship', org: 'CodeAlpha', year: '2024', verified: true },
    { name: 'Cloud Computing Internship', org: 'iFuture Technologies', year: '2024', verified: true },
    { name: 'Data Structures and Algorithms', org: 'Great Learning', year: '2023', verified: true },
    { name: 'JavaScript Certification', org: 'HackerRank', year: '2023', verified: true },
  ];

  const SkillBar = ({ skill, index, categoryColor, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setAnimationComplete(true), delay + 500);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <div
        className="group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColor} animate-pulse`}></div>
            <span className="text-gray-100 font-medium text-sm sm:text-base">{skill.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${categoryColor} font-bold text-sm`}>
              {skill.level}%
            </span>
            {isHovered && (
              <div className="text-xs text-gray-400 animate-fadeIn">
                {skill.years}y • {skill.projects}p
              </div>
            )}
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-700/30">
            <div
              className={`h-full bg-gradient-to-r ${categoryColor} rounded-full relative overflow-hidden transition-all duration-1000 ease-out`}
              style={{
                width: animationComplete ? `${skill.level}%` : '0%',
                boxShadow: isHovered ? `0 0 20px rgba(59, 130, 246, 0.5)` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              )}
            </div>
          </div>
          
          {isHovered && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-1 text-xs text-white animate-fadeIn z-10">
              <div className="flex items-center gap-2">
                <Target size={12} className="text-blue-400" />
                <span>{skill.years} years • {skill.projects} projects</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700/50"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
      setParticles(newParticles);

      const interval = setInterval(() => {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        })));
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-twinkle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
      }}
    >
      <ParticleBackground />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6 animate-gradient">
              Skills & Expertise
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Crafting digital experiences with cutting-edge technologies and innovative solutions
          </p>
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Sparkles
                key={i}
                size={20}
                className="text-yellow-400 animate-twinkle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Skills Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-4 sm:px-6 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50 text-white scale-105'
                  : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/50 hover:bg-gray-700/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <category.icon size={18} className={`transition-colors duration-300 ${
                  activeCategory === index ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'
                }`} />
                <span className="font-medium text-sm sm:text-base whitespace-nowrap">{category.title}</span>
              </div>
              {activeCategory === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl -z-10"></div>
              )}
            </button>
          ))}
        </div>

        {/* Active Skills Category */}
        <div className="mb-16">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-3xl p-6 sm:p-8 border border-gray-700/30 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${skillCategories[activeCategory].color} mr-4`}>
                  {React.createElement(skillCategories[activeCategory].icon, { size: 24, className: 'text-white' })}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {skillCategories[activeCategory].title}
                  </h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full`}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    categoryColor={skillCategories[activeCategory].color}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              Achievements & Milestones
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-3xl p-6 border border-gray-700/30 text-center hover:scale-105 transition-all duration-300 overflow-hidden ${achievement.glow} hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10"></div>
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon size={28} className="text-white" />
                  </div>
                  <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.color} mb-2`}>
                    {achievement.count}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  <div className="absolute top-2 right-2">
                    <Medal size={16} className={`text-transparent bg-clip-text bg-gradient-to-r ${achievement.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-3xl p-6 sm:p-8 border border-gray-700/30 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
                Professional Certifications
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm sm:text-base truncate">{cert.name}</h4>
                      {cert.verified && (
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                      <span>{cert.org}</span>
                      <span>•</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                  <Rocket size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Lines of Code', value: '50K+', icon: Code },
              { label: 'Projects Completed', value: '25+', icon: Rocket },
              { label: 'Technologies Mastered', value: '15+', icon: Zap },
              { label: 'Hours Coding', value: '2K+', icon: Target },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 mb-3">
                  <stat.icon size={20} className="text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;