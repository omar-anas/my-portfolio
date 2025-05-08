import { css } from 'styled-components';

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding: 1.25rem 1.75rem;
  isolation: isolate;
  z-index: 1;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--green);
    transform: scale(0);
    transform-origin: top left;
    opacity: 0.1;
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--green);
    &:before {
      opacity: 0.2;
      transform: scale(1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--green) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--green);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    isolation: isolate;
    z-index: 1;
    overflow: hidden;
    transition: all 0.3s ease;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--green);
      transform: scale(0);
      transform-origin: top left;
      opacity: 0.1;
      transition: transform 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: var(--green);
      &:before {
        opacity: 0.2;
        transform: scale(1);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--green);
      outline-offset: 3px;
    }
  `,

  bigButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    isolation: isolate;
    z-index: 1;
    overflow: hidden;
    transition: all 0.3s ease;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--green);
      transform: scale(0);
      transform-origin: top left;
      opacity: 0.1;
      transition: transform 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: var(--green);
      &:before {
        opacity: 0.2;
        transform: scale(1);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--green);
      outline-offset: 3px;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--forest-shadow);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px var(--forest-shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
