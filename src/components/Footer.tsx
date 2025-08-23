import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Code, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/shahzad2615',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/shahzad-ali-17584424b/',
    },
    {
      icon: Code,
      name: 'LeetCode',
      href: '#',
    },
    {
      icon: Mail,
      name: 'Email',
      href: 'mailto:shahzadaliidrishi@gmail.com',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-black to-[#1a1a1d] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
              Shahzad Ali
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              A passionate MERN Stack Developer dedicated to creating innovative web solutions. 
              Always learning, always growing, always coding.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                <strong>Location:</strong><br />
                Mumbai, Maharashtra
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Email:</strong><br />
                shahzadaliidrishi@gmail.com
              </p>
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Shahzad_Ali_Resume.pdf';
                  link.click();
                }}
                className="text-cyan-400 hover:text-purple-400 transition-colors duration-300 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Download Resume →
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              © {currentYear} Shahzad Ali. Made with{' '}
              <motion.span
                className="text-red-400 mx-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} />
              </motion.span>
              and lots of ☕
            </motion.p>
            
            <motion.button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white hover:from-purple-600 hover:to-cyan-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;