import React, { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code,
  Award,
  MessageCircle,
  Send,
  Copy,
  Check,
  Zap,
  Star,
  Globe,
  Terminal
} from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  // Formspree integration hook with form ID "xeozvqeo"
  const [state, handleFormSubmit] = useForm("xeozvqeo");

  useEffect(() => {
    setIsVisible(true);
    // Initialize floating particles
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(particleArray);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    };
    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Clear form on successful submission
  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' });
    }
  }, [state.succeeded]);

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8928462970',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
      shadow: 'shadow-emerald-500/25',
      action: 'tel:+918928462970',
      description: 'Available 24/7'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'shahzadaliidrishi@gmail.com',
      gradient: 'from-blue-400 via-indigo-400 to-purple-400',
      shadow: 'shadow-blue-500/25',
      action: 'mailto:shahzadaliidrishi@gmail.com',
      description: 'Response within 2 hours'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mumbai, Maharashtra',
      gradient: 'from-purple-400 via-pink-400 to-rose-400',
      shadow: 'shadow-purple-500/25',
      action: null,
      description: 'Remote friendly'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/shahzad-ali-17584424b',
      color: 'hover:text-blue-400',
      bgGlow: 'hover:bg-blue-500/10',
      followers: '3.7K+ followers'
    },
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/shahzad2615',
      color: 'hover:text-gray-300',
      bgGlow: 'hover:bg-gray-500/10',
      followers: 'Open source'
    },
    {
      icon: Code,
      label: 'LeetCode',
      url: 'https://leetcode.com/u/shahzad401',
      color: 'hover:text-orange-400',
      bgGlow: 'hover:bg-orange-500/10',
      followers: '450+ problems'
    },
    {
      icon: Award,
      label: 'GeeksforGeeks',
      url: 'https://geeksforgeeks.org/user/shahzadal5kru',
      color: 'hover:text-green-400',
      bgGlow: 'hover:bg-green-500/10',
      followers: 'Master badge'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const techStack = [
    { name: 'React.js', level: 95, color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', level: 90, color: 'from-green-400 to-emerald-500' },
    { name: 'MongoDB', level: 85, color: 'from-green-500 to-teal-500' },
    { name: 'TypeScript', level: 88, color: 'from-blue-500 to-indigo-500' },
    { name: 'Express.js', level: 92, color: 'from-gray-400 to-gray-600' },
    { name: 'TailwindCSS', level: 94, color: 'from-cyan-400 to-teal-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

        {/* Floating Particles */}
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}

        {/* Mouse Follower Gradient */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-purple-500/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Hero Header */}
        <div className={`text-center mb-16 transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative inline-block mb-8">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
              GET IN TOUCH
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-2xl opacity-20 animate-pulse"></div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8">
              <Terminal className="w-8 h-8 text-cyan-400 animate-bounce" />
            </div>
            <div className="absolute -top-8 -right-8">
              <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
              Ready to turn your vision into reality? Let's build something extraordinary together.
            </p>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>MERN Stack Expert</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-400" />
                <span>Mumbai Based</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className={`xl:col-span-1 space-y-6 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 transition-all duration-700 hover:scale-105 hover:border-gray-700 ${item.shadow} cursor-pointer`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => item.action && window.open(item.action)}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.value);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800"
                    >
                      {copiedText === item.value ?
                        <Check className="w-5 h-5 text-green-400" /> :
                        <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
                      }
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors mb-2 font-medium">{item.value}</p>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{item.description}</p>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${item.gradient} p-[1px]`}>
                  <div className="w-full h-full rounded-2xl bg-gray-900"></div>
                </div>
              </div>
            ))}

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 p-6 transition-all duration-500 hover:scale-105 hover:border-gray-700 ${social.bgGlow}`}
                >
                  <div className="text-center">
                    <social.icon className={`w-8 h-8 text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-all duration-300 ${social.color}`} />
                    <h4 className="text-white font-semibold mb-1">{social.label}</h4>
                    <p className="text-xs text-gray-500">{social.followers}</p>
                  </div>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form & Tech Stack */}
          <div className={`xl:col-span-2 space-y-8 transition-all duration-1500 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {/* Contact Form */}
            <div className="relative overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Let's Create Together</h2>
                    <p className="text-gray-400">Drop me a message and let's discuss your project</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all duration-300"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all duration-300"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows="6"
                      className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all duration-300 resize-none"
                      required
                    ></textarea>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group relative w-full py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>{state.submitting ? "Sending..." : "Send Message"}</span>
                      {state.succeeded && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>

                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  </button>
                </form>

                {state.succeeded && (
                  <p className="text-green-400 mt-4 text-center">
                    Thanks for your message! I'll get back to you soon.
                  </p>
                )}
              </div>
            </div>

            {/* Tech Stack Showcase */}
            <div className="rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Code className="w-7 h-7 mr-3 text-cyan-400" />
                Tech Expertise
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {techStack.map((tech, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{tech.name}</span>
                      <span className="text-gray-400">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${tech.color} transition-all duration-1000 group-hover:animate-pulse`}
                        style={{
                          width: `${tech.level}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className={`mt-16 grid md:grid-cols-4 gap-6 transition-all duration-1500 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {[
            { number: '450+', label: 'DSA Problems', icon: Code, color: 'from-green-400 to-emerald-500' },
            { number: '3.5K+', label: 'LinkedIn Network', icon: Linkedin, color: 'from-blue-400 to-cyan-500' },
            { number: '100+', label: 'Day Streak', icon: Zap, color: 'from-orange-400 to-red-500' },
            { number: '9.01', label: 'CGPA Score', icon: Star, color: 'from-purple-400 to-pink-500' }
          ].map((stat, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-800 p-6 hover:border-gray-700 transition-all duration-500 hover:scale-105">
              <div className="text-center">
                <stat.icon className={`w-10 h-10 mx-auto mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};
export default Contact;

