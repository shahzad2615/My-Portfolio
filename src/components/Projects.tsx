import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Code, Smartphone, Database } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const projects = [
    {
      id: 1,
      title: 'EasyCart E-commerce',
      description: 'A full-featured e-commerce platform with React.js, Firebase, and Razorpay integration. Features include product browsing, cart management, secure checkout, and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Tailwind CSS', 'Redux Toolkit', 'Firebase', 'Razorpay'],
      category: 'Web Development',
      github: 'https://github.com/shahzad2615',
      demo: 'https://example.com',
      features: [
        'Product browsing with filtering and sorting',
        'Shopping cart management',
        'Secure payment integration',
        'Admin dashboard',
        'Real-time database updates',
      ],
    },
    {
      id: 2,
      title: 'Rubik\'s Cube Solver',
      description: 'An intelligent Rubik\'s Cube solver implemented in Java using advanced search algorithms including DFS, A*, and UCS for optimal pathfinding.',
      image: 'https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Java', 'Algorithms', 'Data Structures', 'Swing UI'],
      category: 'Algorithm',
      github: 'https://github.com/shahzad2615',
      demo: '#',
      features: [
        'Multiple search algorithms (DFS, A*, UCS)',
        'Cube state visualization',
        'Step-by-step solution tracing',
        'Performance optimization',
        'Interactive GUI',
      ],
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A modern task management application built with React and Node.js, featuring real-time collaboration, task prioritization, and team management.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
      category: 'Web Development',
      github: 'https://github.com/shahzad2615',
      demo: 'https://example.com',
      features: [
        'Real-time collaboration',
        'Task prioritization',
        'Team management',
        'Progress tracking',
        'Notification system',
      ],
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics using modern web technologies.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React.js', 'Chart.js', 'OpenWeather API', 'Geolocation'],
      category: 'Web Development',
      github: 'https://github.com/shahzad2615',
      demo: 'https://example.com',
      features: [
        'Location-based weather',
        'Interactive maps',
        'Weather analytics',
        'Responsive design',
        'Offline capabilities',
      ],
    },
  ];

  const filters = ['All', 'Web Development', 'Algorithm', 'Mobile App'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Code size={16} />;
      case 'Mobile App':
        return <Smartphone size={16} />;
      case 'Algorithm':
        return <Database size={16} />;
      default:
        return <Code size={16} />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'backdrop-blur-sm bg-white/5 text-gray-300 hover:text-white border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={16} />
              <span>{filter}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="backdrop-blur-sm bg-white/5 rounded-2xl overflow-hidden border border-white/10 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs text-gray-400 flex items-start">
                          <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/shahzad2615"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-cyan-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View More Projects</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;