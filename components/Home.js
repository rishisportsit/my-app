"use client";
import Image from "next/image";
import gallary from "@/utils/gallery";
import constants from "../constants/constants.json";
import { useEffect, useState } from "react";
import gallery from "@/utils/gallery";
import projectData from "../app/data/projectsData.json"
function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [isRight, setIsRight] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const banner = document.querySelector(".home_banner");
      const bannerRect = banner.getBoundingClientRect();
      const x = event.clientX - bannerRect.left;
      const offsetX = (x / bannerRect.width - 0.4) * 200;
      setOffsetX(-offsetX);

      if (x > bannerRect.width / 2) {
        setIsRight(true);
      } else {
        setIsRight(false);
      }
    };

    const banner = document.querySelector(".home_banner");
    banner.addEventListener("mousemove", handleMouseMove);

    return () => banner.removeEventListener("mousemove", handleMouseMove);
  }, []);

  async function clickHandler() {
    const type = prompt("enter API Request TYPE:");
    console.log(type);
    const res = await fetch("/api/home", {
      type: type,
      headers: {
        Accept: "application/json",
      },
    });
    console.log(res?.message);
  }

  return (
    <div className="body_wrapper">
      <div className="bannermain_wrapper">
        <div className="banner_wrapper">
          <div className={`design_wrapper ${isRight ? "hidden" : "visible"}`}>
            <span className="design_span">{constants.combine2}</span>
            <span className="span_tag">
              Product designer specialising in UI design an Design systems.
            </span>
          </div>
          <Image
            src={gallary.banners.homeBanner}
            className="home_banner"
            style={{
              transform: `translateX(${offsetX}px)`,
              transition: "transform 0.3s",
            }}
          />
          <div className={`coder_wrapper ${isRight ? "visible" : "hidden"}`}>
            <span className="coder_span">{constants.combine}</span>
            <span className="span_tag">
              Front end developer who writes clean, elegant and efficient code.
            </span>
          </div>
        </div>
      </div>
      <div className="work_wrapper">
        <div className="latest_work">
          <div className="border_"></div>
          <span className="latest_span">SOME OF MY LATEST WORK</span>
          <div className="border_"></div>
        </div>
        <div className="box_wraper">
          { projectData.map((project) =>( 
            <div className="card">
            <Image
              src={gallary.banners.vleagueBannner}
              alt="UI Design Book"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">{project.title}</h2>
              <p className="card-subtitle">{project.description}</p>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  );
}

export default Home;
