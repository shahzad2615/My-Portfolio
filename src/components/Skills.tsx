import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Wrench, Award, BookOpen } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Java', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'C++', level: 85 },
        { name: 'C#', level: 75 },
        { name: 'SQL', level: 80 },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      icon: Server,
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: '.NET', level: 75 },
        { name: 'Selenium', level: 70 },
      ],
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'Firebase', level: 80 },
        { name: 'Git/GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'IntelliJ', level: 80 },
        { name: 'Netbeans', level: 75 },
      ],
    },
    {
      title: 'Other Skills',
      icon: Wrench,
      skills: [
        { name: 'Data Structures & Algorithms', level: 85 },
        { name: 'Object-Oriented Programming', level: 90 },
        { name: 'REST APIs', level: 80 },
        { name: 'Responsive Design', level: 85 },
        { name: 'Problem Solving', level: 90 },
        { name: 'Team Collaboration', level: 85 },
      ],
    },
  ];

  const achievements = [
    {
      title: 'Master Badge',
      description: 'Coding Ninjas',
      icon: Award,
    },
    {
      title: 'Coding Streaks',
      description: '50, 100, 150 days on LeetCode',
      icon: Award,
    },
    {
      title: 'Problem Solver',
      description: '450+ DSA problems solved',
      icon: BookOpen,
    },
    {
      title: 'Community Leader',
      description: '2.5K+ LinkedIn followers',
      icon: Award,
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <category.icon size={24} className="text-cyan-400 mr-3" />
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-cyan-400 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <achievement.icon size={32} className="text-cyan-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Web Development Internship - CodeAlpha',
              'Cloud Computing Internship - iFuture Technologies',
              'Data Structures and Algorithms - Great Learning',
              'JavaScript Certification - HackerRank',
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;