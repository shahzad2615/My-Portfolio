import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Advanced Skills Section Component
const AdvancedSkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Enhanced skills data with categories and technologies
  const skills = [
   {
  name: 'Problem Solving (DSA)',
  category: 'algorithms',
  level: 85,
  icon: '🧠',
  technologies: ['C++', 'Java', 'Data Structures', 'Algorithms'],
  description: 'Efficient algorithms and optimal solutions',
  color: 'from-orange-400 to-red-400',
  problemsSolved: 450,  // ✅ renamed
  experience: '2 Years'
},
{
  name: 'Technical Trainer',
  category: 'teaching',
  level: 90,
  icon: '👨‍🏫',
  technologies: ['Java', 'SQL', 'DSA','Oops'],
  description: 'Guiding students in coding and software development',
  color: 'from-yellow-400 to-orange-400',
  experience: '6 Months',   // 👈 Added here
}
,
   {
      name: 'Frontend Development',
      category: 'frontend',
      level: 90,
      icon: '⚛️',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      description: 'Building responsive, performant web applications',
      color: 'from-blue-400 to-cyan-400',
      projects: 7,
      experience: '1 Years'
    },
    {
      name: 'Backend Development',
      category: 'backend',
      level: 80,
      icon: '⚡',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Postman'],
      description: 'Scalable server-side applications and APIs',
      color: 'from-green-400 to-emerald-400',
      projects: 5,
      experience: '1 Years'
    },
    {
    name: 'Full Stack Integration',
      category: 'fullstack',
      level: 85,
      icon: '🔄',
      technologies: ['MERN', 'REST APIs', 'WebSockets', 'Postman'],
      description: 'End-to-end application development',
      color: 'from-purple-400 to-pink-400',
      projects: 8,
      experience: '1 Years'
    }
,
    {
      name: 'DevOps & Deployment',
      category: 'devops',
      level: 85,
      icon: '🚀',
      technologies: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
      description: 'CI/CD pipelines and cloud deployment',
      color: 'from-indigo-400 to-blue-400',
      projects: 6,
      experience: '1 Years'
    },
    
  ];

  // Enhanced stats with more dynamic data
  const stats = [
    {
      value: '450+',
      label: 'DSA Problems',
      description: 'LeetCode & Geeks For Geeks',
      icon: '💡',
      color: 'from-cyan-400 to-blue-500',
      trend: '100 Days Coding Badges On Leetcode',
      achievement: '450+Problem Solved and recently Acheived 100 days Badge on Leetcode'
    },
    {
      value: '8+',
      label: 'Projects Built',
      description: 'Full-stack applications & websites',
      icon: '🚀',
      color: 'from-green-400 to-emerald-500',
      trend: '5 live projects',
      achievement: '50+ users reached'
    },
    {
      value: '1+',
      label: 'Years Experience',
      description: 'Software development journey',
      icon: '⏱️',
      color: 'from-purple-400 to-pink-500',
      trend: 'Continuous learning',
      achievement: 'Multiple tech stacks'
    },
    {
      value: '90%',
      label: 'Client Satisfaction',
      description: 'Quality delivery & communication',
      icon: '⭐',
      color: 'from-orange-400 to-red-500',
      trend: '4.5 star ratings',
      achievement: 'Repeat clients'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: '🌟' },
    { id: 'frontend', label: 'Frontend', icon: '💻' },
    { id: 'backend', label: 'Backend', icon: '⚡' },
    { id: 'fullstack', label: 'Full Stack', icon: '🔄' },
    { id: 'algorithms', label: 'DSA', icon: '🧠' },
    { id: 'devops', label: 'DevOps', icon: '🚀' },
    { id: 'design', label: 'Technical Trainer', icon: '👨‍🏫' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const skillCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 border border-cyan-400/30 backdrop-blur-sm">
              💼 Professional Expertise
            </span>
          </motion.div>
          
          <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            Technical Skills
          </h3>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into digital solutions  and innovative problem-solving approaches.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm border ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-lg'
                  : 'bg-white/10 text-gray-300 border-white/20 hover:border-cyan-400/50 hover:text-cyan-400'
              }`}
              variants={itemVariants}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${selectedCategory}`}
                className="relative group cursor-pointer"
                variants={skillCardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                layoutId={skill.name}
                onHoverStart={() => setActiveSkill(index)}
                onHoverEnd={() => setActiveSkill(null)}
                whileHover={{ y: -10, rotateX: 5 }}
              >
                {/* Main Card */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 border border-white/20 overflow-hidden h-full">
                  {/* Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500`}
                    animate={{ opacity: activeSkill === index ? 0.1 : 0 }}
                  />
                  
                  {/* Floating Particles */}
                  {activeSkill === index && (
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                          style={{
                            left: `${20 + i * 10}%`,
                            top: `${20 + (i % 3) * 25}%`,
                          }}
                          animate={{
                            y: [-5, -15, -5],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="text-4xl"
                        animate={activeSkill === index ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.8 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <div className="text-right">
  <div className="text-sm text-gray-400">{skill.experience}</div>
  <div className="text-xs text-cyan-400">
    {skill.projects !== undefined 
      ? `${skill.projects} Projects` 
      : skill.problemsSolved !== undefined 
        ? `${skill.problemsSolved} Problems Solved` 
        : null}
  </div>
</div>


                    </div>

                    {/* Skill Name */}
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                      {skill.name}
                    </h4>
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {skill.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {skill.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300 border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {skill.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-cyan-500/20 rounded-lg text-xs text-cyan-400 border border-cyan-400/30">
                          +{skill.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Proficiency</span>
                        <span className={`text-sm font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        />
                        <motion.div
                          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl -z-10`}
                    animate={{ opacity: activeSkill === index ? 0.4 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Enhanced Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={itemVariants}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5
              }}
            >
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 border border-white/20 text-center overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
                  animate={{ opacity: hoveredStat === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Orbs */}
                {hoveredStat === index && (
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-60`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          x: [0, 10, 0],
                          scale: [0.5, 1, 0.5],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-4"
                    animate={hoveredStat === index ? { 
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  {/* Value */}
                  <motion.div 
                    className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={hoveredStat === index ? { scale: [1, 1.1, 1] } : {}}
                  >
                    {stat.value}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-white font-semibold mb-2">{stat.label}</div>
                  
                  {/* Description */}
                  <div className="text-gray-400 text-sm mb-3">{stat.description}</div>
                  
                  {/* Trend & Achievement */}
                  <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredStat === index ? 1 : 0,
                      height: hoveredStat === index ? 'auto' : 0
                    }}
                  >
                    <div className="text-green-400 text-xs font-medium">📈 {stat.trend}</div>
                    <div className="text-yellow-400 text-xs">🏆 {stat.achievement}</div>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 blur-xl -z-10`}
                  animate={{ opacity: hoveredStat === index ? 0.4 : 0 }}
                />
              </div>
            </motion.div>

          ))}
        </motion.div>
        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative inline-block">
            {/* Animated Border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-75 blur"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold text-white mb-4">Ready to Build Something Amazing?</h4>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Let's collaborate and turn your vision into a reality with Latest Technology .
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button
                  className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-2xl overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ type: 'tween', duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                     View My Projects
                  </span>
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-cyan-400"
                    initial={{ scale: 0, borderRadius: '100%' }}
                    whileHover={{ scale: 1, borderRadius: '0.75rem' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black">
                     Get In Touch
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default AdvancedSkillsSection;