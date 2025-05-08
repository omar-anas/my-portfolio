import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { TechCategories } from "@components";
import { srConfig } from "@config";
import sr from "@utils/sr";

const StyledAboutSection = styled.section`
  max-width: 1300px;
  margin: 0;
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledSkills = styled.div`
  position: relative;
  max-width: 500px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 100%;
  }
  
`;

const About = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    console.log(revealContainer);

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="after-heading">About Me</h2>
      <div className="inner">
        <div>
          <p>
            Hello! I'm Omar 👋, a backend engineer specializing in Node.js, though
            I love building with whatever tools are right for the job. I
            graduated with a Computer Science degree from Helwan University in
            2023. My passion for web development began during my senior year
            when I completed my first real-time production project - a one-man
            show where I built both the frontend and backend, while also
            configuring a CentOS server using{" "}
            <a href="https://nginx.org/">Nginx</a>,{" "}
          </p>

          <p>
            After graduation 🥳🎓, I had the unique opportunity to continue
            programming during my military service, where I developed a desktop
            military management system using {" "}
            <a href="https://Electronjs.org/">ElectronJS</a>  for the 30-June Air
            Defense Stadium. The system remains in use even after I completed my
            service. These days, my focus is on building accessible, inclusive
            products and digital experiences for various clients.
          </p>

          <p>
          I'm looking for new positions and opportunities where I can merge my love for code. If you think you've got an opening that I might like, let's connect  🔗
          </p>

        </div>

        <StyledSkills>
          <div className="wrapper">
            <TechCategories />
          </div>
        </StyledSkills>
      </div>
    </StyledAboutSection>
  );
};

export default About;
