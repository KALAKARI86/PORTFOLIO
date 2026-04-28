/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useVelocity, useAnimationFrame } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  Menu,
  X,
  Play
} from 'lucide-react';

// --- Components ---

const MagneticElement = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, className = "", unzoom = false }: { children: React.ReactNode, delay?: number, className?: string, unzoom?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: unzoom ? 1.05 : 1 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
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
    { name: 'Video Projects', href: '#projects' },
    { name: 'Client Work', href: '#experience' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'} px-6 rounded-full glass-nav flex items-center justify-between`}>
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          Flux<span className="text-accent-purple">.</span>Studio
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <React.Fragment key={link.name}>
              <MagneticElement>
                <a href={link.href} className="text-sm font-medium text-text-secondary hover:text-white transition-colors block py-2">
                  {link.name}
                </a>
              </MagneticElement>
            </React.Fragment>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticElement>
            <button onClick={onContactClick} className="btn-gradient px-6 py-2.5 rounded-full text-sm font-medium text-white inline-flex items-center gap-2 cursor-pointer">
              Get in Touch
            </button>
          </MagneticElement>
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
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="btn-gradient px-6 py-3 rounded-xl text-center font-medium text-white mt-4 cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 800], [0, 150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <motion.div style={{ x: useTransform(smoothMouseX, v => v * -1), y: useTransform(smoothMouseY, v => v * -1) }} className="glow-bg w-[600px] h-[600px] bg-accent-purple/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></motion.div>
      <motion.div style={{ x: useTransform(smoothMouseX, v => v * 2), y: useTransform(smoothMouseY, v => v * 2) }} className="glow-bg w-[400px] h-[400px] bg-accent-indigo/30 top-1/4 left-1/3"></motion.div>
      <motion.div style={{ x: useTransform(smoothMouseX, v => v * -1.5), y: useTransform(smoothMouseY, v => v * -1.5) }} className="glow-bg w-[500px] h-[500px] bg-blue-900/20 bottom-1/4 right-1/4"></motion.div>
      <motion.div style={{ x: useTransform(smoothMouseX, v => v * 1.5), y: useTransform(smoothMouseY, v => v * 1.5) }} className="glow-bg w-[300px] h-[300px] bg-indigo-500/10 top-1/3 right-1/3"></motion.div>
      <motion.div style={{ x: useTransform(smoothMouseX, v => v * 0.5), y: useTransform(smoothMouseY, v => v * 0.5) }} className="glow-bg w-[450px] h-[450px] bg-purple-900/20 bottom-1/3 left-1/4"></motion.div>

      <motion.div style={{ scale, opacity, y }} className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 cursor-default hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-medium text-text-secondary">Available for new opportunities</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] uppercase">
            Let's create high-converting <br className="hidden md:block" />
            <span className="text-gradient-accent">videos</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            I help SaaS brands and creators boost retention and conversions with high-impact motion graphics and video editing.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticElement className="w-full sm:w-auto">
            <button onClick={onContactClick} className="btn-gradient px-8 py-4 rounded-full text-white font-medium flex items-center gap-2 w-full justify-center cursor-pointer">
              Work With Me <ArrowRight size={18} />
            </button>
          </MagneticElement>
          <MagneticElement className="w-full sm:w-auto">
            <a href="#projects" className="px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/5 transition-colors w-full justify-center flex items-center">
              View Projects
            </a>
          </MagneticElement>
        </FadeIn>
      </motion.div>
    </section>
  );
};

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  const baseVelocity = reverse ? 1 : -1;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy * 5);
  });

  // Helper function to wrap values
  function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  return (
    <div className="w-full overflow-hidden flex bg-white/5 py-6 border-y border-white/5 relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none"></div>
      
      <motion.div 
        className="flex whitespace-nowrap items-center gap-16 px-8"
        style={{ x }}
      >
        {[...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-xl md:text-2xl font-bold text-white/20 uppercase tracking-widest hover:text-white hover:scale-110 transition-all cursor-default">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const skills = [
    "After Effects", "Premiere Pro", "Photoshop", "Motion Graphics", "SaaS Video Editing", 
    "UI Animation", "Product Explainers", "Ad Creatives", "Kinetic Typography", "Retention Editing"
  ];

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Technical <span className="text-gradient-accent">Arsenal</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Tools and skills I use to create high-converting SaaS videos and motion graphics that drive engagement and results.
            </p>
          </div>
        </FadeIn>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <React.Fragment key={skill}>
              <FadeIn delay={index * 0.05}>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass px-6 py-3 rounded-full text-text-secondary hover:text-white hover:border-accent-purple/50 transition-colors cursor-default"
                >
                  {skill}
                </motion.div>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const smoothRotateX = useSpring(rotateX, { damping: 30, stiffness: 300, mass: 0.5 });
  const smoothRotateY = useSpring(rotateY, { damping: 30, stiffness: 300, mass: 0.5 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    rotateX.set(yPct * -10); // Tilt up/down
    rotateY.set(xPct * 10);  // Tilt left/right
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(79, 70, 229, 0.15), transparent 40%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-card rounded-[24px] overflow-hidden group cursor-pointer relative ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 z-30 mix-blend-screen"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ background }}
      />
      {children}
    </motion.div>
  );
};

const ProjectVideoCard = ({ 
  project 
}: { 
  project: any; 
}) => {
  return (
    <InteractiveCard className="h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-black rounded-t-[24px]">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="w-full h-full"
        >
          <video
            id={project.id}
            className="cld-video-player cld-fluid project-video w-full h-full object-cover"
            controls
          ></video>
        </motion.div>
        
        <div className="absolute top-4 left-4 z-50 pointer-events-none">
          <span className="glass px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col relative z-20">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-purple transition-colors flex items-center justify-between">
          {project.title}
        </h3>
        <p className="text-text-secondary mb-6 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-medium text-text-secondary bg-white/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </InteractiveCard>
  );
};

const Projects = () => {
  const projects = [
    {
      id: "video1",
      publicId: "SAAS_WORK_1_ssnpjb",
      title: "SaaS Product Explainer",
      category: "Motion Graphics",
      description: "Premium SaaS explainer video focused on product clarity, smooth motion, and viewer retention.",
      tags: ["After Effects", "Motion Graphics", "SaaS"]
    },
    {
      id: "video2",
      publicId: "COVARI_REVICED_mqgjhc",
      title: "SaaS Ad Creative",
      category: "Performance Video",
      description: "Conversion-focused video creative designed for paid ads, launches, and product marketing.",
      tags: ["Ad Creative", "Motion Graphics", "Conversion"]
    },
    {
      id: "video3",
      publicId: "SAAS_WORK_2_ckb5z2",
      title: "Product UI Motion Video",
      category: "UI Animation",
      description: "Clean product interface animation built to showcase features with premium visual flow.",
      tags: ["UI Animation", "Product Video", "SaaS"]
    },
    {
      id: "video4",
      publicId: "saas_4_kjhqq9",
      title: "SaaS Promo Video",
      category: "Promo Editing",
      description: "Modern SaaS promo edit with strong pacing, clean transitions, and professional motion design.",
      tags: ["Promo Video", "After Effects", "Retention"]
    }
  ];

  useEffect(() => {
    if (!(window as any).cloudinary) return;

    const cloudName = "dkrn6dgag";
    let players: any[] = [];

    projects.forEach(project => {
      const el = document.getElementById(project.id);
      if (!el) return;

      try {
        const p = (window as any).cloudinary.player(project.id, {
          cloudName: cloudName,
          publicId: project.publicId,
          controls: true,
          muted: true,
          autoplay: false,
          loop: false,
          fluid: true
        });

        players.push(p);

        p.on("play", () => {
          players.forEach((other: any) => {
            if (other !== p) other.pause();
          });
        });
      } catch (e) {
        console.error("Cloudinary player init error", e);
      }
    });
  }, []);

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
            <React.Fragment key={index}>
              <FadeIn delay={index * 0.1} unzoom>
                <ProjectVideoCard project={project} />
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Motion Graphics Editor",
      company: "Freelance / Flux Studio",
      period: "2023 - Present",
      description: "Created high-converting SaaS videos, improving client engagement and retention."
    },
    {
      role: "Video Editor",
      company: "Freelance",
      period: "2020 - 2023",
      description: "Edited YouTube and marketing content with focus on storytelling and pacing."
    },
    {
      role: "Thumbnail & Visual Designer",
      company: "Independent Creator",
      period: "2018 - 2020",
      description: "Designed scroll-stopping thumbnails and visual assets."
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
            <React.Fragment key={index}>
              <FadeIn delay={index * 0.1} unzoom>
                <InteractiveCard className="p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-1/3 shrink-0">
                    <div className="text-accent-purple font-mono text-sm mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-text-secondary font-medium">{exp.company}</div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-text-secondary leading-relaxed">{exp.description}</p>
                  </div>
                </InteractiveCard>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Do you take freelance projects?",
      answer: "Yes, I work with SaaS brands, creators, and agencies."
    },
    {
      question: "What tools do you use?",
      answer: "After Effects, Premiere Pro, Photoshop, AI tools."
    },
    {
      question: "How do you price projects?",
      answer: "Based on complexity, duration, and required quality."
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
            <React.Fragment key={index}>
              <FadeIn delay={index * 0.1}>
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="glow-bg w-[800px] h-[800px] bg-accent-indigo/20 bottom-[-400px] left-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-8">
              Let's Create High-Converting Videos
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              I help SaaS brands and creators boost retention and conversions with high-impact motion graphics and video editing.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <MagneticElement>
              <button onClick={onContactClick} className="btn-gradient px-10 py-5 rounded-full text-lg font-medium text-white inline-flex items-center gap-3 cursor-pointer">
                <Mail size={24} /> Work With Me
              </button>
            </MagneticElement>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <div className="text-text-secondary text-sm">
            © {new Date().getFullYear()} RS. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/flux.studio__/" target="_blank" rel="noopener noreferrer" className="relative group text-text-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] cursor-pointer">
              <Instagram size={20} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#0f0f13]/80 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl">
                Instagram
              </span>
            </a>
            <a href="https://x.com/fluxstudio_1" target="_blank" rel="noopener noreferrer" className="relative group text-text-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] cursor-pointer">
              <Twitter size={20} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#0f0f13]/80 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl">
                Twitter / X
              </span>
            </a>
            <a href="https://www.linkedin.com/in/rajveer-lohar-b46511405" target="_blank" rel="noopener noreferrer" className="relative group text-text-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] cursor-pointer">
              <Linkedin size={20} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#0f0f13]/80 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 300, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 300, mass: 0.5 });
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 100, mass: 1 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 100, mass: 1 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive-element') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: useTransform(cursorX, v => v - 6),
          y: useTransform(cursorY, v => v - 6),
          scale: isClicking ? 0.5 : (isHovering ? 0 : 1),
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
        style={{
          x: useTransform(cursorXSpring, v => v - 20),
          y: useTransform(cursorYSpring, v => v - 20),
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
        }}
      >
        <motion.div 
          className="w-full h-full border rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{
            borderColor: isHovering ? 'white' : 'rgba(255,255,255,0.4)',
            borderStyle: isHovering ? 'dashed' : 'solid',
            borderWidth: isHovering ? '1.5px' : '1px'
          }}
        />
      </motion.div>
      
      {/* Ambient Trail Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-accent-purple/20 rounded-full pointer-events-none z-[9997] blur-[30px]"
        style={{
          x: useTransform(trailX, v => v - 64),
          y: useTransform(trailY, v => v - 64),
          scale: isHovering ? 1.5 : 1,
        }}
      />
    </>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnjlenvy", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg glass-card rounded-[24px] p-6 lg:p-8 relative pointer-events-auto border border-accent-purple/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-accent-indigo opacity-50"></div>
              
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">Let's Work Together</h3>
              <p className="text-text-secondary mb-8 text-sm">Tell me about your project and I'll get back to you shortly.</p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-text-secondary">Message sent successfully. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-white/70 ml-1">Name</label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 focus:bg-white/10 transition-all text-sm"
                      />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-white/70 ml-1">Email</label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 focus:bg-white/10 transition-all text-sm"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                      <label htmlFor="projectType" className="text-xs font-medium text-white/70 ml-1">Project Type</label>
                      <select
                        id="projectType"
                        name="projectType"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple/50 focus:bg-[#1a1a24] transition-all text-sm appearance-none"
                      >
                        <option value="SaaS Explainer" className="bg-[#0f0f13]">SaaS Explainer</option>
                        <option value="Performance Ad" className="bg-[#0f0f13]">Performance Ad</option>
                        <option value="UI Animation" className="bg-[#0f0f13]">UI Animation</option>
                        <option value="Promo Video" className="bg-[#0f0f13]">Promo Video</option>
                        <option value="Other" className="bg-[#0f0f13]">Other</option>
                      </select>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs font-medium text-white/70 ml-1">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        defaultValue=""
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple/50 focus:bg-[#1a1a24] transition-all text-sm appearance-none"
                      >
                        <option value="" disabled className="bg-[#0f0f13]">Select Budget</option>
                        <option value="$50 - $100" className="bg-[#0f0f13]">$50 - $100</option>
                        <option value="$100+" className="bg-[#0f0f13]">$100+</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                    <label htmlFor="timeline" className="text-xs font-medium text-white/70 ml-1">Timeline</label>
                    <input
                      required
                      type="text"
                      id="timeline"
                      name="timeline"
                      placeholder="e.g., 2 weeks, ASAP"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 focus:bg-white/10 transition-all text-sm"
                    />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-white/70 ml-1">Message</label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me more about what you're looking to build..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 focus:bg-white/10 transition-all text-sm resize-none"
                    />
                  </motion.div>

                  {status === "error" && (
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-red-400 text-sm text-center"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}

                  <motion.button
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full btn-gradient py-4 rounded-xl text-white font-medium text-sm disabled:opacity-70 flex justify-center items-center mt-2 group hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all duration-300"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis with settings for "super smooth" scrolling
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-accent-indigo z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="bg-grain"></div>
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      
      <main>
        <Hero onContactClick={() => setIsContactModalOpen(true)} />
        <Marquee items={["Google", "Apple", "Stripe", "Vercel", "Figma", "Framer"]} />
        <Skills />
        <Projects />
        <Experience />
        <FAQ />
      </main>

      <Footer onContactClick={() => setIsContactModalOpen(true)} />
    </>
  );
}
