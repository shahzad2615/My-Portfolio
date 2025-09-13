import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { User, MapPin, Mail, Calendar, Award, Code, Zap, Brain, Target, Github, Linkedin, Instagram, Facebook, ExternalLink, Clock, Users } from 'lucide-react';
import shaizuimage from "../components/shaizuimage.jpeg"
import NeuronCursor from './NeuronCursor';

// Mock NeuronCursor component (replace with your actual component)


const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollYProgress } = useScroll();
  
  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Live time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live age
  const liveAge = useMemo(() => {
    const birthDate = new Date(2004, 5, 8); // June 8, 2004 (month is 0-indexed)
    const now = currentTime;
    const diffTime = Math.abs(now - birthDate);
    
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    return { years, months, days, hours, minutes, seconds };
  }, [currentTime]);

  // Social media links with live stats (mock data - replace with actual API calls)
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/shahzad2615',
      color: 'from-gray-400 to-gray-600',
      stats: { label: 'Repositories', value: '25+' },
      description: 'Open source projects & contributions'
    },
    {
      name: 'LeetCode',
      icon: Code,
      url: 'https://leetcode.com/u/shahzad401/',
      color: 'from-orange-400 to-yellow-500',
      stats: { label: 'Problems Solved', value: '450+' },
      description: 'Algorithm & data structure challenges'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/shahzad-ali-17584424b/',
      color: 'from-blue-400 to-blue-600',
      stats: { label: 'Connections', value: '3.2K+' },
      description: 'Professional networking & insights'
    },
    {
      name: 'GeeksforGeeks',
      icon: Target,
      url: 'https://www.geeksforgeeks.org/user/shahzadal5kru/',
      color: 'from-green-400 to-green-600',
      stats: { label: 'Articles & Solutions', value: '50+' },
      description: 'Technical articles & problem solutions'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com//its_shahzad_134',
      color: 'from-pink-400 to-purple-600',
      stats: { label: 'Followers', value: '1.2K+' },
      description: 'Behind the scenes & tech updates'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/share/14LFReFpnSD/',
      color: 'from-blue-500 to-blue-700',
      stats: { label: 'Friends', value: '500+' },
      description: 'Community & personal updates'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: '1+', icon: Calendar, color: 'from-cyan-400 to-blue-500', description: 'Professional development' },
    { label: 'Projects Completed', value: '10+', icon: Code, color: 'from-purple-400 to-pink-500', description: 'Full-stack applications' },
    { label: 'DSA Problems Solved', value: '450+', icon: Award, color: 'from-green-400 to-emerald-500', description: 'Algorithm challenges' },
    { label: 'LinkedIn Connections', value: '3.2K+', icon: User, color: 'from-orange-400 to-red-500', description: 'Community engagement' },
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Enhanced Neuron Background */}
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
          className="text-center mb-16"
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

        {/* Live Age Counter
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center justify-center gap-2">
              <Clock className="text-cyan-400" size={24} />
              Live Age Counter
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              {[
                { label: 'Years', value: liveAge.years },
                { label: 'Months', value: liveAge.months },
                { label: 'Days', value: liveAge.days },
                { label: 'Hours', value: liveAge.hours },
                { label: 'Minutes', value: liveAge.minutes },
                { label: 'Seconds', value: liveAge.seconds }
              ].map((item, index) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div> */}

        {/* Social Media Links */}
        {/* <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8"
            variants={itemVariants}
          >
            Connect With Me
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                variants={itemVariants}
                whileHover="hover"
                {...cardHoverVariants}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${social.color} shadow-lg`}>
                        <social.icon className="text-white" size={24} />
                      </div>
                      <ExternalLink className="text-gray-400 group-hover:text-white transition-colors duration-300" size={16} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{social.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-300">{social.stats.label}: </span>
                      <span className="text-sm font-bold text-cyan-400">{social.stats.value}</span>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {social.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div> */}

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
            {/* <motion.div
              className="relative w-80 h-80 mx-auto mb-12"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Animated Border Rings */}
              {/* <motion.div 
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
              </motion.div> */} 
              
              {/* Profile Image Container */}
              <div>
                <img src={shaizuimage} alt="shahzad image" />
              </div>

{/* Profile Image Container */}





              
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
              <motion.div
                className="absolute -top-2 -left-2 bg-gradient-to-r from-green-400 to-lime-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                Problem Solver
              </motion.div>
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
                  Beyond coding, I'm deeply passionate about problem-solving and continuous learning. With 450+ DSA problems solved and 3.2K+ LinkedIn Connections, I actively engage with the developer community, sharing insights and supporting fellow developers in their journey.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Live Age Counter */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center justify-center gap-2">
              <Clock className="text-cyan-400" size={24} />
              Live Age Counter
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              {[
                { label: 'Years', value: liveAge.years },
                { label: 'Months', value: liveAge.months },
                { label: 'Days', value: liveAge.days },
                { label: 'Hours', value: liveAge.hours },
                { label: 'Minutes', value: liveAge.minutes },
                { label: 'Seconds', value: liveAge.seconds }
              ].map((item, index) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8"
            variants={itemVariants}
          >
            Connect With Me
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                variants={itemVariants}
                whileHover="hover"
                {...cardHoverVariants}
                  
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${social.color} shadow-lg`}>
                        <social.icon className="text-white" size={24} />
                      </div>
                      <ExternalLink className="text-gray-400 group-hover:text-white transition-colors duration-300" size={16} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{social.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-300">{social.stats.label}: </span>
                      <span className="text-sm font-bold text-cyan-400">{social.stats.value}</span>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {social.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;