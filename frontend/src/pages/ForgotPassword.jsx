"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginPic from "../assets/hi.jpg";
import UserService from "../services/UserService.jsx";

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #FFFFFF;
`;

const ImageSection = styled.div`
  width: 50%; 
  height: 100vh; 
  background-image: url(${loginPic});
  background-size: cover;
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 55%;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px;
  }
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  color: #665A38;
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #2A2A2A;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 2px solid #665A38;
  border-radius: 12px;
  font-size: 16px;
  color: #2A2A2A;

  &:focus {
    outline: none;
    border-color: #8a7b4d;
  }

  &::placeholder {
    color: #8C8C8C;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #665A38;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  background: #665A38;
  border: none;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #7d6c43;
  }

  &:disabled {
    background: #CCCCCC;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
`;

const SuccessMessage = styled.p`
  background-color: #F5F1EA; /* Soft beige background */
  border-left: 4px solid #665A38; /* Earthy brown accent */
  color: #2A2A2A; /* Dark readable text */
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: left;
  font-weight: 500;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!formData.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    return null;
  };

  const validateCode = () => {
    if (!formData.code) return "Verification code is required";
    return null;
  };

  const validatePassword = () => {
    if (!formData.newPassword) return "Password is required";
    if (formData.newPassword.length < 8) return "Password must be at least 8 characters";
    if (formData.newPassword !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = async () => {
    const error = validateEmail();
    if (error) {
      setErrors({ email: error });
      return;
    }

    const Email = { email: formData.email };
    localStorage.setItem("email", JSON.stringify(Email));

    setLoading(true);
    setResetMessage("Sending verification code...");

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => UserService.sendVerificationCode(Email).then(resolve), 1500)
      );

      if (response.status === 200) {
        setStep(2);
      } else {
        setErrors({ email: "Failed to send verification code. Try again." });
      }
    } catch (err) {
      setErrors({ email: "Error sending verification code." });
      console.error(err);
    } finally {
      setLoading(false);
      setResetMessage("");
    }
  };

  const handleVerify = async () => {
    const error = validateCode();
    if (error) {
      setErrors({ code: error });
      return;
    }

    const verificationCode = { verificationCode: formData.code };

    setLoading(true);
    setResetMessage("Verifying code...");

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => UserService.validateCode(verificationCode).then(resolve), 1500)
      );

      if (response.status === 200) {
        setStep(3);
      } else {
        setErrors({ code: "Invalid verification code." });
      }
    } catch (err) {
      setErrors({ code: "Error verifying code." });
      console.error(err);
    } finally {
      setLoading(false);
      setResetMessage("");
    }
  };

  const handleResetPassword = async () => {
    const error = validatePassword();
    if (error) {
      setErrors({ newPassword: error });
      return;
    }

    const data = localStorage.getItem("email");
    const email = data ? JSON.parse(data).email : null;
    const passwordResetDto = { email: email, password: formData.confirmPassword };

    setLoading(true);
    setResetMessage("Resetting your password, please wait...");

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => UserService.ResetPassword(passwordResetDto).then(resolve), 1500)
      );

      if (response.status === 200) {
        setSuccessMessage("Your password has been successfully updated.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ newPassword: "Failed to reset password. Try again." });
      }
    } catch (err) {
      setErrors({ newPassword: "Error resetting password." });
      console.error(err);
    } finally {
      setLoading(false);
      setResetMessage("");
    }
  };

  return (
    <PageWrapper>
      <ImageSection />
      <FormSection>
        {step === 1 && (
          <>
            <Title>Forgot Password</Title>
            <InputGroup>
              <Label>Enter your email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>
            <Button onClick={handleNext} disabled={loading}>
              {loading ? <Spinner /> : "Next"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Title>Verify Code</Title>
            <InputGroup>
              <Label>Enter verification code</Label>
              <Input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter code"
              />
              {errors.code && <ErrorMessage>{errors.code}</ErrorMessage>}
            </InputGroup>
            <Button onClick={handleVerify} disabled={loading}>
              {loading ? <Spinner /> : "Verify"}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Title>Reset Password</Title>
            <InputGroup>
              <Label>New Password</Label>
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label>Confirm Password</Label>
              <InputWrapper>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />
                <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            <Button onClick={handleResetPassword} disabled={loading}>
              {loading ? <Spinner /> : "Reset Password"}
            </Button>

            {resetMessage && <SuccessMessage>{resetMessage}</SuccessMessage>}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          </>
        )}
      </FormSection>
    </PageWrapper>
  );
};

export default ForgotPassword;
