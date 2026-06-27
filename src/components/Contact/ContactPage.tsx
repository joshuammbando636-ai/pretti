import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

// Additional animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const Section = styled.section`
  max-width: 650px;
  margin: 40px auto;
  padding: 30px 25px;
  background: ${theme.gradients.light};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.card};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${theme.gradients.primary};
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 20px 15px;
    padding: 25px 20px;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 5px;
  position: relative;
  display: inline-block;
  font-family: ${theme.fonts.heading};
  animation: ${fadeInUp} 0.6s ease;
  font-weight: 600;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${theme.gradients.primary};
    margin: 10px auto 0;
    border-radius: ${theme.borderRadius.round};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textLight};
  margin-bottom: 25px;
  font-style: italic;
  animation: ${fadeInUp} 0.6s ease 0.2s both;
  font-family: ${theme.fonts.body};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: ${fadeInUp} 0.6s ease 0.4s both;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0;
  text-align: left;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${theme.colors.dark};
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  font-family: ${theme.fonts.body};

  ${FormGroup}:focus-within & {
    color: ${theme.colors.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${theme.borderRadius.medium};
  border: 2px solid ${theme.colors.grayLight};
  font-size: 0.95rem;
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  background: ${theme.colors.white};

  &:hover {
    border-color: ${theme.colors.secondary};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.gray};
    font-style: italic;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${theme.borderRadius.medium};
  border: 2px solid ${theme.colors.grayLight};
  font-size: 0.95rem;
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  background: ${theme.colors.white};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.secondary};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${theme.borderRadius.medium};
  border: 2px solid ${theme.colors.grayLight};
  font-size: 0.95rem;
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  background: ${theme.colors.white};

  &:hover {
    border-color: ${theme.colors.secondary};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.gray};
    font-style: italic;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button<{ isSubmitting?: boolean }>`
  background: ${theme.gradients.primary};
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: ${theme.borderRadius.round};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.body};
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 16px ${theme.colors.primary}30;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px ${theme.colors.primary}40;

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    animation: ${props => props.isSubmitting ? pulse : 'none'} 1.5s infinite;
  }
`;

const SuccessMessage = styled.div`
  background: ${theme.gradients.secondary};
  color: white;
  padding: 30px 25px;
  border-radius: ${theme.borderRadius.large};
  text-align: center;
  animation: ${fadeIn} 0.5s ease;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    font-family: ${theme.fonts.heading};
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 15px;
    font-family: ${theme.fonts.body};
  }

  .success-icon {
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 15px;
    animation: ${pulse} 2s infinite;
  }
`;

const ErrorMessage = styled.small`
  color: ${theme.colors.danger};
  font-size: 0.8rem;
  margin-top: 3px;
  display: block;
  text-align: left;
  font-family: ${theme.fonts.body};
`;

const RequiredStar = styled.span`
  color: ${theme.colors.primary};
  margin-left: 3px;
`;

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit error when user types
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          eventType: '', 
          message: '' 
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Preetie Decor | Get a Quote for Your Event in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Ready to plan your dream event? Contact Preetie Decor in Dar es Salaam, Tanzania for wedding decorations, birthday setups, and corporate event styling. Call +255 672 715 657 or email info@preetiedecor.com for a free quote." />
        <meta name="keywords" content="contact Preetie Decor, event decoration quote Dar es Salaam, wedding decor inquiry Tanzania, party decoration services Msasani, book event stylist, corporate event contact, birthday decoration quote" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
      </Helmet>
      <Section>
        <Title>Contact Us</Title>
        <Subtitle>We'd love to hear from you</Subtitle>
        
        {isSubmitted ? (
          <SuccessMessage>
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully.</p>
            <p>We'll get back to you within 24 hours.</p>
          </SuccessMessage>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">
                  Name <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Harpreet Kaur"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">
                  Email <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="harpreet@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+255 672 715 657"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
              >
                <option value="">Select an event type</option>
                <option value="wedding">💍 Wedding</option>
                <option value="birthday">🎂 Birthday</option>
                <option value="bridal">👰 Bridal Shower</option>
                <option value="corporate">💼 Corporate</option>
                <option value="anniversary">💝 Anniversary</option>
                <option value="other">✨ Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">
                Message <RequiredStar>*</RequiredStar>
              </Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event, vision, and requirements..."
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>

            {submitError && (
              <ErrorMessage style={{ textAlign: 'center', color: theme.colors.danger }}>
                {submitError}
              </ErrorMessage>
            )}

            <SubmitButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {isSubmitting ? '⏳' : '✈️'}
            </SubmitButton>
          </Form>
        )}
      </Section>
    </>
  );
};

export default ContactPage;