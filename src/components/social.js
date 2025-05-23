import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Icon } from '@components/icons';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;


  li {
    

    a {
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Social = ({ isHome }) => (
  
    <StyledSocialList>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>

);

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
