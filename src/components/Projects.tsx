import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Filter, 
  Code, 
  Smartphone, 
  Database,
  Globe,
  Users,
  Trophy,
  Star,
  GitBranch,
  Zap,
  Sun,
  Moon,
  TrendingUp,
  Award,
  Target,
  Sparkles
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  github: string;
  demo: string;
  features: string[];
  status: 'Completed' | 'In Progress' | 'Live';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const projects: Project[] = [
    {
      id: 1,
      title: 'CoderHub - All-in-One Coding Profile Aggregator',
      description: 'Revolutionary platform integrating LeetCode, GitHub, Codeforces, GeeksforGeeks into one unified dashboard. Features advanced analytics, coding streaks, leaderboards, and AI-powered insights for competitive programmers.',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'AI/ML'],
      category: 'Full Stack',
      github: 'https://github.com/shahzad2615/coderhub',
      demo: 'https://coderhub-demo.vercel.app',
      features: [
        'Multi-platform profile integration',
        'Real-time coding streak tracking',
        'AI-powered performance insights',
        'Interactive leaderboards',
        'Advanced analytics dashboard',
        'Competitive programming metrics'
      ],
      status: 'Live',
      difficulty: 'Expert'
    },
    {
      id: 2,
      title: 'EasyCart E-commerce Platform',
      description: 'Enterprise-grade e-commerce solution with advanced product management, secure payment processing, real-time inventory tracking, and comprehensive admin dashboard. Built for scalability and performance.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Tailwind CSS', 'Redux Toolkit', 'Firebase', 'Razorpay', 'Firestore', 'Authentication'],
      category: 'E-commerce',
      github: 'https://github.com/shahzad2615/easycart',
      demo: 'https://easycart-demo.vercel.app',
      features: [
        'Advanced product filtering & search',
        'Secure payment gateway integration',
        'Real-time inventory management',
        'Comprehensive admin dashboard',
        'Order tracking system',
        'Customer relationship management'
      ],
      status: 'Live',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'Voting Machine System',
      description: 'Highly secure digital voting application with blockchain-inspired security, multi-layer authentication, real-time result visualization, and comprehensive audit trails for transparent democratic processes.',
      image: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Encryption', 'Security'],
      category: 'Web Application',
      github: 'https://github.com/shahzad2615/voting-system',
      demo: 'https://voting-system-demo.herokuapp.com',
      features: [
        'Multi-layer security authentication',
        'Duplicate voting prevention',
        'Real-time result visualization',
        'Comprehensive audit trails',
        'Responsive voting interface',
        'Administrative controls'
      ],
      status: 'Completed',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'Rubik\'s Cube Solver AI',
      description: 'Intelligent Rubik\'s Cube solver using advanced search algorithms (DFS, A*, UCS) with 3D visualization, step-by-step solution guidance, and performance optimization for competitive solving.',
      image: 'https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Java', 'Algorithms', 'Data Structures', 'Swing UI', 'A* Search', 'DFS', 'UCS'],
      category: 'Algorithm',
      github: 'https://github.com/shahzad2615/rubiks-solver',
      demo: 'https://rubiks-solver-demo.github.io',
      features: [
        'Multiple search algorithms implementation',
        '3D cube state visualization',
        'Step-by-step solution tracing',
        'Performance metrics tracking',
        'Interactive GUI interface',
        'Algorithm comparison analysis'
      ],
      status: 'Completed',
      difficulty: 'Expert'
    },
    {
      id: 5,
      title: 'TaskFlow - Collaborative Project Management',
      description: 'Modern project management suite with real-time collaboration, advanced task scheduling, team analytics, and AI-powered productivity insights. Perfect for agile development teams.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Chart.js', 'AI Integration'],
      category: 'Productivity',
      github: 'https://github.com/shahzad2615/taskflow',
      demo: 'https://taskflow-pro.vercel.app',
      features: [
        'Real-time team collaboration',
        'Advanced task prioritization',
        'AI-powered productivity insights',
        'Interactive project timelines',
        'Team performance analytics',
        'Automated workflow management'
      ],
      status: 'Live',
      difficulty: 'Advanced'
    },
    {
      id: 6,
      title: 'WeatherScope - Advanced Analytics Dashboard',
      description: 'Sophisticated weather intelligence platform with predictive analytics, climate visualization, severe weather alerts, and comprehensive environmental data analysis for meteorological insights.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Chart.js', 'OpenWeather API', 'Geolocation', 'PWA', 'Machine Learning'],
      category: 'Data Analytics',
      github: 'https://github.com/shahzad2615/weatherscope',
      demo: 'https://weatherscope-analytics.netlify.app',
      features: [
        'Predictive weather analytics',
        'Interactive climate visualization',
        'Severe weather alert system',
        'Environmental data analysis',
        'PWA offline capabilities',
        'Location-based forecasting'
      ],
      status: 'Live',
      difficulty: 'Intermediate'
    }
  ];

  const filters = ['All', 'Full Stack', 'E-commerce', 'Web Application', 'Algorithm', 'Productivity', 'Data Analytics'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects.slice(0, visibleProjects)
    : projects.filter(project => project.category === selectedFilter).slice(0, visibleProjects);

  const stats = {
    totalProjects: projects.length,
    liveProjects: projects.filter(p => p.status === 'Live').length,
    techStacks: [...new Set(projects.flatMap(p => p.tech))].length,
    categories: [...new Set(projects.map(p => p.category))].length
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Full Stack': <Code size={16} />,
      'E-commerce': <Globe size={16} />,
      'Web Application': <Smartphone size={16} />,
      'Algorithm': <Database size={16} />,
      'Productivity': <Users size={16} />,
      'Data Analytics': <TrendingUp size={16} />
    };
    return icons[category as keyof typeof icons] || <Code size={16} />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'from-green-400 to-green-600',
      'Intermediate': 'from-yellow-400 to-orange-500',
      'Advanced': 'from-purple-400 to-purple-600',
      'Expert': 'from-red-400 to-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Live': 'from-green-400 to-emerald-500',
      'Completed': 'from-blue-400 to-cyan-500',
      'In Progress': 'from-yellow-400 to-orange-500'
    };
    return colors[status as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const themeClasses = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900';

  return (
    <section id="projects" className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative transition-all duration-500 ${themeClasses}`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-400 to-pink-400'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="relative">
                <h2 className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                } animate-pulse`}>
                  Featured Projects
                </h2>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className={`w-8 h-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-amber-500'} animate-spin`} />
                </div>
              </div>
            </div>
            <div className={`w-32 h-1 bg-gradient-to-r ${
              theme === 'dark' ? 'from-cyan-400 to-purple-500' : 'from-blue-500 to-purple-600'
            } mx-auto rounded-full animate-pulse`}></div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`ml-8 p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
            }`}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Total Projects', value: stats.totalProjects, icon: <Trophy className="w-6 h-6" />, color: 'from-yellow-400 to-orange-500' },
            { label: 'Live Projects', value: stats.liveProjects, icon: <Zap className="w-6 h-6" />, color: 'from-green-400 to-emerald-500' },
            { label: 'Tech Stacks', value: stats.techStacks, icon: <GitBranch className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500' },
            { label: 'Categories', value: stats.categories, icon: <Target className="w-6 h-6" />, color: 'from-purple-400 to-pink-500' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/50 border-white/30 hover:bg-white/70'
              }`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover:rotate-1 ${
                selectedFilter === filter
                  ? `${theme === 'dark' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    }`
                  : `backdrop-blur-sm border transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10' 
                        : 'bg-white/30 text-gray-700 hover:text-gray-900 border-black/10 hover:bg-white/50'
                    }`
              }`}
            >
              <Filter size={16} />
              <span>{filter}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card backdrop-blur-sm border rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-105 hover:-translate-y-2 opacity-0 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10' 
                  : 'bg-white/50 border-white/30 hover:bg-white/70 hover:shadow-2xl hover:shadow-blue-500/10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image with Overlay */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Status and Difficulty Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className={`text-xs text-white px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                  <div className={`text-xs text-white px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex items-center space-x-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text ${
                  theme === 'dark' 
                    ? 'text-white group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500' 
                    : 'text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 ${
                        theme === 'dark' 
                          ? 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30' 
                          : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className={`text-xs flex items-start ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Star className={`w-3 h-3 mt-1 mr-2 flex-shrink-0 ${
                          theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-purple-600 hover:to-cyan-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500'
                    }`}
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More & View GitHub */}
        <div className="text-center space-y-6">
          {visibleProjects < projects.length && (
            <button
              onClick={() => setVisibleProjects(prev => prev + 3)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                  : 'bg-black/10 text-gray-900 hover:bg-black/20 border border-black/20'
              }`}
            >
              Load More Projects ({projects.length - visibleProjects} remaining)
            </button>
          )}
          
          <div>
            <a
              href="https://github.com/shahzad2615"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-purple-600 hover:to-cyan-500 shadow-lg shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 shadow-lg shadow-blue-500/25'
              }`}
            >
              <Github size={24} />
              <span>Explore All Projects on GitHub</span>
              <Award size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .project-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        
        @media (max-width: 768px) {
          .project-card:hover {
            transform: translateY(-8px) scale(1.01);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;