import React from 'react';
import styled from 'styled-components';
import { Layout, Hero,About,Projects,Contact }from '@components';
// Step 2: Define your component

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About/>
      <Projects/>
      <Contact/>
    </StyledMainContainer>
   </Layout>
);


// Step 1: Define your page metadata
// This is optional, but recommended for SEO
export const Head = () => <title>Omar Anas Portfolio</title>
// Step 3: Export your component
export default IndexPage