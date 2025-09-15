import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Phone, MessageCircle, FileText, Code, Brain, Star, Calendar, DollarSign, Upload, Send, X, CheckCircle, ExternalLink, Sparkles, Zap, Trophy, Target, Clock, Users, Award, Briefcase, GraduationCap, Coffee } from 'lucide-react';

const Hireme = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    workType: 'freelance',
    timeline: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (isModalOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTab('contact');
    setIsSubmitted(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xeozvqeo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          project: formData.project,
          budget: formData.budget,
          workType: formData.workType,
          timeline: formData.timeline,
          urgency: formData.urgency,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          closeModal();
          setFormData({
            name: '',
            email: '',
            company: '',
            project: '',
            budget: '',
            workType: 'freelance',
            timeline: '',
            urgency: 'normal'
          });
        }, 4000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shahzadaliidrishi@gmail.com',
      subtitle: 'Professional inquiries welcome',
      action: () => window.open('mailto:shahzadaliidrishi@gmail.com?subject=Let\'s Work Together!&body=Hi Shahzad,%0A%0AI found your portfolio and would like to discuss a potential collaboration.', '_blank'),
      color: 'from-red-500 to-pink-500',
      hoverColor: 'hover:from-red-400 hover:to-pink-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn DM',
      value: 'Professional Network',
      subtitle: 'Connect for opportunities',
      action: () => window.open('https://www.linkedin.com/in/shahzad-ali-17584424b/', '_blank'),
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600'
    },
    {
      icon: Phone,
      label: 'Direct Call',
      value: '+91 8928462970',
      subtitle: 'Available 9 AM - 6 PM IST',
      action: () => window.open('tel:+918928462970', '_blank'),
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-400 hover:to-emerald-400'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Instant Response',
      subtitle: 'Quick discussions & updates',
      action: () => window.open('https://wa.me/918928462970?text=Hi Shahzad! I\'d like to discuss a project with you.', '_blank'),
      color: 'from-green-600 to-green-500',
      hoverColor: 'hover:from-green-500 hover:to-green-400'
    }
  ];

  const services = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'MERN Stack, React.js, Node.js, MongoDB, TypeScript',
      features: ['Responsive Design', 'API Integration', 'Database Design', 'Cloud Deployment'],
     
      projects: '10+ Projects',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'DSA Guidance & Tutoring',
      description: 'Data Structures, Algorithms, Competitive Programming, Interview Prep',
      features: ['1-on-1 Sessions', 'Problem Solving', 'Mock Interviews', 'Career Guidance'],
     
     
      projects: '10+ Students',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Technical Consultation',
      description: 'Architecture Design, Code Review, Performance Optimization',
      features: ['System Design', 'Code Audit', 'Tech Stack Selection', 'Scalability Planning'],
      
      
      projects: '15+ Consultations',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    { icon: Trophy, label: '15+', sublabel: 'Projects Completed' },
    { icon: Users, label: '8+', sublabel: 'Happy Clients' },
    { icon: Star, label: '4.5/5', sublabel: 'Client Rating' },
    { icon: Clock, label: '1+ Years', sublabel: 'Experience' }
  ];

  const workTypes = [
    { value: 'freelance', label: 'Freelance Project', icon: Briefcase, color: 'text-purple-400' },
    { value: 'fulltime', label: 'Full-time Position', icon: Calendar, color: 'text-blue-400' },
    { value: 'internship', label: 'Internship', icon: GraduationCap, color: 'text-green-400' },
    { value: 'consultation', label: 'Consultation', icon: Coffee, color: 'text-orange-400' },
    { value: 'tutoring', label: 'DSA Tutoring', icon: Brain, color: 'text-pink-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hire Me Button */}
      <button
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-16 py-6 rounded-full font-bold text-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 hover:shadow-purple-500/50 z-10"
      >
        <span className="relative z-10 flex items-center gap-3">
          <Sparkles className={`w-7 h-7 ${isHovered ? 'animate-spin' : 'animate-pulse'}`} />
          Hire Me
          <Zap className={`w-7 h-7 ${isHovered ? 'animate-bounce' : 'animate-pulse'}`} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
          {/* Mouse Follower Effect */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none blur-sm opacity-70 transition-all duration-100 ease-out"
            style={{
              left: mousePosition.x - 8,
              top: mousePosition.y - 8,
            }}
          ></div>

          <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-purple-500/30 animate-slideUp relative">
            {/* Glassmorphism Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl"></div>
            
            {/* Header */}
            <div className="relative p-8 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 text-white rounded-t-3xl backdrop-blur-lg">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90 group"
              >
                <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-8 h-8 text-yellow-400 animate-spin" />
                  <h2 className="text-4xl font-bold animate-gradient bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                    Let's Build Something Amazing Together!
                  </h2>
                  <Star className="w-8 h-8 text-yellow-400 animate-spin" />
                </div>
                
                <p className="text-purple-100 text-lg mb-4">Full Stack Developer | DSA Expert | Problem Solver</p>
                
                {/* Achievements Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                        <IconComponent className="w-6 h-6 mx-auto mb-2 text-yellow-400 group-hover:scale-110 transition-transform" />
                        <div className="font-bold text-xl">{achievement.label}</div>
                        <div className="text-sm text-purple-100 opacity-80">{achievement.sublabel}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-700/50 backdrop-blur-sm">
              {[
                { id: 'contact', label: 'Quick Connect', icon: MessageCircle, gradient: 'from-green-400 to-blue-400' },
                { id: 'services', label: 'My Services', icon: Code, gradient: 'from-purple-400 to-pink-400' },
                { id: 'form', label: 'Start Project', icon: FileText, gradient: 'from-orange-400 to-red-400' }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 p-6 flex items-center justify-center gap-3 font-semibold transition-all duration-300 relative group ${
                      activeTab === tab.id
                        ? 'text-transparent bg-clip-text bg-gradient-to-r ' + tab.gradient + ' border-b-2 border-purple-400 bg-slate-800/50'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800/30'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${activeTab === tab.id ? 'text-purple-400' : ''} group-hover:scale-110 transition-transform`} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-8 relative">
              {/* Quick Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Ready to Connect? 🚀
                    </h3>
                    <p className="text-gray-400 text-lg">Choose your preferred way to reach out and let's make magic happen!</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {contactOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={index}
                          onClick={option.action}
                          className={`group p-8 rounded-2xl bg-gradient-to-r ${option.color} ${option.hoverColor} hover:shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 text-white relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <Sparkles className="w-8 h-8" />
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                            <p className="text-sm opacity-90 mb-1">{option.value}</p>
                            <p className="text-xs opacity-75">{option.subtitle}</p>
                            <ExternalLink className="w-5 h-5 mt-3 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-600/50 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-300">
                      <span className="text-green-400 font-semibold text-lg">🟢 Available for:</span>
                      <div className="flex flex-wrap gap-2">
                        {['Full-time', 'Freelance', 'Internship', 'Remote', 'Contract'].map((type, index) => (
                          <span key={index} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm hover:bg-slate-600/50 transition-colors">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      ⚡ Response time: Usually within 2-4 hours
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Premium Services 💎
                    </h3>
                    <p className="text-gray-400 text-lg">Crafting digital solutions with expertise and passion</p>
                  </div>
                  
                  <div className="space-y-6">
                    {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <div
                          key={index}
                          className="p-8 bg-gradient-to-r from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10"
                        >
                          <div className="flex flex-col lg:flex-row items-start gap-6">
                            <div className={`p-4 bg-gradient-to-r ${service.color} rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                                <h4 className="text-2xl font-bold text-white mb-2 lg:mb-0">{service.title}</h4>
                                <div className="flex items-center gap-4">
                                  <span className="text-green-400 font-bold text-lg">{service.price}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-yellow-400 font-semibold">{service.rating}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-gray-400 mb-4 text-lg leading-relaxed">{service.description}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {service.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-purple-400 font-semibold">{service.projects}</span>
                                <button 
                                  onClick={() => setActiveTab('form')}
                                  className={`px-6 py-2 bg-gradient-to-r ${service.color} text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                                >
                                  Get Started
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('form')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        Start Your Project Now
                        <Star className="w-6 h-6 group-hover:animate-spin" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Project Form Tab */}
              {activeTab === 'form' && (
                <div className="animate-fadeIn">
                  {!isSubmitted ? (
                    <div className="space-y-8">
                      <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          Let's Create Something Extraordinary! ✨
                        </h3>
                        <p className="text-gray-400 text-lg">Share your vision and let's bring it to life together</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-400" />
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                            placeholder="Your Full Name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Mail className="w-5 h-5 text-purple-400" />
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-400" />
                            Company/Organization
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                            placeholder="Your Company/Organization"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-400" />
                            Work Type
                          </label>
                          <div className="relative">
                            <select
                              name="workType"
                              value={formData.workType}
                              onChange={handleInputChange}
                              className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm appearance-none cursor-pointer"
                            >
                              {workTypes.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            Timeline
                          </label>
                          <input
                            type="text"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                            placeholder="e.g., 2-3 weeks, ASAP, Flexible"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-400" />
                            Project Urgency
                          </label>
                          <div className="flex gap-3">
                            {[
                              { value: 'low', label: '🟢 Normal', color: 'border-green-500 text-green-400' },
                              { value: 'normal', label: '🟡 Priority', color: 'border-yellow-500 text-yellow-400' },
                              { value: 'high', label: '🔴 Urgent', color: 'border-red-500 text-red-400' }
                            ].map((urgency) => (
                              <button
                                key={urgency.value}
                                type="button"
                                onClick={() => setFormData({...formData, urgency: urgency.value})}
                                className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                                  formData.urgency === urgency.value 
                                    ? urgency.color + ' bg-current bg-opacity-10' 
                                    : 'border-slate-600 text-gray-400 hover:border-slate-500'
                                }`}
                              >
                                {urgency.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-400" />
                          Project Description *
                        </label>
                        <textarea
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          required
                          rows="5"
                          className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm resize-none"
                          placeholder="Tell me about your project vision, requirements, features you need, or role details. The more specific, the better I can help! "
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-3 text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-purple-400" />
                          Budget/Salary Expectation
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-slate-800/70 text-white rounded-xl border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                            placeholder="INR"
                          />
                          <div className="mt-2 text-sm text-gray-400">
                            💡 Don't worry, we can always discuss and find a fair rate that works for both of us!
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Submit Button */}
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting || !formData.name || !formData.email || !formData.project}
                          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-6 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Sending Your Message...</span>
                              <Sparkles className="w-6 h-6 animate-pulse" />
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                              <span>Send Message & Start the Magic ✨</span>
                              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            </>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                        
                        <div className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>I typically respond within 2-4 hours during business days</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Enhanced Success State
                    <div className="text-center py-16 animate-bounceIn">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 animate-ping">
                          <CheckCircle className="w-24 h-24 text-green-400 mx-auto opacity-20" />
                        </div>
                        <CheckCircle className="w-24 h-24 text-green-400 mx-auto relative z-10" />
                      </div>
                      
                      <h3 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        Message Sent Successfully! 🎉
                      </h3>
                      
                      <div className="max-w-md mx-auto mb-8">
                        <p className="text-gray-400 text-lg mb-4">
                          Thank you for reaching out! I'm excited about your project and will get back to you soon.
                        </p>
                        
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-green-500/20 backdrop-blur-sm">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-center">
                              <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                              <div className="text-green-400 font-semibold">Response Time</div>
                              <div className="text-gray-300">2-4 Hours</div>
                            </div>
                            <div className="text-center">
                              <MessageCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                              <div className="text-blue-400 font-semibold">Next Steps</div>
                              <div className="text-gray-300">Project Discussion</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-gray-400 mb-6">
                          Meanwhile, feel free to connect with me directly:
                        </p>
                        
                        <div className="flex justify-center gap-4 flex-wrap">
                          {contactOptions.slice(0, 4).map((option, index) => {
                            const IconComponent = option.icon;
                            return (
                              <button
                                key={index}
                                onClick={option.action}
                                className={`group p-4 rounded-2xl bg-gradient-to-r ${option.color} text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                              >
                                <IconComponent className="w-8 h-8 group-hover:animate-bounce" />
                                <div className="mt-2 text-xs font-semibold">{option.label}</div>
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                          <div className="flex items-center justify-center gap-2 text-purple-400 font-semibold mb-2">
                            <Star className="w-5 h-5" />
                            What happens next?
                            <Star className="w-5 h-5" />
                          </div>
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>✅ I'll review your project details carefully</div>
                            <div>✅ Prepare a personalized proposal for you</div>
                            <div>✅ Schedule a call to discuss everything in detail</div>
                            <div>✅ Start building something amazing together!</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Advanced Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(5deg); }
          70% { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-bounceIn {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: -2s;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        /* Glassmorphism Effects */
        .backdrop-blur-glass {
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
        
        /* Focus States */
        input:focus, textarea:focus, select:focus {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        /* Hover Effects */
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Hireme;