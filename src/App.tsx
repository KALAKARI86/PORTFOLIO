/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "", unzoom = false }: { children: React.ReactNode, delay?: number, className?: string, unzoom?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: unzoom ? 1.05 : 1 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'} px-6 rounded-full glass-nav flex items-center justify-between`}>
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          FS<span className="text-accent-purple">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="btn-gradient px-6 py-2.5 rounded-full text-sm font-medium text-white inline-flex items-center gap-2">
            Get in Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 glass-nav rounded-2xl p-6 flex flex-col gap-4 pointer-events-auto md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-white py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gradient px-6 py-3 rounded-xl text-center font-medium text-white mt-4"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="glow-bg w-[600px] h-[600px] bg-accent-purple/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="glow-bg w-[400px] h-[400px] bg-accent-indigo/30 top-1/4 left-1/3"></div>
      <div className="glow-bg w-[500px] h-[500px] bg-blue-900/20 bottom-1/4 right-1/4"></div>
      <div className="glow-bg w-[300px] h-[300px] bg-indigo-500/10 top-1/3 right-1/3"></div>
      <div className="glow-bg w-[450px] h-[450px] bg-purple-900/20 bottom-1/3 left-1/4"></div>

      <motion.div style={{ scale, opacity, y }} className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-medium text-text-secondary">Available for new opportunities</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            Crafting digital <br className="hidden md:block" />
            <span className="text-gradient-accent">experiences</span> that matter.
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            I’m a Graphic Designer & Video Editor specializing in high-end brand identity and dynamic motion content for the digital age.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="btn-gradient px-8 py-4 rounded-full text-white font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
            View My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/5 transition-colors w-full sm:w-auto justify-center flex items-center">
            Contact Me
          </a>
        </FadeIn>
      </motion.div>
    </section>
  );
};

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="w-full overflow-hidden flex bg-white/5 py-6 border-y border-white/5 relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10"></div>
      
      <motion.div 
        className="flex whitespace-nowrap items-center gap-16 px-8"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-xl md:text-2xl font-bold text-white/20 uppercase tracking-widest">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const skills = [
    "Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Print Design", "Adobe Premiere Pro", 
    "After Effects", "Visual Storytelling", "Brand Identity", "Thumbnail Design", "Motion Graphics", "Typography", "Color Grading"
  ];

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Technical <span className="text-gradient-accent">Arsenal</span>
          </h2>
        </FadeIn>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <FadeIn key={skill} delay={index * 0.05}>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass px-6 py-3 rounded-full text-text-secondary hover:text-white hover:border-accent-purple/50 transition-colors cursor-default"
              >
                {skill}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Fintech Dashboard",
      category: "Web Application",
      description: "A comprehensive financial dashboard with real-time data visualization and portfolio management.",
      image: "https://picsum.photos/seed/dashboard/800/600?blur=2",
      tags: ["React", "D3.js", "Tailwind"]
    },
    {
      title: "E-Commerce Platform",
      category: "Full Stack",
      description: "High-conversion headless e-commerce experience with seamless checkout and inventory sync.",
      image: "https://picsum.photos/seed/ecommerce/800/600?blur=2",
      tags: ["Next.js", "Shopify", "Stripe"]
    },
    {
      title: "AI Writing Assistant",
      category: "SaaS",
      description: "An AI-powered text editor that helps users write better content faster using LLMs.",
      image: "https://picsum.photos/seed/ai/800/600?blur=2",
      tags: ["TypeScript", "OpenAI", "ProseMirror"]
    },
    {
      title: "Creative Agency Site",
      category: "Marketing",
      description: "Award-winning portfolio site for a creative agency featuring WebGL transitions.",
      image: "https://picsum.photos/seed/agency/800/600?blur=2",
      tags: ["Three.js", "GSAP", "React"]
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="glow-bg w-[800px] h-[800px] bg-accent-indigo/10 top-0 right-0"></div>
      
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected <span className="text-gradient-accent">Works</span></h2>
              <p className="text-text-secondary max-w-xl">A collection of my recent projects focusing on user experience, performance, and clean code.</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-white hover:text-accent-purple transition-colors font-medium">
              View all projects <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1} unzoom>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-[24px] overflow-hidden group cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-purple transition-colors flex items-center justify-between">
                    {project.title}
                    <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                  </h3>
                  <p className="text-text-secondary mb-6 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-text-secondary bg-white/5 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Senior Frontend Engineer",
      company: "TechNova",
      period: "2023 - Present",
      description: "Leading the frontend architecture for a suite of enterprise SaaS products. Improved performance by 40% and established a comprehensive design system."
    },
    {
      role: "UI/UX Designer & Developer",
      company: "Creative Studio X",
      period: "2020 - 2023",
      description: "Designed and developed high-end marketing websites for Fortune 500 clients. Specialized in complex animations and interactive 3D experiences."
    },
    {
      role: "Frontend Developer",
      company: "Startup Inc",
      period: "2018 - 2020",
      description: "Built the initial MVP of a consumer-facing application that scaled to 100k+ active users. Worked closely with founders on product strategy."
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Work <span className="text-gradient-accent">Experience</span>
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1} unzoom>
              <div className="glass-card rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="md:w-1/3 shrink-0">
                  <div className="text-accent-purple font-mono text-sm mb-2">{exp.period}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-text-secondary font-medium">{exp.company}</div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-text-secondary leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is your design process?",
      answer: "I start with deep research and wireframing to understand the core problem. Then, I move to high-fidelity prototyping in Figma, ensuring every interaction is planned before writing a single line of code."
    },
    {
      question: "Do you take on freelance projects?",
      answer: "Yes, I selectively take on freelance projects that align with my skills and interests. I typically book 1-2 months in advance."
    },
    {
      question: "What technologies do you prefer?",
      answer: "My go-to stack is React/Next.js with TypeScript and Tailwind CSS. For animations, I love using Framer Motion and GSAP. I'm also experienced with Node.js for backend needs."
    },
    {
      question: "How do you handle project pricing?",
      answer: "I typically work on a project-based fee structure rather than hourly. This ensures we are both focused on the value delivered rather than time spent. Minimum engagement starts at $5k."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="glow-bg w-[500px] h-[500px] bg-accent-purple/10 bottom-0 left-0"></div>
      
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Common <span className="text-gradient-accent">Questions</span>
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-accent-purple/30' : ''}`}
              >
                <button 
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-text-secondary"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="glow-bg w-[800px] h-[800px] bg-accent-indigo/20 bottom-[-400px] left-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-5xl md:text-8xl lg:text-[120px] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-8">
              Let's Talk
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="mailto:hello@example.com" className="btn-gradient px-10 py-5 rounded-full text-lg font-medium text-white inline-flex items-center gap-3">
              <Mail size={24} /> hello@example.com
            </a>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <div className="text-text-secondary text-sm">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-accent-indigo z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="bg-grain"></div>
      <Navbar />
      
      <main>
        <Hero />
        <Marquee items={["Google", "Apple", "Stripe", "Vercel", "Figma", "Framer"]} />
        <Skills />
        <Projects />
        <Experience />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
