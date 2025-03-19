"use client";
import Image from "next/image";
import gallery from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState, useRef, memo } from "react";
import projectData from "../app/data/projectsData.json";
import { motion, AnimatePresence } from "framer-motion";

const BannerContent = memo(({ isRight, type, windowWidth }) => {
  const isVisible = type === "coder" ? !isRight : isRight;
  const content = type === "coder" 
    ? { text: constants.combine, description: "Front end developer who writes clean, elegant and efficient code." }
    : { text: constants.combine2, description: "Product designer specialising in UI design and Design systems." };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: windowWidth <= 990 ? 1 : (isVisible ? 1 : 0),
        y: windowWidth <= 990 ? 0 : (isVisible ? [-20, 20] : -20),
        transition: {
          opacity: { duration: 0.5 },
          y: isVisible && windowWidth > 990 ? {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          } : { duration: 0.5 }
        },
      }}
      className={`${type}_wrapper ${windowWidth <= 990 ? 'visible' : (isVisible ? 'visible' : 'hidden')}`}
    >
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: windowWidth <= 990 ? 1 : (isVisible ? 1 : 0.8), opacity: windowWidth <= 990 ? 1 : (isVisible ? 1 : 0) }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className={`${type}_span`}
      >
        {content.text}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: windowWidth <= 990 ? 1 : (isVisible ? 1 : 0), x: windowWidth <= 990 ? 0 : (isVisible ? 0 : -20) }}
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

const ProjectCard = memo(({ project, onCardClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.6 }}
    className="card"
    onClick={() => onCardClick(project.id)}
  >
    <Image
      src={gallery.banners[project.src]}
      alt={project.title}
      className="card-image"
      width={500}
      height={300}
      layout="responsive"
    />
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card-content"
    >
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card-title">
        {project.title}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card-subtitle">
        {project.description}
      </motion.p>
    </motion.div>
  </motion.div>
));

const HoverPopup = memo(({ showPopup }) => (
  <AnimatePresence>
    {showPopup && (
      <motion.div
        className="banner-popup"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <div className="popup-content">
          <div className="popup-icon">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="rotating-element"
            />
          </div>
          <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="popup-title">
            Hover banner to reveal effect!
          </motion.h3>
          {/* <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="popup-text">
            Hover across the banner to reveal the interactive parallax effect!
          </motion.p> */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5 }} className="popup-timer" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));
function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const bannerRef = useRef(null);
  
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
    
    if (!initialLoadComplete) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setInitialLoadComplete(true);
        }, 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }

    window.addEventListener("resize", handleResize);
    bannerRef.current?.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      bannerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initialLoadComplete]);

  const cardHandler = (projectId) => {
    console.log(`Navigating to project ${projectId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="body_wrapper"
    >
      <div className="bannermain_wrapper" ref={bannerRef}>
        <HoverPopup showPopup={showPopup} />
        <div className="banner_wrapper">
          <BannerContent isRight={isRight} type="design" windowWidth={windowWidth} />
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="banner_image_container"
          >
            <Image
              src={gallery.banners.homeBanner}
              className="home_banner"
              style={{
                transform: windowWidth > 1650 ? `translateX(${offsetX}px)` : "none",
                transition: "transform 0.3s ease-out",
              }}
              width={1920}
              height={1080}
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
          <div className="box_wraper">
            {projectData.map((project) => (
              <ProjectCard key={project.id} project={project} onCardClick={cardHandler} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default memo(Home);
