import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const Container = styled.div`
  background-color: var(--forest);
  color: white;
  font-family:--var(font-sans)
  max-width: 700px;
  `;
  
  const CategorySection = styled.div`
  margin-bottom: 30px;
  `;
  
  const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  `;
  
  const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  width: 42px;
  height: 42px;
  color:var(--green);
`;

const CategoryTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin: 0px;
  padding:0px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.div`
  background-color:var(--green-tint);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  svg {
        width: 35px;
        height: 35px;
      }
`;

// Data
const categories = [
  {
    title: "Use at work",
    icon: "Code",
    tags: ["Javascript", "Typescript", "HTML", "CSS", "React", "Docker","Node", "Nest", "Postgress", "GitHub", "Jest"]
  },
  {
    title: "Use for fun",
    icon: "Fun",
    tags: ["Gatsby", "Solidity", "Java", "Spring", "MUI","Tailwind", "MongoDB",]
  }
];

// Component
const TechCategories = () => {
  return (
    <Container>
      {categories.map((category, index) => (
        <CategorySection key={index}>
          <CategoryHeader>
            <IconWrapper>
              <Icon name={category.icon}/>
            </IconWrapper>
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryHeader>
          <TagsContainer>
            {category.tags.map((tag, tagIndex) => (
              <Tag key={tagIndex}>
                 <Icon name={tag}/>
              </Tag>
            ))}
          </TagsContainer>
        </CategorySection>
      ))}
    </Container>
  );
};

export default TechCategories;