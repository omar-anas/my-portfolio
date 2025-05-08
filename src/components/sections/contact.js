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
    padding: 4rem 1.5rem;
    margin: 0 auto 50px;
  }

p {
  /* Fluid font size (scales between 16px-22px based on viewport width) */
  font-size: clamp(1.4rem, 2vw + 1rem, 1.8rem);
  
  /* Maintain vertical rhythm */
  line-height: 1.6;
  
  color: white;
  margin-bottom: clamp(1.5rem, 3vw, 2rem); /* Responsive margin */

  /* Optional: Add smooth scaling */
  transition: font-size 0.3s ease;
}


@media (max-width: 768px) {
  p {
    font-size: 1.6rem; /* Fixed size for mobile */
    line-height: 1.7; /* Slightly taller line height */
    margin-bottom: 1.5rem;
  }
}


  .title {
  font-size: clamp(2.5rem, 8vw, 6.5rem); // Responsive font size
  font-family: var(--font-sans);
  font-weight: bold;
  display: inline-block; // To allow ::after pseudo-element positioning
  
  &::after {
    content: '.';
    color: var(--green); // Bright green color
    margin-left: 0.1ch; // Small space before the dot
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
}

  .email-link{
  font-size: 1.8rem;
    color: var(--green);
    text-decoration: none;
    
    padding-bottom: 2px;
    transition: all 0.3s ease-in-out;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--green);
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }

    &:hover::after {
      transform-origin: bottom left;
      transform: scaleX(1);
    }   
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
        LinkedIn whatever floats your digital boat! 🚀
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        OmarAnasOfficial@gmail.com
      </a>
    </StyledContactSection>
  );
};

export default Contact;
