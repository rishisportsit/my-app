import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";

function About() {
  const { about, info, aboutdescrip } = constants;
  const {
    banners: { renderAdam },
  } = gallery;

  return (
    <div className="about-wrapper">
      <div className="story1">
        <div className="about_collapse">
          <div className="about">
            <div className="a1">{about}</div>
            <div className="a2">{info}</div>
            <div className="a3">{aboutdescrip}</div>
          </div>
          <div className="mephoto">
            <Image src={renderAdam} className="img" alt="Adam" />
          </div>
        </div>
      </div>
      <div className="story2"></div>
      <div className="story3"></div>
      <div className="story4"></div>
      <div className="story5"></div>
    </div>
  );
}

export default About;
