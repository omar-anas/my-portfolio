import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { srConfig, email } from "@config";
import sr from "@utils/sr";

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto 100px;
  padding: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 0 auto 50px;
  }

  p {
    /* Fluid font size that scales between viewports */
    font-size: clamp(1rem, 1vw + 0.6rem, 1.2rem);
    
    /* Maintain vertical rhythm */
    line-height: 1.6;
    
    color: var(--slate);
    margin-bottom: clamp(1.5rem, 3vw, 2rem); /* Responsive margin */
    
    /* Improve readability on smaller screens */
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    font-size: clamp(2.5rem, 5vw, 4rem); // More moderate responsive scaling
    font-family: var(--font-sans);
    font-weight: bold;
    display: inline-block;
    margin-bottom: 1.5rem;
    
    &::after {
      content: '.';
      color: var(--green);
      margin-left: 0.1ch;
    }
    
    @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
  }

  .links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    @media (max-width: 480px) {
      gap: 1.2rem; /* Increase touch target spacing on mobile */
    }
  }

  .contact-link {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    color: var(--green);
    text-decoration: none;
    padding-bottom: 2px;
    transition: all 0.3s ease-in-out;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }
    
    &:hover::after {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
    
    &:focus {
      outline: 2px dashed var(--green);
      outline-offset: 3px;
    }
  }
  
  .email-link {
    color: var(--green);
  }
  
  .linkedin-link {
    color: #0072b1; /* LinkedIn blue */
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  
  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);
  
  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Contact</h2>
      
      <p>
        Feel free to drop me an email if you want to connect! Or catch me on
        <a className="contact-link likedin-link"
          href="https://www.linkedin.com/in/omar-anas/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#0072b1", fontWeight: "600", padding: "0 5px" }}
        >
          LinkedIn
        </a>
        whatever floats your digital boat! 🚀
      </p>
      
      <div className="links-container">
        <a className="contact-link email-link" href={`mailto:${email}`}>
          OmarAnasOfficial@gmail.com
        </a>
        
      
      </div>
    </StyledContactSection>
  );
};

export default Contact;