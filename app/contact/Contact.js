import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";

const SocialIcon = ({ src, alt, label, color }) => (
  <div className="social-icon-container">
    <Image
      src={src}
      className={`${alt.toLowerCase()}sprite`}
      alt={alt}
      width={50}
      height={50}
    />
    <span className="spriteIconsSpan" style={{ color: color }}>{label}</span>
  </div>
);

export default function Contact() {
  const socialIcons = [
    {
      src: gallery.spriteIcons.fbsprite,
      alt: "Facebook",
      label: "Facebook",
      color: "#1877F2",
    },
    {
      src: gallery.spriteIcons.igsprite,
      alt: "Instagram",
      label: "Instagram",
      color: "#C13584",
    },
    {
      src: gallery.spriteIcons.twsprite,
      alt: "Twitter",
      label: "Twitter",
      color: "#000000",
    },
    {
      src: gallery.spriteIcons.lnsprite,
      alt: "LinkedIn",
      label: "LinkedIn",
      color: "#0A66C2",
    },
  ];

  return (
    <div className="contact_wrapper">
      <div className="story1">
        <div className="contact_collapse">
          <div className="contact">
            <div className="contact_title">{constants.contact}</div>
            <div className="contact_descrip">{constants.contactdesc}</div>
            <div className="sprite_icons">
              {socialIcons.map((icon, index) => (
                <SocialIcon key={index} {...icon} />
              ))}
            </div>
          </div>
          <div className="designphoto">
            <Image
              src={gallery.banners.designLogo}
              alt="designbanner"
              className="designbanner"
            />
          </div>
        </div>
      </div>
      <div className="story2"></div>
    </div>
  );
}
