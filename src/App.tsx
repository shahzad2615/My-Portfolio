import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import NeuronCursor from './components/NeuronCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import AdvancedSkillsSection from './components/AdvancedSkillsSection';
import { ThemeProvider } from './ThemeContext';
import Achievements from "./components/Achievements"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0e0e10] via-[#1a1a1d] to-[#0e0e10] text-white overflow-x-hidden">
        <Preloader />
        {/* <NeuronCursor /> */}
        <Navbar />

        <Routes>
          {/* Default redirect: / → /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* 🏠 Home */}
          <Route
            path="/home"
            element={
              <>
                <Hero />
                <About />
                <AdvancedSkillsSection />
              </>
            }
          />

          {/* 📄 Other Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/achievements" element={<Achievements/>}/>

          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* 👇 Footer visible on every page */}
        <Footer />

        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
