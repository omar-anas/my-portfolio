import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-forest);
  z-index: 99;
  
  .logo-wrapper {
    width: max-content;
    max-width: 600px; /* Increased from 100px to show more of the SVG */
    transition: var(--transition);
    opacity: 1;
    
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
    }
    
    .my-path {
      fill: none;
      stroke-width: 5;
    }
    
    #B {
      opacity: 0;
    }
  }
`;

const Loader = ({ finishLoading }) => {

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });
  
    loader
      .add({
        targets: '#logo .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1400,
        delay: function(el, i) { return i * 100 },
        direction: 'alternate',
        loop: false
      })  
      .add({
        targets: '#logo',
        delay: 200,
        duration: 400,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <StyledLoader className="loader" >
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
