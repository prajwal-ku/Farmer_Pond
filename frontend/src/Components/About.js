import React from "react";
import "./About.css";

const About = () => {
  const questions = [
    { 
      question: "What is our system about?", 
      answer: "A smart water monitoring solution that helps farmers track pond water levels and quality in real-time." 
    },
    { 
      question: "How does it work?", 
      answer: "Sensors continuously measure water levels, pH, and contamination, sending live updates to a farmer's dashboard." 
    },
    { 
      question: "Why is it important?", 
      answer: "It ensures sustainable water use, prevents resource wastage, and improves farming efficiency." 
    },
    { 
      question: "What makes our system unique?", 
      answer: "User-friendly interface, real-time data, AI-driven insights, and solar-powered sustainability." 
    }
  ];

  return (
    <div className="about-container">
      <h1>AquaSure</h1>
      <p>
        Our system empowers farmers with real-time water quality and level monitoring, 
        optimizing water usage for improved sustainability and agricultural productivity.
      </p>
      <div className="cards-container">
        {questions.map((item, index) => (
          <div key={index} className="card1">
            <div className="card-inner">
              <div className="card-front">
                <h3>{item.question}</h3>
              </div>
              <div className="card-back">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
