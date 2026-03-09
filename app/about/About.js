"use client";
import React, { useState } from "react";
import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";
import { motion } from "framer-motion";

const About = () => {
  const { about, info, aboutdescrip, part2Head, part1Head, randomyoda } =
    constants;
  const {
    banners: { renderAdam, yoda , meBanner },
  } = gallery;

  const skills = [
    { name: "Beer drinking", value: 95 },
    { name: "FrontEnd Development", value: 90 },
    { name: "BackEnd Development", value: 60 },
    { name: "DataBase", value: 70 },
    { name: "Interactive UI's", value: 85 },
  ];

  const part1 = [
    { name: "UI design" },
    { name: "UX design" },
    { name: "Swearing at my computer" },
    { name: "Eating Pizza" },
  ];

  const part2 = [
    { name: "Front-end development" },
    { name: "HTML / CSS" },
    { name: "JavaScript" },
    { name: "React.js" },
    { name: "Next.js" },
    { name: "React Native (kinda)" },
    { name: "Redux.js" },
    { name: "Zustand" },
    { name: "Sass" },
    { name: "TailWind" },
    { name: "Bootstrap" },
    { name: "Material-UI" },
    { name: "Back-end development" },
    { name: "Node.js" },
    { name: "DataBase" },
    { name: "REST APIs" },
    { name: "Git" },
    { name: "Swagger API" },
  ];

  const points = [
    { point: "I drink a lot of coffee" },
    { point: "I'm into Frontend development" },
    { point: "I love to eat" },
    { point: "I'm a bit of a dirt freak" },
    { point: "I live in Paris, France" },
    { point: "I'm slightly addicted to Instagram" },
    { point: "stack is my mentor" },
  ];

  const levels = ["Jedi", "Ninja", "Geek", "Newbie"];

  const experienceGroups = [
    {
      company: "NE Group",
      logo: "/logo-dark.svg",
      totalDuration: "2 yrs 7 mos",
      roles: [
        {
          title: "Freelancer",
          type: "Part-time",
          startDate: "Feb 2026",
          endDate: "Present",
          duration: "2 mos", 
          location: "Paris, Île-de-France, France · On-site",
          skills: [
            "Python", "MLflow", "DAGs", "Airflow", "Docker", "Jupyter Notebooks", "Streamlit",
            "AIML", "Data Science", "Data Analysis", "Machine Learning", 
            "MongoDB", "MySQL", "Next.js", "Git", "Artificial Intelligence (AI)", 
            "Analytical Skills", "Python (Programming Language)", "REST APIs", 
            "React.js", "Redux.js", "Node.js", "Project Management", 
            "Swagger API", "Zustand", "Tailwind CSS"
          ],
        },
        {
          title: "Frontend Developer",
          type: "Full-time",
          startDate: "Jan 2024",
          endDate: "Feb 2026",
          duration: "2 yrs 2 mos",
          location: "Hyderabad, Telangana, India · Remote",
          skills: [
            "Front-end development", "HTML / CSS", "JavaScript",
            "React.js", "Next.js", "React Native (kinda)",
            "Redux.js", "Zustand", "Sass", "TailWind",
            "Bootstrap", "Material-UI", "Back-end development",
            "Node.js", "DataBase", "REST APIs", "Git", "Swagger API"
          ],
        },
        {
          title: "Frontend Developer intern",
          type: "Apprenticeship",
          startDate: "Sep 2023",
          endDate: "Jan 2024",
          duration: "5 mos",
          location: "Hyderabad, Telangana, India · Remote",
          skills: ["HTML5", "JavaScript"],
        }
      ]
    }
  ];

  const educations = [
    {
      school: "EPITA: Ecole d'Ingénieurs en Informatique",
      degree: "Master of Science - MS, Data Science",
      startDate: "Sep 2025",
      endDate: "Present",
      location: "Paris, France",
      logo: "/1631350838145.jpeg"
    },
    {
      school: "Marri Laxman Reddy Institute of Technology and Management",
      degree: "Bachelor of Technology, Data Science",
      startDate: "2020",
      endDate: "2024",
      location: "Hyderabad, Telangana, India"
    }
  ];

  const certifications = [
    {
      name: "SQL Hacker rank",
      issuer: "HackerRank",
      issued: "Aug 2023",
      url: "https://www.hackerrank.com/certificates/iframe/28872c5c8fb8",
      credentialId: "28872c5c8fb8"
    }
  ];

  // State to track expanded skills for each experience item (using a composite key `groupIndex-roleIndex`)
  const [expandedSkills, setExpandedSkills] = useState({});

  const toggleSkills = (groupIndex, roleIndex) => {
    const key = `${groupIndex}-${roleIndex}`;
    
    setExpandedSkills((prev) => {
      const isExpanded = !!prev[key];
      
      if (!isExpanded) {
        // If we are expanding, set a timeout to collapse after 10 seconds
        setTimeout(() => {
          setExpandedSkills((current) => ({
            ...current,
            [key]: false
          }));
        }, 10000); // 10 seconds
      }
      
      return {
        ...prev,
        [key]: !isExpanded,
      };
    });
  };

  const fadeInUpAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const slideInAnimation = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  };

  return (
    <motion.div className="about-wrapper" {...fadeInUpAnimation}>
      <motion.div className="story1" {...slideInAnimation}>
        <div className="about_collapse">
          <div className="about">
            {["a1", "a2", "a3"].map((cls, index) => (
              <motion.div
                key={cls}
                className={cls}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.3,
                  ease: "easeOut",
                }}
              >
                {[about, info, aboutdescrip][index]}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mephoto"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              stiffness: 150,
            }}
          >
            <Image src={meBanner}  className="img" alt="Adam" />
            {/* <Image src={renderAdam} className="img" alt="Adam" /> */}
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="storyExperience" {...fadeInUpAnimation}>
        <div className="experience-container">
          <h2 className="section-title">Experience</h2>
          
          {experienceGroups.map((group, gIndex) => (
            <div className="company-group" key={gIndex}>
              <div className="company-header">
                <div className="logo-container">
                   <Image src={group.logo} alt={group.company} width={48} height={48} style={{objectFit: "contain"}} />
                </div>
                <div className="company-info">
                  <h3 className="company-name">{group.company}</h3>
                  <span className="total-duration">{group.totalDuration}</span>
                </div>
              </div>

              <div className="roles-timeline">
                {group.roles.map((role, rIndex) => {
                  const expandKey = `${gIndex}-${rIndex}`;
                  const isExpanded = expandedSkills[expandKey];
                  const visibleSkills = isExpanded ? role.skills : role.skills.slice(0, 8);
                  const hiddenCount = role.skills.length - visibleSkills.length;

                  return (
                    <div className="role-item" key={rIndex}>
                      <div className="timeline-marker"></div>
                      <div className="role-content">
                        <h3 className="role-title">{role.title}</h3>
                        <div className="role-meta">
                          <span className="role-type">{role.type}</span>
                          <span className="role-date">{role.startDate} - {role.endDate} · {role.duration}</span>
                          <span className="role-location">{role.location}</span>
                        </div>
                        
                        <div className="skills-list">
                          <strong>Skills:</strong>{" "}
                          <span className="skills-text">
                              {visibleSkills.join(" · ")}
                          </span>
                          {hiddenCount > 0 && !isExpanded && (
                              <button onClick={() => toggleSkills(gIndex, rIndex)} className="show-more-skills">
                                  +{hiddenCount} more
                              </button>
                          )}
                          {isExpanded && (
                               <button onClick={() => toggleSkills(gIndex, rIndex)} className="show-more-skills">
                                  show less
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="education-container">
          <h2 className="section-title">Education</h2>
          {educations.map((edu, index) => (
            <div className="timeline-item" key={index}>
              <div className="logo-container">
                {edu.logo ? (
                  <Image
                    src={edu.logo}
                    alt={edu.school}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <span className="placeholder-logo">{edu.school.charAt(0)}</span>
                )}
              </div>
              <div className="content-container">
                <h3 className="role">{edu.school}</h3>
                <h4 className="company">{edu.degree}</h4>
                <div className="meta-info">
                  <span>{edu.startDate} - {edu.endDate}</span>
                  {edu.location && <span>{edu.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="education-container">
          <h2 className="section-title">Licenses & certifications</h2>
          {certifications.map((cert, index) => (
            <div className="timeline-item" key={index}>
              <div className="logo-container">
                <span className="placeholder-logo">{cert.issuer.charAt(0)}</span>
              </div>
              <div className="content-container">
                <h3 className="role">{cert.name}</h3>
                <h4 className="company">{cert.issuer}</h4>
                <div className="meta-info">
                  <span>Issued {cert.issued}</span>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="credential-link"
                  >
                    Show credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className="story2" {...fadeInUpAnimation}>
        <div className="skills-chart">
          <h2 className="skills-chart__title">My skills</h2>
          <div className="skills-chart__container">
            <div className="skills-chart__levels">
              {levels.map((level, index) => (
                <motion.span
                  key={level}
                  className="skills-chart__level"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  {level}
                </motion.span>
              ))}
            </div>
            <div className="skills-chart__bars">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skills-chart__bar-container"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <div className={`skills-chart__bar${index + 1}`}></div>
                  <span className="skills-chart__skill-name">{skill.name}</span>
                  <span className="skills-chart__skill-percentage">
                    {skill.value}
                  </span>
                  <span className="skills-chart__skill-percentagesys">%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="story3" {...fadeInUpAnimation}>
        <div className="parts">
          <motion.div className="part1" {...slideInAnimation}>
            <div className="partHeader">{part1Head}</div>
            <div className="partList">
              {part1.map((part, index) => (
                <motion.div
                  key={part.name}
                  className="partController"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <span className="partSpan">{part.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="part2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="partList">
              <div className="partHeader">{part2Head}</div>
              <div
                className="partControllerWrapper"
                style={{ display: "flex", gap: "65px" }}
              >
                <div className="partControllerLeft" style={{ flex: 1 }}>
                  {part2
                    .slice(0, Math.ceil(part2.length / 2))
                    .map((part, index) => (
                      <motion.div
                        key={part.name}
                        className="partController"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <span className="partSpan">{part.name}</span>
                      </motion.div>
                    ))}
                </div>
                <div className="partControllerRight" style={{ flex: 1 }}>
                  {part2
                    .slice(Math.ceil(part2.length / 2))
                    .map((part, index) => (
                      <motion.div
                        key={part.name}
                        className="partController"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <span className="partSpan">{part.name}</span>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="story4" {...fadeInUpAnimation}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <Image
            src={yoda}
            height={470}
            width={590}
            className="yodaImage"
            alt="Yoda"
          />
        </motion.div>
        <motion.div
          className="yodaContent"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="yodaHeader">{randomyoda}</div>
          <div className="yodaPoints">
            {points.map((point, index) => (
              <motion.div
                key={point.point}
                className="yd"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                {point.point}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="story5" {...fadeInUpAnimation}></motion.div>
    </motion.div>
  );
};

export default About;
