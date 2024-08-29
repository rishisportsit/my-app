"use client";
import Image from "next/image";
import gallery from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState } from "react";
import projectData from "../app/data/projectsData.json";
import constantsData from "../constants/constants.json";

function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);
  const [showWrappers, setShowWrappers] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (Window.innerWidth <= 1650) {
        return;
      }
      const banner = document.querySelector(".home_banner");
      const { left, width } = banner.getBoundingClientRect();
      const x = event.clientX - left;
      const newOffsetX = (x / width - 0.4) * -200;
      requestAnimationFrame(() => {
        setOffsetX(newOffsetX);
        setIsRight(x > width / 2);
        setShowWrappers(true);
      });
    };
    const banner = document.querySelector(".home_banner");
    banner.addEventListener("mousemove", handleMouseMove);
    return () => banner.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cardHandler = (projectId) => router.push(`/project/${projectId}`);

  const BannerContent = ({ isRight, type }) => (
    <div
      className={`${type}_wrapper ${
        showWrappers
          ? isRight
            ? type === "coder"
              ? "visible"
              : "hidden"
            : type === "design"
            ? "visible"
            : "hidden"
          : "hidden"
      }`}
    >
      <span className={`${type}_span`}>
        {constants[type === "design" ? "combine2" : "combine"]}
      </span>
      <span className="span_tag">
        {type === "design"
          ? "Product designer specialising in UI design and Design systems."
          : "Front end developer who writes clean, elegant and efficient code."}
      </span>
    </div>
  );

  const LatestWorkHeader = () => (
    <div className="latest_work">
      <div className="border_"></div>
      <span className="latest_span">{constantsData?.latestWork}</span>
      <div className="border_"></div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="card" onClick={() => onClick(project.id)}>
      <Image
        src={gallery.banners[project.src]}
        alt={project.title}
        className="card-image"
        width={500}
        height={300}
        layout="responsive"
      />
      <div className="card-content">
        <h2 className="card-title">{project.title}</h2>
        <p className="card-subtitle">{project.description}</p>
      </div>
    </div>
  );

  return (
    <div className="body_wrapper">
      <div className="bannermain_wrapper">
        <div className="banner_wrapper">
          <BannerContent isRight={isRight} type="design" />
          <Image
            src={gallery.banners.homeBanner}
            className="home_banner"
            style={{
              transform:
                window.innerWidth > 1650 ? `translateX(${offsetX}px)` : "none",
              transition: "transform 0.3s ease-out",
            }}
            width={1920}
            height={1080}
            layout="responsive"
          />
            <BannerContent isRight={isRight} type="coder" />
        </div>
      </div>
      <div className="work_wrapper">
        <LatestWorkHeader />
        <div className="box_wraper">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
