"use client";
import Image from "next/image";
import gallery from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState } from "react";
import projectData from "../app/data/projectsData.json";
import constantsData from "../constants/constants.json";
import { motion } from "framer-motion";

function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);
  const [showWrappers, setShowWrappers] = useState(true);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     if (Window.innerWidth <= 1650) {
  //       return;
  //     }
  //     const banner = document.querySelector(".home_banner");
  //     const { left, width } = banner.getBoundingClientRect();
  //     const x = event.clientX - left;
  //     const newOffsetX = (x / width - 0.4) * -200;
  //     requestAnimationFrame(() => {
  //       setOffsetX(newOffsetX);
  //       setIsRight(x > width / 2);
  //     });
  //   };
  //   const banner = document.querySelector(".home_banner");
  //   banner.addEventListener("mousemove", handleMouseMove);
  //   return () => banner.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  const cardHandler = (projectId) => router.push(`/project/${projectId}`);

  const BannerContent = ({ isRight, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: [-20, 20],
        transition: {
          opacity: { duration: 0.5 },
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${type}_wrapper`}
    >
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className={`${type}_span`}
      >
        {constants[type === "design" ? "combine2" : "combine"]}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="span_tag"
      >
        {type === "design"
          ? "Product designer specialising in UI design and Design systems."
          : "Front end developer who writes clean, elegant and efficient code."}
      </motion.span>
    </motion.div>
  );

  const LatestWorkHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
        {constantsData?.latestWork}
      </motion.span>
      <div className="border_"></div>
    </motion.div>
  );

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card"
      onClick={() => onClick(project.id)}
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
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="card-content"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card-title"
        >
          {project.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-subtitle"
        >
          {project.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="body_wrapper"
    >
      <div className="bannermain_wrapper">
        <div className="banner_wrapper">
          <BannerContent isRight={isRight} type="design" />

          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={gallery.banners.homeBanner}
              className="home_banner"
              style={{
                transform:
                  window.innerWidth > 1650
                    ? `translateX(${offsetX}px)`
                    : "none",
                transition: "transform 0.3s ease-out",
              }}
              width={1920}
              height={1080}
              layout="responsive"
            />
          </motion.div>
          <BannerContent isRight={isRight} type="coder" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="work_wrapper"
      >
        <LatestWorkHeader />
        <div className="box_wraper">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
