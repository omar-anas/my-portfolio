import React from "react";
import PropTypes from "prop-types";
import {
  IconBookmark,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconLinkedin,
  IconLoader,
  IconTwitter,
  IconGatsby,
  IconJava,
  IconJavascript,
  IconJest,
  IconMui,
  IconNest,
  IconNode,
  IconReact,
  IconSolidity,
  IconSpring,
  IconFun,
  IconCode,
  IconCss, 
  IconDocker, 
  IconHtml, 
  IconMongoDB, 
  IconPostgres, 
  IconTailwind, 
  IconTypeScript
} from "@components/icons";

const Icon = ({ name }) => {
  switch (name) {
    case "Bookmark":
      return <IconBookmark />;
    case "External":
      return <IconExternal />;
    case "Folder":
      return <IconFolder />;
    case "Fork":
      return <IconFork />;
    case "Code":
      return <IconCode />;
    case "Fun":
      return <IconFun />;
    //socials
    case "GitHub":
      return <IconGitHub />;
   
    case "Linkedin":
      return <IconLinkedin />;
    case "Loader":
      return <IconLoader />;

    case "Twitter":
      return <IconTwitter />;
    //skills
    case "Docker":
      return <IconDocker />;
    case "Gatsby":
      return <IconGatsby />;
    case "Java":
      return <IconJava />;
    case "Javascript":
      return <IconJavascript />;
    case "Jest":
      return <IconJest />;
    case "MUI":
      return <IconMui />;
    case "Mysql":
      return <IconMui />;
    case "Nest":
      return <IconNest />;
    case "Node":
      return <IconNode />;
    case "React":
      return <IconReact />;
    case "Solidity":
      return <IconSolidity />;
    case "Spring":
      return <IconSpring />;
    case "MongoDB":
      return <IconMongoDB />;
    case "Typescript":
      return <IconTypeScript />;
    case "HTML":
      return <IconHtml />;
    case "CSS":
      return <IconCss />;
    case "Postgress":
      return <IconPostgres />;
    case "Tailwind":
      return <IconTailwind />;

    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
