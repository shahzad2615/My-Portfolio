import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Software Developer (MERN Stack)',
      company: 'Utkarsh Global Foundation',
      location: 'Mumbai, Maharashtra, India',
      duration: 'June 2025 – Present',
      description: [
        'Full-time onsite role focusing on building dynamic web applications using MongoDB, Express.js, React.js, and Next.js.',
        'Collaborated with cross-functional teams to develop scalable, responsive user interfaces and RESTful APIs.',
        'Contributed to the enhancement of user experience and backend integration through efficient code and UI improvements.',
      ],
      icon: Briefcase,
    },
    {
      type: 'work',
      title: 'Software Development Trainer (Java, SQL)',
      company: 'Dcodetech',
      location: 'Thane, Maharashtra, India',
      duration: 'May 2025 – Present (Part-time)',
      description: [
        'Training students in Java and SQL, focusing on real-world applications, database management, and backend development.',
        'Designed hands-on projects and coding assignments to strengthen student understanding of software development concepts.',
        'Mentored students in problem-solving techniques and best practices in software development.',
      ],
      icon: Briefcase,
    },
    {
      type: 'education',
      title: 'Bachelor of Science in Information Technology',
      company: 'Vikas College of Arts, Science and Commerce',
      location: 'Vikhroli East, Mumbai, Maharashtra, India',
      duration: 'August 2022 – April 2025',
      description: [
        'Graduated with CGPA: 9.01',
        'Specialized in software development, database management, and web technologies.',
        'Participated in various technical projects and hackathons.',
        'Active member of the college programming club.',
      ],
      icon: GraduationCap,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-20"
                variants={itemVariants}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-4 border-[#1a1a1d]"></div>

                {/* Experience Card */}
                <motion.div
                  className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg">
                        <exp.icon size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-cyan-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-gray-300 text-sm mb-1">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {exp.description.map((item, descIndex) => (
                      <motion.div
                        key={descIndex}
                        className="flex items-start space-x-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: descIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Web Development Internship Certificate',
                issuer: 'CodeAlpha',
                date: '2024',
              },
              {
                title: 'Cloud Computing Internship Certificate',
                issuer: 'iFuture Technologies',
                date: '2024',
              },
              {
                title: 'Data Structures and Algorithms Certification',
                issuer: 'Great Learning',
                date: '2024',
              },
              {
                title: 'JavaScript Certification',
                issuer: 'HackerRank',
                date: '2024',
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg">
                    <GraduationCap size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                    <p className="text-gray-300 text-sm">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">{cert.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;