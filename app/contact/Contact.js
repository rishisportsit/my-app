"use client";
import Image from "next/image";
import constants from "../../constants/constants.json";
import gallery from "@/utils/gallery";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SocialIcon = ({ src, alt, label, color }) => (
  <motion.div
    className="social-icon-container"
    whileHover={{
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
    }}
  >
    <Image
      src={src}
      className={`${alt.toLowerCase()}sprite`}
      alt={alt}
      width={50}
      height={50}
    />
    <motion.span
      className="spriteIconsSpan"
      style={{ color: color }}
      whileHover={{
        scale: 1.1,
        textShadow: "0px 0px 8px rgba(0,0,0,0.2)",
      }}
    >
      {label}
    </motion.span>
  </motion.div>
);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    // Name validation
    if (!name || name.trim().length < 2) {
      newErrors.name = "Please Enter Valid Name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please Enter a Valid Email Address";
      isValid = false;
    }

    // Message validation
    if (!message || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          recipientEmail: process.env.RECIPIENT_EMAIL,
          smtpUser: "rishivarma9090@gmail.com",
          smtpPass: "Varmarishi@123",
        }),
      });

      const data = await res.json();
      if (data.message === "Email sent successfully!") {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

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
    <motion.div
      className="contact_wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="story1"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <div className="contact_collapse">
          <motion.div
            className="contact"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <motion.div
              className="contact_title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {constants.contact}
            </motion.div>
            <motion.div
              className="contact_descrip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {constants.contactdesc}
            </motion.div>
            <motion.div
              className="sprite_icons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              {socialIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index + 0.7 }}
                >
                  <SocialIcon {...icon} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="designphoto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={gallery.banners.designLogo}
              alt="designbanner"
              className="designbanner"
            />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="story2"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <form className="contact-form" onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <input
              type="text"
              placeholder="Name"
              className={`fancy-input ${errors.name ? "error" : ""}`}
              value={name}
              style={{
                fontFamily:
                  '"proxima nova light", "Helvetica Neue", Helvetica, Arial, Sans-serif',
                letterSpacing: "0.1em",
              }}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <motion.div
                className="error-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.name}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <input
              type="email"
              placeholder="Email"
              className={`fancy-input ${errors.email ? "error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                fontFamily:
                  '"proxima nova light", "Helvetica Neue", Helvetica, Arial, Sans-serif',
                letterSpacing: "0.1em",
              }}
            />
            {errors.email && (
              <motion.div
                className="error-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.email}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <textarea
              placeholder="Message"
              className={`fancy-input message ${errors.message ? "error" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                fontFamily:
                  '"proxima nova light", "Helvetica Neue", Helvetica, Arial, Sans-serif',
                letterSpacing: "0.1em",
              }}
            />
            {errors.message && (
              <motion.div
                className="error-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.message}
              </motion.div>
            )}
          </motion.div>

          <motion.button
            className="send-button"
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            style={{
              height: "60px",
              borderRadius: "10px",
              fontFamily:
                '"proxima nova light", "Helvetica Neue", Helvetica, Arial, Sans-serif',
              letterSpacing: "0.1em",
              fontSize: "20px",
              fontWeight: 600,
              color: "#333333",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Email"}
          </motion.button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="success-message"
            >
              Message sent successfully!
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-message"
            >
              Failed to send message. Please try again.
            </motion.p>
          )}
        </form>

        <style jsx>{`
          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
          }

          .fancy-input {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.05);
            color: #333;
          }

          .fancy-input:focus {
            outline: none;
            border-color: #000000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }

          .fancy-input.error {
            border-color: #ff4d4f;
            background-color: #fff2f0;
          }

          .error-text {
            color: #ff4d4f;
            font-size: 14px;
            margin-top: 8px;
            padding: 8px 12px;
            background-color: #fff2f0;
            border: 1px solid #ffccc7;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .error-text i {
            font-size: 16px;
          }

          .message {
            min-height: 150px;
            resize: vertical;
          }

          .send-button {
            padding: 12px 30px;
            height: 60px 
            background: linear-gradient(45deg, #2196f3, #21cbf3);
            border: none;
            border-radius: 25px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
          }

          .send-button:hover {
            box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
          }

          .send-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .success-message {
            color: #52c41a;
            text-align: center;
            margin-top: 10px;
            padding: 8px 12px;
            background-color: #f6ffed;
            border: 1px solid #b7eb8f;
            border-radius: 4px;
          }

          .error-message {
            color: #ff4d4f;
            text-align: center;
            margin-top: 10px;
            padding: 8px 12px;
            background-color: #fff2f0;
            border: 1px solid #ffccc7;
            border-radius: 4px;
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}
