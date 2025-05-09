import React, { useState, useEffect, useRef } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { srConfig } from "@config";
import sr from "@utils/sr";
import { Icon } from "@components/icons";

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto 100px;
  padding: 0 150px;

  h2 {
    font-size: clamp(26px, 5vw, 32px);
    text-align: center;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    position: relative;
    width: 100%;
    margin: 70px 0;

    @media (max-width: 1400px) {
      padding: 0;
      grid-gap: 30px;
    }

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 0;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 0;
      grid-gap: 50px; /* Increased gap between cards on mobile */
    }
  }

  @media (max-width: 1480px) {
    padding: 0 100px;
  }

  @media (max-width: 1080px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    padding: 0 25px;
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 40px 0 80px; /* Adjusted margins */
    padding: 12px 30px; /* Larger button */
    font-size: 16px; /* Larger text */
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  background: var(--light-navy);
  transition: all 0.3s ease-in-out;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);

  .project-image {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    position: relative;
    overflow: hidden;
    
    .gatsby-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
      object-fit: cover;
    }
  }

  .project-inner {
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    
    /* Add min-height to ensure consistent spacing */
    min-height: 280px;
    
    @media (max-width: 768px) {
      padding: 20px;
      min-height: 240px;
    }
  }

  .project-top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;

    .project-links {
      display: flex;
      gap: 12px;
      z-index: 1;

      a {
        padding: 8px;
        border-radius: 50%;
        background-color: var(--lightest-navy);
        color: var(--lightest-slate);
        transition: all 0.2s ease-in-out;
        
        &:hover {
          background-color: var(--green-tint);
          color: var(--green);
          transform: translateY(-3px);
        }

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  .project-title {
    font-size: clamp(24px, 5vw, 30px); /* Responsive font size */
    font-weight: 600;
    color: var(--lightest-slate);
    margin-bottom: 15px;
    line-height: 1.2;

    a {
      color: inherit;
      text-decoration: none;
      
      &:hover {
        color: var(--green);
      }
    }
    
    @media (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  .project-description {
    font-size: clamp(16px, 4vw, 18px); /* Responsive font size */
    line-height: 1.6;
    color: var(--light-slate);
    margin-bottom: 25px;
    flex-grow: 1;
    
    /* Ensure text doesn't overflow on small screens */
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    
    p {
      margin-bottom: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 15px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--green);
      background-color: var(--lightest-navy);
      padding: 6px 12px;
      border-radius: 50px;
      white-space: nowrap;
      
      @media (max-width: 768px) {
        font-size: 12px;
        padding: 5px 10px;
      }

      &::before {
        content: "•";
        color: var(--green);
        margin-right: 6px;
      }
    }
  }

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
    
    .gatsby-image {
      filter: brightness(1.1);
      transform: scale(1.03);
    }
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              cover {
                childImageSharp {
                  gatsbyImageData(width: 1500, placeholder: BLURRED)
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) =>
      sr.reveal(ref, srConfig(i * 100))
    );
  }, []);

  const GRID_LIMIT = 2;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = (node) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, cover } = frontmatter;
    const image = getImage(cover);

    return (
      <>
        <div className="project-image">
          <GatsbyImage image={image} alt={title} className="gatsby-image" />
        </div>
        <div className="project-inner">
          <header>
            <div className="project-top">
              <div className="project-links">
                {github && (
                  <a
                    href={github}
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="GitHub" />
                  </a>
                )}
                {external && (
                  <a
                    href={external}
                    aria-label="External Link"
                    className="external"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="External" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="project-title">
              <a href={external} target="_blank" rel="noreferrer">
                {title}
              </a>
            </h3>

            <div
              className="project-description"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </header>

          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  };

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle} className="center-heading">
        Projects
      </h2>

      <ul className="projects-grid">
        <TransitionGroup component={null}>
          {projectsToShow &&
            projectsToShow.map(({ node }, i) => (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                exit={false}
              >
                <StyledProject
                  key={i}
                  ref={(el) => (revealProjects.current[i] = el)}
                  style={{
                    transitionDelay: `${
                      i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
                    }ms`,
                  }}
                >
                  {projectInner(node)}
                </StyledProject>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? "Less" : "More"}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;