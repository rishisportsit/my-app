import Image from "next/image";
import gallary from "@/utils/gallery";
import constants from "../constants/constants.json";

function Home() {
  return (
    <div className="body_wrapper">
      <div className="bannermain_wrapper">
        <div className="design_wrapper">
          <span className="design_span">design</span>
        </div>
        <div className="banner_wrapper">
          <Image src={gallary.banners.homeBanner} className="home_banner" />
        </div>
        <div className="coder_wrapper">
          <span className="coder_span">{constants.combine}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
