import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { User, MapPin, Mail, Calendar, Award, Code, Zap, Brain, Target } from 'lucide-react';
import NeuronCursor from './NeuronCursor'; // Import the enhanced neuron cursor
import shaizuimage from "../components/shaizuimage.jpeg"

const About: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const stats = [
    { label: 'Years Experience', value: '1+', icon: Calendar, color: 'from-cyan-400 to-blue-500', description: 'Professional development' },
    { label: 'Projects Completed', value: '10+', icon: Code, color: 'from-purple-400 to-pink-500', description: 'Full-stack applications' },
    { label: 'DSA Problems Solved', value: '450+', icon: Award, color: 'from-green-400 to-emerald-500', description: 'Algorithm challenges' },
    { label: 'LinkedIn Followers', value: '3.2K+', icon: User, color: 'from-orange-400 to-red-500', description: 'Community engagement' },
  ];

  const skills = [
    { name: 'Frontend Development', level: 95, icon: Code },
    { name: 'Backend Architecture', level: 90, icon: Brain },
    { name: 'Problem Solving', level: 88, icon: Target },
    { name: 'System Design', level: 85, icon: Zap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Enhanced Neuron Background with Multiple Layers */}
      <div className="absolute inset-0">
        <NeuronCursor intensity={0.4} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-3 h-3 bg-purple-400 rounded-full opacity-40"
        style={{ y: y2 }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity }}
      >
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
            animate={isHovered ? { 
              backgroundPosition: ["0%", "100%", "0%"],
              scale: [1, 1.05, 1] 
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Crafting digital experiences through code, creativity, and continuous innovation
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-20">
          {/* Enhanced Profile Section */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Profile Image with Advanced Effects */}
            <motion.div
              className="relative w-80 h-80 mx-auto mb-12"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Animated Border Rings */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60" 
                     style={{
                       background: 'conic-gradient(from 0deg, #00ffff, #8000ff, #ff0080, #00ffff)',
                       padding: '3px',
                       borderRadius: '50%'
                     }}>
                  <div className="w-full h-full bg-gray-900 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Profile Image Container */}
              <div className="absolute  rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-4 border-white/10">
                {/* Replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-6xl text-white/80">
                <img src={shaizuimage} alt="Passport photo" />
                  
                </div>
              </div>
              {/* Floating Info Badges */}
              <motion.div
                className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                MERN Stack
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                Full Stack
              </motion.div>
             
            </motion.div>

            {/* Contact Info Cards */}
            {/* Floating Info Badges */}
<motion.div
  className="absolute -top-2 -left-2 bg-gradient-to-r from-green-400 to-lime-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
  animate={{ y: [-5, 5, -5] }}
  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
>
  Problem Solver (DSA)
</motion.div>


{/* <motion.div
  className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
  animate={{ y: [5, -5, 5] }}
  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
>
  Full Stack
</motion.div> */}

          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Story Card */}
            <motion.div
              className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 relative overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
              {...cardHoverVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 flex items-center gap-3">
                  <Brain className="text-cyan-400" size={28} />
                  My Journey
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
  I'm a passionate Software Developer with a Bachelor's degree in Information Technology from Vikas College (CGPA: 9.01). 
  Currently working as a MERN Stack Developer at Utkarsh Global Foundation, I specialize in building scalable web applications 
  that combine technical excellence with exceptional user experiences. Alongside my development work, I have solved 
  <span className="font-semibold text-cyan-400"> 450+ Data Structures and Algorithms problems </span> across platforms such 
  as <span className="font-semibold">LeetCode</span> and <span className="font-semibold">GeeksforGeeks</span>, and I 
  consistently participate in coding contests to sharpen my problem-solving and algorithmic skills.
</p>

              </div>
            </motion.div>

            {/* What I Do Card */}
            <motion.div
              className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 relative overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
              {...cardHoverVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 flex items-center gap-3">
                  <Code className="text-purple-400" size={28} />
                  What I Do
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  I focus on creating dynamic, responsive web applications with cutting-edge technologies. My expertise spans React.js, Next.js, Node.js, Express.js, and MongoDB. I'm also passionate about teaching and currently serve as a Software Development Trainer, sharing knowledge with the next generation of developers.
                </p>
              </div>
            </motion.div>

            {/* Passion Card */}
            <motion.div
              className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 relative overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
              {...cardHoverVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4 flex items-center gap-3">
                  <Target className="text-green-400" size={28} />
                  My Passion
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  Beyond coding, I'm deeply passionate about problem-solving and continuous learning. With 450+ DSA problems solved and 3.2K+ LinkedIn Connections , I actively engage with the developer community, sharing insights and supporting fellow developers in their journey.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-20 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-12 ">
            Technical Expertise
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <skill.icon size={24} className="text-cyan-400" />
                  <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                </div>
                
                <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400 text-sm">Proficiency</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative backdrop-blur-lg bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-6 border border-white/20 text-center group cursor-pointer overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -10,
                rotateX: 5,
                rotateY: index % 2 === 0 ? 5 : -5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
            >
              {/* Animated Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                initial={false}
                animate={{ opacity: activeCard === index ? 0.15 : 0 }}
              />
              
              {/* Floating Particles Effect */}
              {activeCard === index && (
                <motion.div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-10, -20, -10],
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
                </motion.div>
              )}
              
              <div className="relative z-10">
                {/* Icon with Enhanced Animation */}
                <motion.div
                  className="mb-4"
                  animate={activeCard === index ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0] 
                  } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon 
                    size={40} 
                    className={`mx-auto text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                    style={{ 
                      filter: activeCard === index ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' : 'none'
                    }}
                  />
                </motion.div>
                
                {/* Value with Counter Animation */}
                <motion.div 
                  className="text-4xl font-bold text-white mb-2"
                  animate={activeCard === index ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <div className="text-gray-400 text-sm font-medium mb-2">{stat.label}</div>
                
                {/* Description */}
                <motion.div 
                  className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: activeCard === index ? 1 : 0 }}
                >
                  {stat.description}
                </motion.div>
              </div>
              
              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 blur-xl`}
                animate={{ opacity: activeCard === index ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Projects
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                borderColor: "rgba(0, 255, 255, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;