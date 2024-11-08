"use client";
import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";
import ChartComponent from "@/components/SkillsChart";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const About = () => {
  const { about, info, aboutdescrip, part2Head, part1Head, randomyoda } =
    constants;
  const {
    banners: { renderAdam, yoda },
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
    { point: "I live in Hyderabad" },
    { point: "I'm slightly addicted to Instagram" },
    { point: "stack is my mentor" },
  ];

  const levels = ["Jedi", "Ninja", "Geek", "Newbie"];

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
            <Image src={renderAdam} className="img" alt="Adam" />
          </motion.div>
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
