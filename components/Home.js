"use client";
import Image from "next/image";
import gallery from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState, useRef, memo } from "react";
import projectData from "../app/data/projectsData.json";
import { motion } from "framer-motion";

const BannerContent = memo(({ isRight, type, windowWidth }) => {
  const content = type === "coder" 
    ? { text: constants.combine, description: "Front end developer who writes clean, elegant and efficient code." }
    : { text: constants.combine2, description: "Product designer specialising in UI design and Design systems." };
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: 1,
        y: windowWidth <= 990 ? 0 : [-20, 20],  // Always animate regardless of isRight
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


function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
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
    
    window.addEventListener("resize", handleResize);
    bannerRef.current?.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      bannerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cardHandler = (projectId) => {
    window.location.href = `/portfolio?id=${projectId}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="body_wrapper"
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
