import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import loginPic from "../assets/hi.jpg"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import UserService from "../services/UserService.jsx"

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #FFFFFF;
`

const ImageSection = styled.div`
  width: 50%; 
  height: 100vh; 
  background-image: url(${loginPic});
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px;
  }
`

const ProfileSetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.5px;
  color: #665A38;
  margin-bottom: 30px;
`

const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`

const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: 0;
`

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-top: 3px solid #665A38;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

// ✅ Only this form has styled placeholder opacity
const StyledForm = styled.form`
  width: 100%;

  input::placeholder {
    opacity: 0.6;
  }
`

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userAccountId = Number(searchParams.get("userId")) || 0;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const customerProfile = {
          userAccountId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          address: formData.addressLine2
              ? `${formData.addressLine1}, ${formData.addressLine2}`
              : formData.addressLine1,
          city: formData.city,
          state: formData.state,
        };

        await UserService.createCustomerProfile(customerProfile);
        navigate("/login");
      } catch (error) {
        console.error("Failed to create profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageWrapper>
      <ImageSection />
      <FormSection>
        <ProfileSetupContainer>
          <Title>Set Up Your Profile</Title>

          <StyledForm onSubmit={handleProfileSubmit}>
            <FormRow>
              <FieldContainer>
                <InputField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
              </FieldContainer>

              <FieldContainer>
                <InputField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
              </FieldContainer>
            </FormRow>

            <FieldContainer>
              <InputField
                name="phoneNumber"
                label="Phone Number"
                placeholder="e.g: +94 71 345 6789"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
            </FieldContainer>

            <FieldContainer>
              <InputField
                name="addressLine1"
                label="Address Line 1"
                placeholder="Block Number"
                value={formData.addressLine1}
                onChange={handleChange}
              />
              {errors.addressLine1 && <ErrorText>{errors.addressLine1}</ErrorText>}
            </FieldContainer>

            <FieldContainer>
              <InputField
                name="addressLine2"
                label="Address Line 2"
                placeholder="Street Name"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </FieldContainer>

            <FieldContainer>
              <InputField
                name="city"
                label="City"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <ErrorText>{errors.city}</ErrorText>}
            </FieldContainer>

            <FieldContainer>
              <InputField
                name="state"
                label="State"
                placeholder="Province"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <ErrorText>{errors.state}</ErrorText>}
            </FieldContainer>

            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </StyledForm>
        </ProfileSetupContainer>
      </FormSection>
    </PageWrapper>
  );
};

export default ProfileSetupPage;
