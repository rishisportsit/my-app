"use client";
import Image from "next/image";
import gallery from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState, useRef, memo } from "react";
import projectData from "../app/data/projectsData.json";
import { motion, AnimatePresence } from "framer-motion";
import Slideshow from "@/components/Slideshow";
import { FaGamepad, FaTimes, FaExpand, FaCompress } from "react-icons/fa";

const BannerContent = memo(({ isRight, type, windowWidth }) => {
  const content = type === "coder" 
    ? { text: constants.combine, description: "Front end developer who writes clean, elegant and efficient code." }
    : { text: constants.combine2, description: "Product designer specialising in UI design and Design systems." };
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: 1,
        y: windowWidth <= 990 ? 0 : [-20, 20],  
        transition: {
          opacity: { duration: 0.5 },
          y: windowWidth > 990 ? {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          } : { duration: 0.5 }
        },
      }}
      className={`${type}_wrapper visible`}
    >
      <motion.span
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className={`${type}_span`}
      >
        {content.text}
      </motion.span>
      <motion.span
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="span_tag"
      >
        {content.description}
      </motion.span>
    </motion.div>
  );
});

const LatestWorkHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className="latest_work"
  >
    <div className="border_"></div>
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="latest_span"
    >
      {constants.latestWork}
    </motion.span>
    <div className="border_"></div>
  </motion.div>
));

// const ProjectCard = memo(({ project, onCardClick }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30, scale: 0.95 }}
//     whileInView={{ opacity: 1, y: 0, scale: 1 }}
//     viewport={{ once: true, margin: "-50px" }}
//     whileHover={{ scale: 1.03 }}
//     transition={{ duration: 0.6 }}
//     className="card"
//     onClick={() => onCardClick(project.id)}
//   >
//     <Image
//     src={gallery.thumbnails[project.src]}
//       alt={project.title}
//       className="card-image"
//       width={500}
//       height={300}
//       layout="responsive"
//     />
//     <motion.div
//       initial={{ y: 20, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="card-content"
//     >
//       <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card-title">
//         {project.title}
//       </motion.h2>
//       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card-subtitle">
//         {project.description}
//       </motion.p>
//     </motion.div>
//   </motion.div>
// ));


function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const bannerRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [gameUrl, setGameUrl] = useState(null);
  const [iframeFullscreen, setIframeFullscreen] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 1650) setOffsetX(0);
    };
    
    const handleMouseMove = (event) => {
      const banner = bannerRef.current;
      if (banner) {
        const { left, width } = banner.getBoundingClientRect();
        const x = event.clientX - left;
        
        if (window.innerWidth > 1650) {
          setOffsetX((x / width - 0.5) * -100);
        }
        
        if (event.target.closest('.bannermain_wrapper')) {
          setIsRight(x > width / 2);
        }
      }
    };

    setWindowWidth(window.innerWidth);
    
    window.addEventListener("resize", handleResize);
    bannerRef.current?.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      bannerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const launchGame = async (project) => {
    setSelectedProject(null); // Close the details modal to show the game modal underneath
    setGameUrl({ url: null, title: project.title });
    setGameLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_GAME_API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: project.gameId,
            userId: "",
            token: process.env.NEXT_PUBLIC_GAME_TOKEN,
            currency: "XXX",
            playerToken: "",
            demoGame: "true",
          }),
        },
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

  const cardHandler = (projectId) => {
    const project = projectData.find((p) => p.id === projectId);
    if (project) {
        setSelectedProject(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="body_wrapper"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="bannermain_wrapper" ref={bannerRef}>
        <div className="banner_wrapper">
          <BannerContent isRight={isRight} type="design" windowWidth={windowWidth} />
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="banner_image_container"
          >
            <Image
              src={gallery.banners.homeeBanner}
              className="home_banner"
              style={{
                transform: windowWidth > 1650 ? `translateX(${offsetX}px)` : "none",
                transition: "transform 0.3s ease-out",
              }}
              width={1120}
              height={580}
              layout="responsive"
              priority
            />
          </motion.div>
          <BannerContent isRight={isRight} type="coder" windowWidth={windowWidth} />
        </div>
      </div>
      <div className="work_section">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="work_wrapper"
        >
          <LatestWorkHeader />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2.5rem", marginBottom: "4rem", maxWidth: "1600px", margin: "0 auto 4rem", padding: "0 2rem" }}>
            {projectData.filter(p => p.category === 'betting').map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="portfolio__project" 
                style={{ 
                  flex: project.layout === "mobile" ? "1 1 350px" : "1.8 1 600px",
                  minHeight: "600px",
                  display: "flex",
                  flexDirection: "column",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
                onClick={() => cardHandler(project.id)}
              >
                <div style={{ height: "400px", position: "relative", overflow: "hidden", background: "#000" }}>
                  <Slideshow images={project.gallery} title={project.title} fitType="contain" />
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
                          <button className="portfolio__project-button" onClick={(e) => { e.stopPropagation(); cardHandler(project.id); }}>
                            View Details
                          </button>
                           <a
                            href={project.live}
                            className="portfolio__project-launch"
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <FaGamepad /> View Site
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="portfolio__project-content" style={{ padding: "1.5rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", marginBottom: "0.8rem", color: "#fff", fontFamily: "sans-serif" }}>{project.title}</h3>
                    <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)", lineHeight: "1.6", color: "#bbb", marginBottom: "1rem", fontFamily: "sans-serif" }}>{project.description}</p>
                    {project.layout === "mobile" && (
                        <div style={{ 
                          marginTop: "auto", 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "8px", 
                          color: "#e2e8f0", 
                          fontSize: "0.85rem",
                          background: "rgba(255, 255, 255, 0.1)",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          width: "fit-content",
                          fontWeight: "500"
                        }}>
                          <span>📱 Mobile Optimized</span>
                        </div>
                    )}
                    {project.layout === "desktop" && (
                        <div style={{ 
                          marginTop: "auto", 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "8px", 
                          color: "#e2e8f0", 
                          fontSize: "0.85rem",
                          background: "rgba(255, 255, 255, 0.1)",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          width: "fit-content",
                          fontWeight: "500"
                        }}>
                          <span>🖥️ Desktop Platform</span>
                        </div>
                    )}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2rem", 
            maxWidth: "1000px", 
            margin: "0 auto", 
            padding: "0 2rem" 
          }}>
            {projectData.filter(p => !p.category || p.category !== 'betting').slice(0, 3).map((project) => (
               <motion.div
                key={project.id}
                whileHover={{ y: -6, boxShadow: "0 20px 48px -6px rgba(0, 0, 0, 0.12)" }}
                className="portfolio__project" 
                style={{
                    background: "#0a0a0a",
                    border: "1px solid #333",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column"
                }}
                onClick={() => cardHandler(project.id)}
              >
                <div className="portfolio__project-image" style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                  <Image
                     src={gallery.thumbnails[project.src]}
                     alt={project.title}
                     fill
                     style={{ objectFit: "cover" }}
                   />
                  <div className="portfolio__project-overlay">
                    <div className="portfolio__project-overlay-scanlines" />
                    <div className="portfolio__project-overlay-glow" />
                    <div className="portfolio__project-overlay-content">
                       <div className="portfolio__project-tech">
                          {project.technologies?.slice(0, 3).map((tech, i) => (
                            <span key={i}>{tech}</span>
                          ))}
                        </div>
                        <div className="portfolio__project-actions">
                          <button className="portfolio__project-button" onClick={(e) => { e.stopPropagation(); cardHandler(project.id); }}>
                            View Details
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="portfolio__project-content" style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#fff", fontFamily: "sans-serif" }}>{project.title}</h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: "1.5", color: "#bbb", fontFamily: "sans-serif", flex: 1 }}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Portfolio Modals - wrapped in .portfolio-modals for styles */}
      <div className="portfolio-modals" style={{ minHeight: 0, background: 'transparent' }}>
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="portfolio__modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 9999 }} 
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
                <div 
                  className="portfolio__modal-left"
                  style={selectedProject.category === "betting" ? { width: "65%", flexShrink: 0 } : {}}
                >
                  <div className="portfolio__modal-img-wrap" style={{ background: "#000" }}>
                    {selectedProject.gallery ? (
                       <Slideshow 
                          images={selectedProject.gallery} 
                          title={selectedProject.title} 
                          fitType="contain"
                       />
                    ) : (
                      <Image
                        src={gallery.thumbnails[selectedProject.src]}
                        alt={selectedProject.title}
                        width={500}
                        height={500}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div className="portfolio__modal-img-overlay" />
                  </div>
                  <div className="portfolio__modal-left-meta">
                    <p className="portfolio__modal-overview">
                      {selectedProject.overview}
                    </p>
                    {selectedProject.category === "betting" ? (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio__modal-launch"
                        style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                      >
                        <FaGamepad /> View Site
                      </a>
                    ) : (
                      <button
                        className="portfolio__modal-launch"
                        onClick={() => launchGame(selectedProject)}
                      >
                        <FaGamepad /> Play Demo
                      </button>
                    )}
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
                    <span className="portfolio__modal-label">{selectedProject.category === "betting" ? "Platform" : "Game"}</span>
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
              className={`portfolio__game-modal${iframeFullscreen ? " portfolio__game-modal--fs" : ""}`}
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
                      onClick={() => setIframeFullscreen((f) => !f)}
                      title={iframeFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {iframeFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                    <button
                      className="portfolio__game-modal-btn portfolio__game-modal-btn--close"
                      onClick={() => {
                        setGameUrl(null);
                        setIframeFullscreen(false);
                      }}
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
                      <span>
                        {gameUrl?.error
                          ? "Failed to load — please try again"
                          : "Live demo coming soon"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default memo(Home);
