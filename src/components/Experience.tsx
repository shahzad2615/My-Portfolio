import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Code, 
  Zap, 
  Trophy, 
  ChevronDown,
  ExternalLink,
  Award,
  Users,
  Target,
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  Eye,
  Brain,
  Rocket,
  Sun,
  Moon,
  Monitor,
  Palette,
  Settings
} from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [autoTheme, setAutoTheme] = useState(false);

  useEffect(() => {
    if (autoTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [autoTheme]);

  const toggleTheme = () => {
    if (autoTheme) {
      setAutoTheme(false);
      setTheme(theme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const setAutoMode = () => {
    setAutoTheme(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setAutoMode, autoTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme configurations
const themes = {
  dark: {
    bg: 'bg-gray-900',
    cardBg: 'from-white/10 to-white/5',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/10',
    borderHover: 'border-white/30',
    accent: 'from-purple-500/20 to-cyan-500/20',
    shadow: 'shadow-purple-500/20',
    timeline: 'from-purple-500 via-cyan-500 to-purple-500'
  },
  light: {
    bg: 'bg-gray-50',
    cardBg: 'from-black/10 to-black/5',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-600',
    border: 'border-black/10',
    borderHover: 'border-black/30',
    accent: 'from-purple-500/10 to-cyan-500/10',
    shadow: 'shadow-purple-500/10',
    timeline: 'from-purple-600 via-cyan-600 to-purple-600'
  }
};

// Advanced Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme, setAutoMode, autoTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setShowOptions(!showOptions)}
          className={`p-4 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
              : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className={`absolute top-16 right-0 backdrop-blur-xl rounded-2xl border p-4 min-w-48 ${
                theme === 'dark'
                  ? 'bg-gray-900/90 border-white/20'
                  : 'bg-white/90 border-black/20'
              }`}
            >
              <div className="space-y-2">
                <motion.button
                  onClick={toggleTheme}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    !autoTheme && theme === 'dark'
                      ? 'bg-purple-500/20 text-purple-300'
                      : theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-300'
                      : 'hover:bg-black/10 text-gray-700'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Moon size={16} />
                  <span className="text-sm font-medium">Dark</span>
                </motion.button>

                <motion.button
                  onClick={toggleTheme}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    !autoTheme && theme === 'light'
                      ? 'bg-yellow-500/20 text-yellow-600'
                      : theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-300'
                      : 'hover:bg-black/10 text-gray-700'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Sun size={16} />
                  <span className="text-sm font-medium">Light</span>
                </motion.button>

                <motion.button
                  onClick={setAutoMode}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    autoTheme
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-300'
                      : 'hover:bg-black/10 text-gray-700'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Monitor size={16} />
                  <span className="text-sm font-medium">Auto</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const experiences = [
    {
      id: 1,
      type: 'work',
      title: 'Software Developer (MERN Stack)',
      company: 'Utkarsh Global Foundation',
      location: 'Mumbai, Maharashtra, India',
      duration: 'June 2025 – Present',
      status: 'current',
      category: 'Full Stack Development',
      color: 'from-emerald-400 to-teal-600',
      icon: Code,
      achievements: [
        'Developed 15+ dynamic web applications using MERN stack',
        'Improved application performance by 40% through code optimization',
        'Led a team of 3 junior developers on critical projects',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Next.js', 'TypeScript'],
      highlights: [
        { icon: Users, text: 'Team Leadership', value: '3 developers' },
        { icon: Target, text: 'Performance Boost', value: '40%' },
        { icon: Rocket, text: 'Projects Delivered', value: '15+' }
      ],
      description: 'Leading full-stack development initiatives, architecting scalable solutions, and mentoring junior developers in modern web technologies.',
    },
    {
      id: 2,
      type: 'work',
      title: 'Software Development Trainer (Java, SQL)',
      company: 'Dcodetech',
      location: 'Thane, Maharashtra, India',
      duration: 'May 2025 – Present (Part-time)',
      status: 'current',
      category: 'Education & Training',
      color: 'from-purple-400 to-indigo-600',
      icon: Brain,
      achievements: [
        'Trained 50+ students in Java and SQL programming',
        'Developed comprehensive curriculum with 95% success rate',
        'Created hands-on projects adopted by 3 other training centers',
        'Achieved 4.8/5 student satisfaction rating'
      ],
      technologies: ['Java', 'SQL', 'MySQL', 'PostgreSQL', 'Spring Boot', 'Hibernate'],
      highlights: [
        { icon: Users, text: 'Students Trained', value: '50+' },
        { icon: Star, text: 'Success Rate', value: '95%' },
        { icon: Trophy, text: 'Satisfaction', value: '4.8/5' }
      ],
      description: 'Empowering the next generation of developers through comprehensive training programs and innovative teaching methodologies.',
    },
    {
      id: 3,
      type: 'education',
      title: 'Bachelor of Science in Information Technology',
      company: 'Vikas College of Arts, Science and Commerce',
      location: 'Vikhroli East, Mumbai, Maharashtra, India',
      duration: 'August 2022 – April 2025',
      status: 'completed',
      category: 'Academic Excellence',
      color: 'from-cyan-400 to-blue-600',
      icon: GraduationCap,
      achievements: [
        'Graduated with exceptional CGPA: 9.01/10',
        'Led programming club with 100+ active members',
        'Won 3 hackathons and 5 coding competitions',
        'Published 2 research papers in tech journals'
      ],
      technologies: ['Data Structures', 'Algorithms', 'Database Design', 'Software Engineering'],
      highlights: [
        { icon: Trophy, text: 'CGPA', value: '9.01/10' },
        { icon: Award, text: 'Hackathons Won', value: '3' },
        { icon: Users, text: 'Club Members', value: '100+' }
      ],
      description: 'Excelled academically while actively contributing to the tech community through leadership and innovative projects.',
    }
  ];

  const certifications = [
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Professional',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'CodeAlpha',
      date: '2024',
      level: 'Advanced',
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Cloud Computing Specialist',
      issuer: 'iFuture Technologies',
      date: '2024',
      level: 'Expert',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      title: 'JavaScript Algorithms & Data Structures',
      issuer: 'HackerRank',
      date: '2024',
      level: 'Professional',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'React.js Advanced Concepts',
      issuer: 'Meta',
      date: '2024',
      level: 'Expert',
      color: 'from-cyan-400 to-teal-500'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2024',
      level: 'Professional',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const categories = ['all', 'work', 'education'];

  const filteredExperiences = selectedCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50,
      scale: isMobile ? 0.95 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme.bg}`}>
      <ThemeToggle />
      
      <section ref={containerRef} className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className={`absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 ${
              theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'
            } rounded-full blur-3xl`}
            animate={{ 
              x: [0, isMobile ? 25 : 50, isMobile ? -12 : -25, 0],
              y: [0, isMobile ? -15 : -30, isMobile ? 10 : 20, 0],
              scale: [1, isMobile ? 1.05 : 1.1, isMobile ? 0.95 : 0.9, 1]
            }}
            transition={{ duration: isMobile ? 15 : 20, repeat: Infinity }}
          />
          <motion.div 
            className={`absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 ${
              theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
            } rounded-full blur-3xl`}
            animate={{ 
              x: [0, isMobile ? -20 : -40, isMobile ? 15 : 30, 0],
              y: [0, isMobile ? 12 : 25, isMobile ? -8 : -15, 0],
              scale: [1, isMobile ? 0.9 : 0.8, isMobile ? 1.1 : 1.2, 1]
            }}
            transition={{ duration: isMobile ? 20 : 25, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.div
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${currentTheme.accent} rounded-full border ${currentTheme.border} mb-4 sm:mb-6`}
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
              <span className="text-purple-300 font-medium text-sm sm:text-base">Professional Journey</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 sm:mb-6 px-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Experience 
            </motion.h2>
            
            <motion.div 
              className="w-20 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-4 sm:mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? 80 : 128 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            
            <motion.p
              className={`text-base sm:text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto leading-relaxed px-4`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A comprehensive showcase of my professional growth, technical expertise, and impactful contributions across various domains.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex justify-center mb-8 sm:mb-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex ${
              theme === 'dark' ? 'bg-black/40' : 'bg-white/40'
            } backdrop-blur-lg rounded-xl sm:rounded-2xl border ${currentTheme.border} p-1 sm:p-2`}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium capitalize transition-all relative text-sm sm:text-base ${
                    selectedCategory === category
                      ? currentTheme.text
                      : `${currentTheme.textMuted} hover:${currentTheme.textSecondary}`
                  }`}
                  whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedCategory === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg sm:rounded-xl"
                      layoutId="activeCategory"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Timeline Line - Hidden on mobile for cleaner look */}
            {!isMobile && (
              <motion.div 
                className={`absolute left-6 sm:left-8 top-0 w-0.5 sm:w-1 bg-gradient-to-b ${currentTheme.timeline} rounded-full`}
                style={{ height: '100%' }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}

            <div className="space-y-8 sm:space-y-16">
              <AnimatePresence mode="wait">
                {filteredExperiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className={`relative ${isMobile ? 'pl-0' : 'pl-16 sm:pl-20'}`}
                    variants={cardVariants}
                    layout
                    onHoverStart={() => !isMobile && setHoveredCard(exp.id)}
                    onHoverEnd={() => !isMobile && setHoveredCard(null)}
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    {!isMobile && (
                      <motion.div
                        className="absolute left-4 sm:left-6 top-6 sm:top-8 w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 sm:border-4 border-gray-900 z-10"
                        style={{
                          background: `linear-gradient(135deg, ${exp.color.split(' ')[1]}, ${exp.color.split(' ')[3]})`
                        }}
                        whileHover={{ scale: 1.5, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${exp.color.split(' ')[1]}, ${exp.color.split(' ')[3]})`
                          }}
                          animate={{
                            boxShadow: hoveredCard === exp.id 
                              ? [`0 0 0 0px ${exp.color.split(' ')[1]}40`, `0 0 0 20px ${exp.color.split(' ')[1]}00`]
                              : `0 0 0 0px ${exp.color.split(' ')[1]}00`
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    )}

                    {/* Experience Card */}
                    <motion.div
                      className={`backdrop-blur-xl bg-gradient-to-br ${currentTheme.cardBg} rounded-2xl sm:rounded-3xl border transition-all duration-500 relative overflow-hidden ${
                        hoveredCard === exp.id 
                          ? `${currentTheme.borderHover} shadow-2xl ${currentTheme.shadow}` 
                          : currentTheme.border
                      }`}
                      whileHover={!isMobile ? { 
                        y: -10,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 }
                      } : {}}
                    >
                      {/* Animated Background Gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 transition-opacity duration-500`}
                        animate={{ opacity: hoveredCard === exp.id ? 0.1 : 0 }}
                      />

                      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                          <div className="flex items-start space-x-3 sm:space-x-4 w-full">
                            <motion.div
                              className={`p-3 sm:p-4 bg-gradient-to-r ${exp.color} rounded-xl sm:rounded-2xl flex-shrink-0`}
                              whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                              transition={{ duration: 0.6 }}
                            >
                              <exp.icon size={isMobile ? 20 : 28} className="text-white" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <motion.h3 
                                  className={`text-lg sm:text-2xl font-bold ${currentTheme.text} leading-tight`}
                                  initial={{ x: -20 }}
                                  whileInView={{ x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  {exp.title}
                                </motion.h3>
                                {exp.status === 'current' && (
                                  <motion.span
                                    className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 self-start"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    CURRENT
                                  </motion.span>
                                )}
                              </div>
                              <motion.p 
                                className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                {exp.company}
                              </motion.p>
                              <motion.p
                                className={`${currentTheme.textMuted} text-sm mt-1`}
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                {exp.category}
                              </motion.p>
                            </div>
                          </div>

                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <motion.div 
                              className={`flex items-center space-x-2 ${currentTheme.textSecondary} text-sm mb-2`}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Calendar size={14} />
                              <span className="font-medium">{exp.duration}</span>
                            </motion.div>
                            <motion.div 
                              className={`flex items-center space-x-2 ${currentTheme.textMuted} text-sm`}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              <MapPin size={14} />
                              <span className="truncate max-w-48">{exp.location}</span>
                            </motion.div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <motion.div
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, staggerChildren: 0.1 }}
                        >
                          {exp.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              className={`text-center p-3 sm:p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-xl border ${currentTheme.border}`}
                              whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <highlight.icon className={`w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-transparent bg-clip-text bg-gradient-to-r ${exp.color}`} />
                              <div className={`text-base sm:text-lg font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                                {highlight.value}
                              </div>
                              <div className={`text-xs ${currentTheme.textMuted}`}>{highlight.text}</div>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          className={`${currentTheme.textSecondary} mb-6 leading-relaxed text-sm sm:text-base`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {exp.description}
                        </motion.p>

                        {/* Achievements */}
                        <motion.div
                          className="mb-6"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <h4 className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}>
                            <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                            Key Achievements
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                className={`flex items-start space-x-3 p-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-lg border ${currentTheme.border}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + idx * 0.1 }}
                                whileHover={!isMobile ? { x: 5, backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } : {}}
                              >
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className={`text-sm ${currentTheme.textSecondary}`}>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Technologies */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <h4 className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}>
                            <Code className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
                            Technologies & Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                className={`px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r ${exp.color} text-white text-xs sm:text-sm font-medium rounded-full`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + idx * 0.05 }}
                                whileHover={!isMobile ? { scale: 1.1, y: -2 } : {}}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                        {/* Mobile Expand/Collapse for more details */}
                        {isMobile && (
                          <motion.button
                            onClick={() => setExpandedCard(expandedCard === exp.id ? null : exp.id)}
                            className={`w-full mt-6 p-3 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} rounded-xl border ${currentTheme.border} ${currentTheme.text} font-medium flex items-center justify-center gap-2`}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>{expandedCard === exp.id ? 'Show Less' : 'View Details'}</span>
                            <motion.div
                              animate={{ rotate: expandedCard === exp.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            className="mt-16 sm:mt-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div className="text-center mb-12 sm:mb-16">
              <motion.div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 mb-4 sm:mb-6`}
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              >
                <Award className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                <span className="text-yellow-300 font-medium text-sm sm:text-base">Professional Certifications</span>
              </motion.div>
              
              <h3 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                Recognized Expertise
              </h3>
              
              <p className={`${currentTheme.textSecondary} max-w-2xl mx-auto text-sm sm:text-base px-4`}>
                Industry-recognized certifications that validate my technical expertise and commitment to continuous learning.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className={`backdrop-blur-xl ${currentTheme.cardBg} rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${currentTheme.border} relative overflow-hidden group`}
                  variants={cardVariants}
                  whileHover={!isMobile ? { 
                    y: -10, 
                    scale: 1.05,    
                    transition: { type: "spring", stiffness: 300 }
                  } : {}}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`p-2 sm:p-3 bg-gradient-to-r ${cert.color} rounded-lg sm:rounded-xl`}
                        whileHover={!isMobile ? { rotate: 360 } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <Award size={isMobile ? 20 : 24} className="text-white" />
                      </motion.div>
                      <motion.span
                        className={`px-2 sm:px-3 py-1 bg-gradient-to-r ${cert.color} text-white text-xs font-bold rounded-full`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {cert.level}
                      </motion.span>
                    </div>
                    
                    <h4 className={`text-base sm:text-lg font-bold ${currentTheme.text} mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all leading-tight`}>
                      {cert.title}
                    </h4>
                    
                    <p className={`${currentTheme.textSecondary} text-sm mb-3`}>{cert.issuer}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`${currentTheme.textMuted} text-xs`}>{cert.date}</span>
                      <motion.div
                        className={`${currentTheme.textMuted} group-hover:${currentTheme.text} transition-colors`}
                        whileHover={!isMobile ? { x: 5 } : {}}
                      >
                        <ExternalLink size={14} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/* Mobile Stats Section */}
          {isMobile && (
            <motion.div
              className="mt-16 p-6 backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-xl font-bold ${currentTheme.text} text-center mb-6`}>Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">15+</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">50+</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">9.01</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>Academic CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">6</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>Certifications</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            className="mt-16 sm:mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl font-bold text-white overflow-hidden"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                View Full Resume
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Floating Action Button for Mobile */}
          {isMobile && (
            <motion.div
              className="fixed bottom-6 right-6 z-40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              <motion.button
                className="p-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-2xl text-white"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ArrowRight className="w-5 h-5 -rotate-90" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};  
// Main App Component with Theme Provider
const App = () => {
  return (
    <ThemeProvider>
      <Experience />
    </ThemeProvider>
  );
};


export default App