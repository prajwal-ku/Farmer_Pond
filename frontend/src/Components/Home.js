import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/pond.jpg", "/pond1.jpg", "/pond_en.jpg", "/pond3.jpg"];

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Background Image with Smooth Fade Transition */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(70%)", // Less dark overlay
          }}
        />
      </AnimatePresence>

      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Lighter overlay
          padding: "2rem 3rem",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          maxWidth: "90%",
          width: "800px",
          margin: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: "bold",
            margin: "0 0 1rem 0",
            lineHeight: 1.3,
          }}
        >
          Welcome to Farm Pond Monitoring System
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Monitor and manage your farm pond water levels, pH, and contamination efficiently.
        </p>
      </motion.div>
    </div>
  );
}

export default Home;