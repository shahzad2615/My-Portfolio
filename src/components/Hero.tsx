// Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import NeuronCursor from './NeuronCursor'; // Import the background

const Hero: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Put resume.pdf in "public" folder
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* NeuronCursor background */}
      <div className="absolute inset-0 z-0">
        <NeuronCursor />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Shahzad Ali
            </span>{' '}
            👇
          </motion.h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-20">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'MERN Stack Developer',
                1000,
                'Problem Solver (DSA)',
                1000,
                'Software Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
            />
          </div>

          {/* About paragraph */}
          <motion.div
            className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl text-gray-300 leading-relaxed text-justify">
              Passionate about building innovative web solutions with modern
              technologies, I work as a{' '}
              <span className="text-white font-semibold">
                Software Developer specializing in MERN Stack
              </span>
              . I’ve solved{' '}
              <span className="text-white font-semibold">450+ DSA problems</span>
              , strengthening my problem-solving skills, and built{' '}
              <span className="text-white font-semibold">
                real-world projects
              </span>{' '}
              that tackle practical challenges. With strong fundamentals and
              hands-on experience, I aim to create scalable and impactful
              applications.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={handleDownloadResume}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Download size={20} />
                <span>Download Resume</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ type: 'tween', duration: 0.3 }}
              />
            </motion.button>

            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="https://github.com/shahzad2615"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Github size={32} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/shahzad-ali-17584424b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Linkedin size={32} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToAbout}
        >
          <ArrowDown size={32} className="text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
