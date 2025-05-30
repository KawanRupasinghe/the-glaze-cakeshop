import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar";

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 80px 150px;
  background: #fff;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    padding: 60px 80px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(245, 230, 204, 0.3);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: rgba(102, 90, 56, 0.1);
    z-index: 0;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  position: relative;
  z-index: 1;
  
  &:hover {
    color: #665A38;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  &::before {
    content: '←';
    margin-right: 8px;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin: 0 0 1rem 0;
  margin-top: 3rem;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #665A38;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ContactInfoContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(102, 90, 56, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: 10px;
    bottom: 10px;
    border-radius: 16px;
    border: 1px solid rgba(102, 90, 56, 0.2);
    z-index: -1;
  }
`;

const ContactInfoSection = styled.div`
  margin-bottom: 2.5rem;
`;

const ContactInfoTitle = styled.h2`
  font-size: 1.8rem;
  color: #665A38;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #E0D5B3;
  }
`;

const ContactInfoText = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #F5E6CC;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #665A38;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const ContactDetail = styled.div`
  flex: 1;
`;

const ContactLabel = styled.p`
  font-size: 0.9rem;
  color: #A79D75;
  margin: 0;
`;

const ContactValue = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

const ContactLink = styled.a`
  font-size: 1.1rem;
  color: #665A38;
  margin: 0;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #7D6E45;
    text-decoration: underline;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  color: white;
  flex: 1;
  min-width: 200px;
  
  &.whatsapp {
    background-color: #25D366;
    
    &:hover {
      background-color: #128C7E;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
    }
  }
  
  &.facebook {
    background-color: #1877F2;
    
    &:hover {
      background-color: #0E5AA7;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(24, 119, 242, 0.3);
    }
  }
`;

const SocialIcon = styled.span`
  margin-right: 12px;
  font-size: 1.4rem;
`;

const BusinessHoursContainer = styled.div`
  margin-top: 2rem;
  background: rgba(245, 230, 204, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 3px solid #E0D5B3;
`;

const BusinessHoursTitle = styled.h3`
  font-size: 1.3rem;
  color: #665A38;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const BusinessHoursGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const BusinessDay = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const BusinessTime = styled.div`
  font-size: 1rem;
  color: #665A38;
`;

const DecorationElement = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background-image: url('/placeholder.svg');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: 0;
  
  &.top-right {
    top: 50px;
    right: 50px;
    transform: rotate(15deg);
  }
  
  &.bottom-left {
    bottom: 50px;
    left: 50px;
    transform: rotate(-15deg);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, rgba(224, 213, 179, 0), rgba(224, 213, 179, 0.5), rgba(224, 213, 179, 0));
  margin: 2rem 0;
`;

const ContactPage = () => {
  const navigate = useNavigate();
  
  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <PageContainer>
      <Navbar /> 
      <DecorationElement className="top-right" />
      <DecorationElement className="bottom-left" />
      
      <BackButton onClick={handleBack}>Back to home</BackButton>
      
      <PageTitle>Get in Touch</PageTitle>
      <PageSubtitle>
        We'd love to hear from you! Whether you have a question about our cakes, need help with an order, 
        or want to discuss a custom creation, we're here to help.
      </PageSubtitle>
      
      <ContentContainer>
        <ContactInfoContainer>
          <ContactInfoSection>
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            <ContactInfoText>
              Feel free to reach out to us using any of the contact methods below. 
              We strive to respond to all inquiries within 24 hours.
            </ContactInfoText>
            
            <ContactGrid>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactDetail>
                  <ContactLabel>Our Location</ContactLabel>
                  <ContactValue>74/4/A, Sri Somananda Mawatha, Mailapitiya, Kandy</ContactValue>
                </ContactDetail>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <ContactDetail>
                  <ContactLabel>Phone Number</ContactLabel>
                  <ContactValue>0705717077</ContactValue>
                </ContactDetail>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>✉️</ContactIcon>
                <ContactDetail>
                  <ContactLabel>Email Address</ContactLabel>
                  <ContactLink href="mailto:hello@cakeshop.com">theglaze@gmail.com</ContactLink>
                </ContactDetail>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>📱</ContactIcon>
                <ContactDetail>
                  <ContactLabel>WhatsApp</ContactLabel>
                  <ContactLink href="https://wa.me/+94705717077" target="_blank" rel="noopener noreferrer">
                  0705717077
                  </ContactLink>
                </ContactDetail>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>👍</ContactIcon>
                <ContactDetail>
                  <ContactLabel>Facebook</ContactLabel>
                  <ContactLink href="https://www.facebook.com/profile.php?id=61564974454510" target="_blank" rel="noopener noreferrer">
                    @cakeshop
                  </ContactLink>
                </ContactDetail>
              </ContactItem>
            </ContactGrid>
            
            <Divider />
            
            {/* <SocialMediaContainer>
              <SocialButton 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp"
              >
                <SocialIcon>📱</SocialIcon>
                Contact via WhatsApp
              </SocialButton>
              
              <SocialButton 
                href="https://facebook.com/cakeshop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="facebook"
              >
                <SocialIcon>👍</SocialIcon>
                Message on Facebook
              </SocialButton>
            </SocialMediaContainer> */}
            
            <BusinessHoursContainer>
              <BusinessHoursTitle>Business Hours</BusinessHoursTitle>
              <BusinessHoursGrid>
                <BusinessDay>Monday - Friday:</BusinessDay>
                <BusinessTime>9:00 AM - 6:00 PM</BusinessTime>
                
                <BusinessDay>Saturday:</BusinessDay>
                <BusinessTime>10:00 AM - 4:00 PM</BusinessTime>
                
                <BusinessDay>Sunday:</BusinessDay>
                <BusinessTime>Closed</BusinessTime>
              </BusinessHoursGrid>
            </BusinessHoursContainer>
          </ContactInfoSection>
        </ContactInfoContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContactPage;