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
  max-width: 1600px; // Increased from 1200px
  margin: 0 auto 100px;
  padding: 0 150px; // Added horizontal padding

  h2 {
    font-size: clamp(26px, 5vw, 32px);
    
    text-align: center;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px; // Increased gap
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
    margin-bottom: 100px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  background: var(--light-navy);
  transition: all 0.3s ease-in-out; // Added smoother transition
  height: auto; // Changed from fixed 600px to auto
  min-height: 500px; // Added minimum height
  width: 100%;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);

  .project-image {
    width: 100%;
    height: 300px; // Increased image height
    object-fit: cover;
  }

  .project-inner {
    padding: 30px;
    height: calc(100% - 300px); // 300px is image height
    display: flex;
    flex-direction: column;
    position: relative;

    header {
      flex: 1;
      margin-bottom: 20px;
    }

    footer {
      position: absolute;
      bottom: 30px;
      left: 30px;
      right: 30px;

      .project-tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--green);
          background-color: var(--lightest-navy);
          padding: 8px 16px;
          border-radius: 50px;

          &::before {
            content: ".";
            color: var(--green); // Bright green color
            margin-left: 0.1ch; // Small space before the dot
          }
        }
      }
    }
  }

  .project-description {
    font-size: 18px;
    line-height: 1.6;
    color: var(--light-slate);
    margin-bottom: 60px; // Add space for tech list at bottom
  }

  .project-top {
    display: flex;
    justify-content: flex-end; // Moved links to right side
    margin-bottom: 20px;

    .project-links {
      display: flex;
      gap: 15px;

      a {
        padding: 10px;
        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .project-title {
    font-size: 34px; // Larger title
    font-weight: 600;
    color: var(--lightest-slate);
    margin-bottom: 15px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &:hover {
    transform: translateY(-10px); // Reduced movement for smoother effect
    box-shadow: 0 20px 30px -15px var(--green);

    .project-image {
      filter: brightness(1.1);
      transform: scale(1.02);
      transition: all 0.3s ease-in-out;
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
        <GatsbyImage image={image} alt={title} className="project-image" />
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

          <footer>
            {tech && (
              <ul className="project-tech-list">
                {tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            )}
          </footer>
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
