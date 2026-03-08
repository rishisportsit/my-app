"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import gallery from "@/utils/gallery";

const Slideshow = ({ images, title, fitType = "cover" }) => {
  const [index, setIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {images.map((imgKey, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === i ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            zIndex: index === i ? 2 : 1,
            display: "flex", // Ensure vertical centering if fitType is contain
            alignItems: "center",
            justifyContent: "center",
            background: "#000" // Black background for "contain" images that don't fill container
          }}
        >
          <Image
            src={gallery.thumbnails[imgKey]}
            alt={`${title} - slide ${i + 1}`}
            fill
            style={{ objectFit: fitType }}
          />
        </div>
      ))}
      
      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button 
            className="slideshow-control"
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            &#10094;
          </button>
          <button 
             className="slideshow-control"
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            &#10095;
          </button>
          
          {/* Dots */}
          <div 
           className="slideshow-control"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            gap: "8px"
          }}>
            {images.map((_, i) => (
              <div 
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: index === i ? "#fff" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slideshow;
