import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from "../components/Navbar";

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 80px 0;
  color: #F5E6CC;
  background: #fff;
  min-height: 100vh;
  width: 100%;
`;

const Section = styled.section`
  margin: 1rem auto;
  padding: 40px 150px;
  max-width: 1400px;
  
  @media (max-width: 1024px) {
    padding: 40px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 40px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #000;
  }
`;

const StoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 60px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.div`
  height: 500px;
  width: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 10 100px 200px rgba(5, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #424949;
`;

const ValuesSection = styled.div`
  margin: 60px 0;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Ensure 4 items per row */
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 items per row on smaller screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 item per row on very small screens */
  }
`;

const ValueCard = styled.div`
  background-color: #ecf0f1;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #ccc;
  margin-bottom: 20px;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 100;
  margin-bottom: 15px;
  color: #665A38;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #424949;
`;

const CallToAction = styled.div`
  margin: 80px 0 40px;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-family: 'Inter', serif;
  font-size: 2.5rem;
  color: #797d7f;
  margin-bottom: 20px;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #665A38;
  color: white;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: semibold;
  font-color: #fff;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #7d6c43;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;
  margin: 80px 0;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <Navbar /> 
      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <StoryContainer>
          <StoryImage>
            <img src="/about.jpg" alt="Bakery founder" />
          </StoryImage>
          <StoryContent>
            <Paragraph>
              Nestled in the heart of Kandy, The Glaze began as a simple dream—a dream to create cakes that not only look beautiful but also bring people together. What started in a small home kitchen with a single oven and a love for baking has grown into a local favorite known for its creativity, quality, and heart.            </Paragraph>
            <Paragraph>
              Every cake at The Glaze tells a story. Whether it’s a soft sponge layered with fresh cream or a bold chocolate creation drizzled with ganache, each one is handmade with care, using high-quality ingredients and a deep attention to detail. Inspired by the warmth of home, the vibrancy of Kandy, and a passion for unique designs, The Glaze blends tradition with a modern twist.            </Paragraph>
            <Paragraph>
              Built from scratch by a young woman with a big vision, this little cake shop stands for more than just sweets—it represents dedication, creativity, and the joy of doing what you love. From custom celebration cakes to everyday treats, The Glaze is here to make your moments a little more magical.            </Paragraph>
            <Paragraph>
              We’re more than just a cake shop. We’re a part of your birthdays, weddings, surprises, and smiles. And we’re just getting started. </Paragraph> 
          </StoryContent>
        </StoryContainer>
        
        <ValuesSection>
          <SectionTitle>Our Values</SectionTitle>
          <Paragraph>
            At The Glaze, our philosophy is built on core values that guide everything we do. From sourcing ingredients to customer service, these principles ensure we deliver nothing but the best.
          </Paragraph>
          
          <ValuesGrid>
            <ValueCard>
              <ValueIcon>✦</ValueIcon>
              <ValueTitle>Quality Ingredients</ValueTitle>
              <ValueDescription>
                We use only premium, locally-sourced ingredients whenever possible. From Belgian chocolate to farm-fresh eggs, quality is never compromised.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>✦</ValueIcon>
              <ValueTitle>Artisanal Craftsmanship</ValueTitle>
              <ValueDescription>
                Each dessert is handcrafted with care and attention to detail. We believe in the beauty of imperfection that comes with truly handmade goods.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>✦</ValueIcon>
              <ValueTitle>Innovation</ValueTitle>
              <ValueDescription>
                While we honor traditional recipes, we constantly experiment with new flavors, techniques, and designs to create unique dessert experiences.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>✦</ValueIcon>
              <ValueTitle>Community</ValueTitle>
              <ValueDescription>
                We're proud to be part of our local community. We support local farmers, participate in community events, and give back through various initiatives.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </ValuesSection>
        
        <Divider />
        
        <CallToAction>
          <CTATitle>Ready to Experience Sweet Delights?</CTATitle>
          <Paragraph>
            Whether you're celebrating a special occasion or simply treating yourself, our desserts are crafted to make every moment sweeter.
          </Paragraph>
          <CTAButton to="/menu">Explore Our Menu</CTAButton>
        </CallToAction>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;
