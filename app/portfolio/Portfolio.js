"use client";
import Image from "next/image";
import { FaTimes, FaGamepad, FaExpand, FaCompress } from "react-icons/fa";
import projectData from "../data/projectsData.json";
import gallery from "@/utils/gallery";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ThemeToggle from "@/components/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);
  const [iframeFullscreen, setIframeFullscreen] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);

  const launchGame = async (project) => {
    setGameUrl({ url: null, title: project.title });
    setGameLoading(true);
    try {
      const response = await fetch(
        "https://root-stg-games-beapi.negroup-tech.net/negames/api/v2/launchUrl",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: project.gameId,
            userId: "",
            token: "92e060ec-2a34-4117-b8c1-2e02a8624bdb",
            currency: "XXX",
            playerToken: "",
            demoGame: "true",
          }),
        }
      );
      const data = await response.json();
      if (data?.play_url) {
        setGameUrl({ url: data.play_url, title: project.title });
      } else {
        setGameUrl({ url: null, title: project.title, error: true });
      }
    } catch (err) {
      console.error("Game launch failed:", err);
      setGameUrl({ url: null, title: project.title, error: true });
    } finally {
      setGameLoading(false);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useGSAP(() => {
    // Split title into individually-clipped letter spans
    const text = "Portfolio";
    titleRef.current.innerHTML = text
      .split("")
      .map(char => `<span class="char-wrap"><span class="char">${char}</span></span>`)
      .join("");

    const chars = titleRef.current.querySelectorAll(".char");

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    // ── Curtain panels split open ──────────────────────────────────────
    tl.to(curtainTopRef.current, { y: "-100%", duration: 1.15 }, 0)
      .to(curtainBottomRef.current, { y: "100%", duration: 1.15 }, 0)

      // ── Eyebrow label ─────────────────────────────────────────────────
      .from(".portfolio__hero-eyebrow", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
      }, 0.52)

      // ── Title letters clip-reveal from bottom ──────────────────────────
      .from(chars, {
        yPercent: 115,
        opacity: 0,
        duration: 0.8,
        stagger: 0.055,
        ease: "power4.out",
      }, 0.62)

      // ── Decorative rule draws across ──────────────────────────────────
      .from(".portfolio__hero-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
      }, 0.88)

      // ── Tagline fades up ──────────────────────────────────────────────
      .from(".portfolio__hero-tagline", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
      }, 1.0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), {
    stiffness: 100,
    damping: 30,
  });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const projectVariant = {
    hidden: { opacity: 0, y: 44, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="portfolio" ref={containerRef}>
      {/* ── Cinematic curtain panels ── */}
      <div className="portfolio__curtain portfolio__curtain--top" ref={curtainTopRef} />
      <div className="portfolio__curtain portfolio__curtain--bottom" ref={curtainBottomRef} />

      {/* ── Floating theme toggle ── */}
      <div className="portfolio__theme-toggle">
        <ThemeToggle />
      </div>

      <motion.div className="portfolio__parallax-bg" style={{ y }} />
      <div className="portfolio__container">
        <div className="portfolio__hero">
          <span className="portfolio__hero-eyebrow">Selected Work &nbsp;·&nbsp; 2024–2025</span>
          <h2 ref={titleRef} className="portfolio__title">Portfolio</h2>
          <div className="portfolio__hero-line" />
          <p className="portfolio__hero-tagline">
            11 production games &mdash; real-time Canvas engines, GraphQL APIs, wrapper-layer architecture
          </p>
        </div>

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
                  src={gallery.thumbnails[project.src]}
                  alt={project.title}
                  width={600}
                  height={400}
                  layout="responsive"
                />
                <div className="portfolio__project-overlay">
                  <div className="portfolio__project-overlay-scanlines" />
                  <div className="portfolio__project-overlay-glow" />
                  <div className="portfolio__project-overlay-content">
                    <div className="portfolio__project-tech">
                      {project.technologies?.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio__project-actions">
                      <button className="portfolio__project-button">
                        View Details
                      </button>
                      <a
                        href="#"
                        className="portfolio__project-launch"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          launchGame(project);
                        }}
                      >
                        <FaGamepad /> Launch Game
                      </a>
                    </div>
                  </div>
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
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="portfolio__modal-content"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left — visual panel */}
              <div className="portfolio__modal-left">
                <div className="portfolio__modal-img-wrap">
                  <Image
                    src={gallery.thumbnails[selectedProject.src]}
                    alt={selectedProject.title}
                    width={500}
                    height={500}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="portfolio__modal-img-overlay" />
                </div>
                <div className="portfolio__modal-left-meta">
                  <p className="portfolio__modal-overview">{selectedProject.overview}</p>
                  <button
                    className="portfolio__modal-launch"
                    onClick={() => launchGame(selectedProject)}
                  >
                    <FaGamepad /> Play Demo
                  </button>
                </div>
              </div>

              {/* Right — details panel */}
              <div className="portfolio__modal-right">
                <button
                  className="portfolio__modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  <FaTimes />
                </button>

                <div className="portfolio__modal-header">
                  <span className="portfolio__modal-label">Game</span>
                  <h2>{selectedProject.title}</h2>
                </div>

                <div className="portfolio__modal-tech">
                  {selectedProject.technologies?.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>

                <div className="portfolio__modal-scrollable">
                  <div className="portfolio__modal-section">
                    <h4>About</h4>
                    <p>{selectedProject.fullDescription}</p>
                  </div>

                  <div className="portfolio__modal-section">
                    <h4>Key Features</h4>
                    <ul>
                      {selectedProject.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="portfolio__modal-section">
                    <h4>Challenges</h4>
                    <ul>
                      {selectedProject.challenges?.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Iframe Game Demo Modal ── */}
      <AnimatePresence>
        {gameUrl && (
          <motion.div
            className={`portfolio__game-modal${iframeFullscreen ? ' portfolio__game-modal--fs' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="portfolio__game-modal-inner"
              initial={{ scale: 0.94, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="portfolio__game-modal-bar">
                <span className="portfolio__game-modal-title">
                  <FaGamepad /> {gameUrl.title} — Demo
                </span>
                <div className="portfolio__game-modal-controls">
                  <button
                    className="portfolio__game-modal-btn"
                    onClick={() => setIframeFullscreen(f => !f)}
                    title={iframeFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {iframeFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                  <button
                    className="portfolio__game-modal-btn portfolio__game-modal-btn--close"
                    onClick={() => { setGameUrl(null); setIframeFullscreen(false); }}
                    title="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <div className="portfolio__game-modal-frame">
                {gameLoading && (
                  <div className="portfolio__game-modal-placeholder">
                    <div className="portfolio__game-modal-spinner" />
                    <span>Loading {gameUrl?.title}...</span>
                  </div>
                )}
                {!gameLoading && gameUrl?.url && (
                  <iframe
                    src={gameUrl.url}
                    title={gameUrl.title}
                    allow="fullscreen; autoplay"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
                  />
                )}
                {!gameLoading && !gameUrl?.url && (
                  <div className="portfolio__game-modal-placeholder">
                    <FaGamepad />
                    <p>{gameUrl?.title}</p>
                    <span>{gameUrl?.error ? 'Failed to load — please try again' : 'Live demo coming soon'}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

const handleProjectHover = (e) => {
  const project = e.currentTarget;

  gsap.to(project, {
    boxShadow: "0 24px 48px rgba(0,0,0,0.22)",
    duration: 0.35,
    ease: "power3.out",
  });
};

const handleProjectLeave = (e) => {
  const project = e.currentTarget;

  gsap.to(project, {
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    duration: 0.4,
    ease: "power3.inOut",
  });
};
