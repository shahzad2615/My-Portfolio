import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Code, Zap, Star, Target, Award, Calendar, ExternalLink, 
  ChevronDown, Github, Globe, Sun, Moon, Filter, TrendingUp,
  Users, BookOpen, Cpu, Database, Smartphone, Monitor
} from 'lucide-react';

// Types
interface Achievement {
  id: number;
  category: 'coding' | 'development' | 'sports' | 'extra';
  title: string;
  description: string;
  icon: string;
  technologies?: string[];
  highlights?: string[];
  date?: string;
  link?: string;
  featured?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}

// Data
const achievements: Achievement[] = [
  {
    id: 1,
    category: 'coding',
    title: 'LeetCode Consistency Master',
    description: 'Solved 450+ Data Structures & Algorithms problems across multiple platforms with exceptional consistency and performance.',
    icon: 'Code',
    technologies: ['C++', 'Java', 'JavaScript', 'Python'],
    highlights: [
      'Solved 450+ problems across LeetCode, GeeksforGeeks, and Coding Ninjas',
      'Maintained 6-month daily streak on LeetCode',
      'Achieved Top 20% ranking in multiple contests',
      'Covered difficulty levels from Easy to Hard'
    ],
    date: '2023-Present',
    link: 'https://leetcode.com/profile',
    featured: true
  },
  {
    id: 2,
    category: 'coding',
    title: 'Competitive Programming Champion',
    description: 'Active participant in prestigious coding competitions with outstanding performance in hackathons and contests.',
    icon: 'Trophy',
    technologies: ['C++', 'Python', 'Algorithms', 'Data Structures'],
    highlights: [
      'Top 20% in LeetCode contests',
      'Winner in Coding Ninjas hackathons',
      'Active in Google Kickstart competitions',
      'Regular participant in Codeforces rounds'
    ],
    date: '2022-Present',
    link: 'https://codeforces.com/profile',
    featured: true
  },
  {
    id: 3,
    category: 'development',
    title: 'CoderHub - Profile Aggregator',
    description: 'Revolutionary all-in-one platform that aggregates coding profiles from multiple platforms with AI-powered insights and analytics.',
    icon: 'Zap',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    highlights: [
      'Integrated LeetCode, GitHub, Codeforces, and GFG profiles',
      'Built comprehensive profile analytics dashboard',
      'Implemented coding streaks and leaderboards',
      'Added AI-powered insights and recommendations',
      'Created responsive design with modern UI/UX'
    ],
    date: '2023',
    link: 'https://github.com/coderhub',
    featured: true
  },
  {
    id: 4,
    category: 'development',
    title: 'Secure Voting Machine System',
    description: 'Enterprise-grade digital voting application with advanced security features, real-time results, and transparent election management.',
    icon: 'Award',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Security'],
    highlights: [
      'Implemented robust authentication and authorization',
      'Built duplicate voting prevention system',
      'Created real-time results dashboard',
      'Ensured complete transparency in voting process',
      'Developed responsive and accessible UI'
    ],
    date: '2023',
    link: 'https://github.com/voting-system'
  },
  {
    id: 5,
    category: 'development',
    title: 'AI-Powered Rubik\'s Cube Solver',
    description: 'Intelligent cube-solving algorithm implementation using advanced search algorithms and optimal state encoding.',
    icon: 'Cpu',
    technologies: ['Java', 'DFS', 'A*', 'UCS', 'Algorithms', 'Data Structures'],
    highlights: [
      'Implemented DFS, A*, and UCS algorithms',
      'Created 24-character cube state encoding system',
      'Optimized for minimal move solutions',
      'Built comprehensive algorithm comparison tool'
    ],
    date: '2022',
    link: 'https://github.com/cube-solver'
  },
  {
    id: 6,
    category: 'development',
    title: 'EasyCart E-commerce Platform',
    description: 'Full-featured modern e-commerce platform with advanced filtering, secure payments, and comprehensive admin dashboard.',
    icon: 'Database',
    technologies: ['MERN Stack', 'Firebase', 'Firestore', 'Razorpay', 'Admin Dashboard'],
    highlights: [
      'Built complete e-commerce functionality',
      'Integrated Firebase Authentication',
      'Implemented Razorpay payment gateway',
      'Created comprehensive admin dashboard',
      'Added advanced product filtering and search'
    ],
    date: '2023',
    link: 'https://github.com/easycart',
    featured: true
  },
  {
    id: 7,
    category: 'sports',
    title: 'Cricket Championship Winner',
    description: 'Led college cricket team to finals with exceptional all-round performance, earning multiple individual awards.',
    icon: 'Trophy',
    highlights: [
      'Represented college in inter-college tournament finals',
      'Awarded Best Fast Bowler for highest wickets',
      'Scored match-winning 65 runs in semi-final',
      'Honored as Best All-Rounder of the tournament',
      'Contributed as opening batsman and strike bowler'
    ],
    date: '2023',
    featured: true
  },
  {
    id: 8,
    category: 'extra',
    title: 'Technical Workshop Conductor',
    description: 'Conducted multiple technical workshops and mentored students in various programming languages and technologies.',
    icon: 'Users',
    technologies: ['Java', 'SQL', 'Web Development', 'Cloud Computing', 'DSA'],
    highlights: [
      'Conducted workshops on Web Development and Cloud Computing',
      'Active mentor and trainer for Java and SQL',
      'Guided students in DSA problem-solving',
      'Currently working as Software Development Trainer at DcodeTech',
      'Completed Cloud Computing internship at iFuture Technologies'
    ],
    date: '2022-Present'
  },
  {
    id: 9,
    category: 'extra',
    title: 'Best Project Award Winner',
    description: 'Recognized for exceptional MERN stack development project with innovative features and outstanding implementation.',
    icon: 'Star',
    technologies: ['MERN Stack', 'EasyCart Project'],
    highlights: [
      'Awarded "Best Project of the Semester"',
      'Recognized for innovative e-commerce solution',
      'Demonstrated exceptional full-stack skills',
      'Showcased modern development practices'
    ],
    date: '2023'
  }
];

const stats: Stat[] = [
  { label: 'Problems Solved', value: 450, suffix: '+', icon: 'Code', color: 'from-blue-500 to-cyan-500' },
  { label: 'Projects Built', value: 8, suffix: '+', icon: 'Zap', color: 'from-purple-500 to-pink-500' },
  { label: 'Contest Wins', value: 12, suffix: '+', icon: 'Trophy', color: 'from-yellow-500 to-orange-500' },
  { label: 'Technologies', value: 15, suffix: '+', icon: 'Target', color: 'from-green-500 to-teal-500' }
];

const Achievements: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Categories with counts
  const categories: Category[] = [
    { id: 'all', label: 'All Achievements', icon: 'Trophy', count: achievements.length },
    { id: 'coding', label: 'Coding & CP', icon: 'Code', count: achievements.filter(a => a.category === 'coding').length },
    { id: 'development', label: 'Development', icon: 'Zap', count: achievements.filter(a => a.category === 'development').length },
    { id: 'sports', label: 'Sports', icon: 'Trophy', count: achievements.filter(a => a.category === 'sports').length },
    { id: 'extra', label: 'Extra', icon: 'Star', count: achievements.filter(a => a.category === 'extra').length }
  ];

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const stepValue = stat.value / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.min(Math.round(stepValue * currentStep), stat.value);
            return newStats;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      });
    }
  }, [isVisible]);

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Trophy, Code, Zap, Star, Target, Award, Users, Cpu, Database, BookOpen, Smartphone, Monitor
    };
    return iconMap[iconName] || Trophy;
  };

  // Category gradients
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'coding':
        return theme === 'dark' 
          ? 'from-blue-500 via-purple-500 to-pink-500' 
          : 'from-blue-400 via-purple-400 to-pink-400';
      case 'development':
        return theme === 'dark' 
          ? 'from-green-500 via-teal-500 to-cyan-500' 
          : 'from-green-400 via-teal-400 to-cyan-400';
      case 'sports':
        return theme === 'dark' 
          ? 'from-orange-500 via-red-500 to-pink-500' 
          : 'from-orange-400 via-red-400 to-pink-400';
      case 'extra':
        return theme === 'dark' 
          ? 'from-purple-500 via-pink-500 to-rose-500' 
          : 'from-purple-400 via-pink-400 to-rose-400';
      default:
        return theme === 'dark' 
          ? 'from-gray-500 to-gray-600' 
          : 'from-gray-400 to-gray-500';
    }
  };

  // Filter achievements
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  // Featured achievements
  const featuredAchievements = achievements.filter(a => a.featured);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/50 to-blue-900/50' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-20 animate-float ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          theme === 'dark' ? 'bg-purple-500' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
          theme === 'dark' ? 'bg-pink-500' : 'bg-purple-400'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 animate-spin-slow ${
          theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-indigo-400 to-pink-400'
        }`} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-8">
            <div className={`relative p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 shadow-2xl' 
                : 'bg-white/30 border-white/50 shadow-xl'
            }`}>
              <Trophy className={`w-12 h-12 transition-colors duration-300 ${
                theme === 'dark' ? 'text-yellow-400' : 'text-amber-600'
              }`} />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse" />
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r animate-gradient-x ${
            theme === 'dark' 
              ? 'from-purple-400 via-pink-400 to-red-400' 
              : 'from-blue-600 via-purple-600 to-pink-600'
          }`}>
            ACHIEVEMENTS
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A showcase of excellence in coding, development, and beyond
          </p>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`group px-8 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-white/40 border-white/60 text-gray-800 hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-translate-y-4 cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-2xl' 
                    : 'bg-white/30 border-white/50 hover:bg-white/50 shadow-xl'
                }`}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className={`relative z-10`}>
                  <div className={`p-4 rounded-2xl mb-6 w-fit bg-gradient-to-r ${stat.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {animatedStats[index]}{stat.suffix}
                  </div>
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Filter Achievements
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/40 border-white/60 text-gray-800'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
          
          <div className={`flex flex-wrap gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-blue-500/25'
                    : theme === 'dark'
                      ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                      : 'bg-white/40 border-white/60 text-gray-700 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{category.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : theme === 'dark'
                        ? 'bg-white/10 text-gray-400'
                        : 'bg-white/30 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Achievements Banner */}
        {selectedCategory === 'all' && (
          <div className={`mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}>
            <div className={`p-8 rounded-3xl backdrop-blur-xl border ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20' 
                : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <Star className={`w-8 h-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-amber-600'}`} />
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Featured Achievements
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredAchievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-white/30 border-white/50'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {achievement.category.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Grid */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon);
              const isHovered = hoveredCard === achievement.id;
              
              return (
                <div
                  key={achievement.id}
                  className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-700 hover:scale-105 hover:-translate-y-6 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-2xl hover:shadow-purple-500/25' 
                      : 'bg-white/20 border-white/30 hover:bg-white/40 shadow-xl hover:shadow-blue-500/25'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(achievement.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    isHovered ? 'animate-pulse' : ''
                  }`}>
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getCategoryGradient(achievement.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>

                  {/* Glowing Effect */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${getCategoryGradient(achievement.category)} opacity-10 rounded-3xl blur-xl transform scale-150`} />
                  </div>

                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${getCategoryGradient(achievement.category)} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {achievement.featured && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse`}>
                          FEATURED
                        </div>
                      )}
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/10 text-gray-300 group-hover:bg-white/20' 
                          : 'bg-white/40 text-gray-600 group-hover:bg-white/60'
                      }`}>
                        {achievement.category.toUpperCase()}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white group-hover:text-purple-300' : 'text-gray-800 group-hover:text-blue-700'
                    }`}>
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {achievement.description}
                    </p>

                    {/* Technologies */}
                    {achievement.technologies && achievement.technologies.length > 0 && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {achievement.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                                theme === 'dark' 
                                  ? 'bg-white/10 text-gray-300 hover:bg-white/20' 
                                  : 'bg-white/40 text-gray-700 hover:bg-white/60'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {achievement.technologies.length > 4 && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              theme === 'dark' ? 'bg-white/5 text-gray-500' : 'bg-white/20 text-gray-600'
                            }`}>
                              +{achievement.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {achievement.highlights && achievement.highlights.length > 0 && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {achievement.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className={`flex items-start gap-3 text-sm transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${getCategoryGradient(achievement.category)} flex-shrink-0 animate-pulse`} />
                              {highlight}
                            </li>
                          ))}
                          {achievement.highlights.length > 3 && (
                            <li className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                              +{achievement.highlights.length - 3} more highlights
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      {achievement.date && (
                        <div className={`flex items-center gap-2 text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {achievement.date}
                        </div>
                      )}
                      
                      {achievement.link && (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r ${getCategoryGradient(achievement.category)} text-white shadow-lg hover:shadow-xl`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View Project</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${
                      isHovered 
                        ? 'bg-gradient-to-br from-white/5 to-transparent opacity-100' 
                        : 'opacity-0'
                    }`} />
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 transition-all duration-500 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}>
                    <div className={`w-full h-full bg-gradient-to-bl ${getCategoryGradient(achievement.category)} opacity-20 rounded-bl-3xl`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Elements */}
        <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 cursor-pointer ${
            theme === 'dark' 
              ? 'bg-purple-500/20 border-purple-400/30 shadow-lg shadow-purple-500/25' 
              : 'bg-blue-500/20 border-blue-400/30 shadow-lg shadow-blue-500/25'
          }`}>
            <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              <div className="text-3xl font-bold">{filteredAchievements.length}</div>
              <div className="text-xs opacity-80">Achievements</div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={`fixed top-8 right-8 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className={`p-4 rounded-xl backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/40 border-white/60'
          }`}>
            <TrendingUp className={`w-6 h-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Achievements;