"use client";
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import projectData from "../data/projectsData.json";
import gallery from "@/utils/gallery";
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const Portfolio = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleTitleHover = (e) => {
    const char = e.target;
    if (!char.classList.contains('char')) return;

    // Create flower petals
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      char.appendChild(petal);

      gsap.set(petal, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20px',
        height: '20px',
        background: `hsl(${Math.random() * 360}, 70%, 50%)`,
        borderRadius: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0
      });

      gsap.to(petal, {
        rotation: 360 * (i / 12),
        x: `${Math.cos(i * 30) * 50}px`,
        y: `${Math.sin(i * 30) * 50}px`,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }

    gsap.to(char, {
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      scale: 1.5,
      rotation: "random(-30, 30)",
      y: -20,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  };

  const handleTitleLeave = (e) => {
    const char = e.target;
    if (!char.classList.contains('char')) return;

    const petals = char.querySelectorAll('.petal');
    
    gsap.to(petals, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      onComplete: () => {
        petals.forEach(petal => petal.remove());
      }
    });

    gsap.to(char, {
      color: "#333",
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useGSAP(() => {
    const text = "Portfolio";
    const chars = text.split('');
    titleRef.current.innerHTML = chars
      .map((char, i) => `
        <span class="char-container">
          <span class="thread"></span>
          <span class="char" data-char="${char}">${char}</span>
        </span>
      `).join('');
  
    const titleChars = titleRef.current.querySelectorAll('.char');
    const threads = titleRef.current.querySelectorAll('.thread');
    const charContainers = titleRef.current.querySelectorAll('.char-container');
  
    // Store original positions
    const originalPositions = [];
    
    // Set initial positions and make letters draggable
    titleChars.forEach((char, i) => {
      const directions = [
        { x: -300, y: -200 },  // top-left
        { x: 0, y: -300 },     // top
        { x: 300, y: -200 },   // top-right
        { x: -400, y: 0 },     // left
        { x: 400, y: 0 },      // right
        { x: -300, y: 200 },   // bottom-left
        { x: 0, y: 300 },      // bottom
        { x: 300, y: 200 },    // bottom-right
      ];
      
      gsap.set(char, {
        opacity: 0,
        x: directions[i % directions.length].x,
        y: directions[i % directions.length].y,
        rotation: gsap.utils.random(-360, 360)
      });
  
      // Store original position
      originalPositions[i] = { x: 0, y: 0 };
  
      // Make letters draggable
      Draggable.create(char, {
        type: "x,y",
        bounds: ".portfolio__title",
        edgeResistance: 0.65,
        onDragStart: function() {
          gsap.to(char, {
            scale: 1.2,
            zIndex: 10,
            duration: 0.2
          });
        },
        onDrag: function() {
          const charBounds = char.getBoundingClientRect();
          const containerBounds = charContainers[i].getBoundingClientRect();
          
          // Calculate thread length based on drag position
          const threadLength = Math.sqrt(
            Math.pow(charBounds.left - containerBounds.left, 2) +
            Math.pow(charBounds.top - containerBounds.top, 2)
          );
          
          // Calculate correct angle using atan2
          const threadAngle = Math.atan2(
            charBounds.top - containerBounds.top,
            charBounds.left - containerBounds.left
          ) * (180 / Math.PI);
          
          gsap.to(threads[i], {
            height: threadLength,
            rotation: threadAngle,
            duration: 0.1
          });
        },
        onDragEnd: function() {
          gsap.to(char, {
            x: originalPositions[i].x,
            y: originalPositions[i].y,
            scale: 1,
            zIndex: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
              gsap.to(threads[i], {
                height: 100,
                rotation: 0,
                duration: 0.3
              });
            }
          });
        }
      });
    });

    // Hide threads initially
    gsap.set(threads, {
      opacity: 0,
      height: 0
    });
  
    // Create animation timeline with faster animations
    const tl = gsap.timeline();
  
    // First animate the characters to their positions
    tl.to(titleChars, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8, // Reduced from 1.5
      stagger: 0.05, // Reduced from 0.1
      ease: "power2.out" // Changed from power4.out
    })
    // Then drop the threads
    .to(threads, {
      opacity: 1,
      height: 100,
      duration: 0.4, // Reduced from 0.8
      stagger: 0.02, // Reduced from 0.05
      ease: "power1.inOut" // Changed from power2.inOut
    })
    // Add floating animation after everything is in place
    .add(() => {
      gsap.to(titleChars, {
        y: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(1, 2)", // Reduced from 2-4
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(threads, {
        scaleY: "random(0.8, 1.2)",
        duration: "random(0.5, 1)", // Reduced from 1-2
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 0.5, // Reduced from 1
          from: "random"
        }
      });
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), {
    stiffness: 100,
    damping: 30
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariant = {
    hidden: { 
      opacity: 0, 
      x: -100,
    },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <section className="portfolio" ref={containerRef}>
      <motion.div className="portfolio__parallax-bg" style={{ y }} />
      <div className="portfolio__container">
        <h2 
          ref={titleRef}
          className="portfolio__title"
          onMouseEnter={handleTitleHover}
          onMouseLeave={handleTitleLeave}
        >
          Featured Projects
        </h2>
        
        <motion.div 
          ref={projectsRef}
          className="portfolio__projects"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectData.map((project, index) => (
            <motion.div 
              key={project.id}
              className="portfolio__project"
              variants={projectVariant}
              onMouseEnter={handleProjectHover}
              onMouseLeave={handleProjectLeave}
              onClick={() => {
                setSelectedProject(project);
                handleModalOpen();
              }}
            >
              <div className="portfolio__project-image">
                <Image 
                  src={gallery.banners[project.src]} 
                  alt={project.title}
                  width={600}
                  height={400}
                  layout="responsive"
                />
                <div className="portfolio__project-preview">
                  <div className="portfolio__project-tech">
                    {project.technologies?.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <button className="portfolio__project-button">
                    View Details
                  </button>
                </div>
              </div>
              <div className="portfolio__project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
  
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="portfolio__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="portfolio__modal-content">
              <button 
                className="portfolio__modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <FaTimes />
              </button>
              
              <div className="portfolio__modal-image-container">
                <div className="portfolio__modal-image">
                  <Image 
                    src={gallery.banners[selectedProject.src]} 
                    alt={selectedProject.title}
                    width={400}  // reduced from 600
                    height={225}  // reduced from 338 to maintain aspect ratio
                    layout="responsive"
                  />
                </div>
              </div>
  
              <div className="portfolio__modal-details">
                <h2>{selectedProject.title}</h2>
                <div className="portfolio__modal-tech">
                  {selectedProject.technologies?.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                
                <p className="overview">{selectedProject.overview}</p>
  
                <div className="portfolio__modal-section">
                  <h3>Description</h3>
                  <p>{selectedProject.fullDescription}</p>
                </div>
  
                <div className="portfolio__modal-section">
                  <h3>Key Features</h3>
                  <ul>
                    {selectedProject.features?.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="portfolio__modal-section">
                  <h3>Technical Challenges</h3>
                  <ul>
                    {selectedProject.challenges?.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="portfolio__modal-links">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> View Code
                  </a>
                  <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
// Remove the semicolon here

export default Portfolio;


// Add these title hover handlers
const handleTitleHover = () => {
const chars = titleRef.current.querySelectorAll('.char');
gsap.to(chars, {
scale: "random(1.2, 2)",
rotation: "random(-20, 20)",
y: "random(-20, 20)",
color: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
duration: 0.5,
stagger: {
amount: 0.3,
from: "random"
},
ease: "power2.out"
});
};

const handleTitleLeave = () => {
const chars = titleRef.current.querySelectorAll('.char');
gsap.to(chars, {
scale: 1,
rotation: 0,
y: 0,
color: "#333",
duration: 0.5,
stagger: {
amount: 0.3,
from: "random"
},
ease: "power2.out"
});
};

// Add these handlers inside the component
const handleProjectHover = (e) => {
const project = e.currentTarget;
const image = project.querySelector('img');
const techSpans = project.querySelectorAll('.portfolio__project-tech span');
const button = project.querySelector('.portfolio__project-button');
const content = project.querySelector('.portfolio__project-content');

gsap.to(project, {
scale: 1.05,
rotationY: 15,
boxShadow: "0 30px 50px rgba(0,0,0,0.2)",
duration: 0.5,
ease: "power3.out"
});

gsap.to(image, {
scale: 1.2,
duration: 0.5,
ease: "power2.out"
});

gsap.to(content, {
y: -10,
duration: 0.4,
ease: "power2.out"
});

gsap.to(techSpans, {
scale: 1.1,
y: -5,
backgroundColor: "#007bff",
color: "#fff",
stagger: 0.05,
duration: 0.3,
ease: "back.out(2)"
});

gsap.to(button, {
scale: 1.2,
y: -8,
backgroundColor: "#0056b3",
duration: 0.3,
ease: "back.out(2)"
});
};

const handleProjectLeave = (e) => {
const project = e.currentTarget;
const image = project.querySelector('img');
const techSpans = project.querySelectorAll('.portfolio__project-tech span');
const button = project.querySelector('.portfolio__project-button');
const content = project.querySelector('.portfolio__project-content');

gsap.to([project, image, techSpans, button, content], {
scale: 1,
rotationY: 0,
y: 0,
backgroundColor: "",
color: "",
boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
duration: 0.5,
ease: "power3.inOut"
});
};
