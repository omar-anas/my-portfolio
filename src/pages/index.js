import React from 'react';
import styled from 'styled-components';
import { Layout, Hero,About}from '@components';
// Step 2: Define your component

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About/>
    </StyledMainContainer>
   </Layout>
);



export const Head = () => <title>Home Page</title>
// Step 3: Export your component
export default IndexPage