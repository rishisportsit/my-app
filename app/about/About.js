import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";
import ChartComponent from "@/components/SkillsChart";

const About = () => {
  const { about, info, aboutdescrip } = constants;
  const {
    banners: { renderAdam },
  } = gallery;

  const skills = [
    { name: "Beer drinking", value: 95 },
    { name: "FrontEnd Development", value: 90 },
    { name: "BackEnd Development", value: 60 },
    { name: "DataBase", value: 70 },
    { name: "Interactive UI's", value: 85 },
  ];

  const levels = ["Jedi", "Ninja", "Geek", "Newbie"];

  return (
    <div className="about-wrapper">
      <div className="story1">
        <div className="about_collapse">
          <div className="about">
            {["a1", "a2", "a3"].map((cls, index) => (
              <div key={cls} className={cls}>
                {[about, info, aboutdescrip][index]}
              </div>
            ))}
          </div>
          <div className="mephoto">
            <Image src={renderAdam} className="img" alt="Adam" />
          </div>
        </div>
      </div>
      <div className="story2">
        <div className="skills-chart">
          <h2 className="skills-chart__title">My skills</h2>
          <div className="skills-chart__container">
            <div className="skills-chart__levels">
              {levels.map((level) => (
                <span key={level} className="skills-chart__level">
                  {level}
                </span>
              ))}
            </div>
            <div className="skills-chart__bars">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skills-chart__bar-container">
                  <div className={`skills-chart__bar${index + 1}`}></div>
                  <span className="skills-chart__skill-name">{skill.name}</span>
                  <span className="skills-chart__skill-percentage">
                    {skill.value}
                  </span>
                  <span className="skills-chart__skill-percentagesys">%</span>
                </div>
              ))}
            </div>
          </div>
        </div>``
      </div>
      <div className="story3">
          {/* <ChartComponent />a */}
      </div>
      <div className="story4"></div>
      <div className="story5"></div>
    </div>
  );
};

export default About;
