// Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import NeuronCursor from './NeuronCursor';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Place resume.pdf in "public" folder
    link.download = 'Shahzad_Ali_Resume.pdf';
    link.click();
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <NeuronCursor />
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto text-center relative z-10 py-12 sm:py-16 lg:py-20">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Shahzad Ali
          </span>{' '}
          <span className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            👋
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <div className="h-14 sm:h-16 md:h-20 flex items-center justify-center mb-6 sm:mb-8">
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              1200,
              'MERN Stack Developer',
              1200,
              'Problem Solver (DSA)',
              1200,
              'Software Developer',
              1200,
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300"
          />
        </div>

        {/* About Paragraph */}
        <motion.div
          className="max-w-2xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-justify">
            Passionate about building innovative web solutions with modern
            technologies, I work as a{' '}
            <span className="text-white font-semibold">
              Software Developer specializing in MERN Stack
            </span>
            . I've solved{' '}
            <span className="text-white font-semibold">450+ DSA problems</span>,
            strengthening my problem-solving skills, and built{' '}
            <span className="text-white font-semibold">real-world projects</span>{' '}
            that tackle practical challenges. With strong fundamentals and
            hands-on experience, I aim to create scalable and impactful
            applications.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={handleDownloadResume}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white text-sm sm:text-base overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Download size={18} className="sm:w-5 sm:h-5" />
              <span>Download Resume</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
            />
          </motion.button>

          <Link to="/hireme">
            <motion.button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center space-x-6 sm:space-x-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/shahzad2615"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label="GitHub Profile"
          >
            <Github size={28} className="sm:w-8 sm:h-8" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/shahzad-ali-17584424b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={28} className="sm:w-8 sm:h-8" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToAbout}
      >
        <ArrowDown size={28} className="sm:w-8 sm:h-8 text-cyan-400" />
      </motion.div>

      {/* Mobile Hint */}
      <div className="block sm:hidden absolute top-4 right-4 text-cyan-400 text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
        Touch to interact
      </div>
    </section>
  );
};

export default Hero;
