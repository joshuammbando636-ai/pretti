import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { theme } from '../../styles/theme';

/* ── Animations ─────────────────────────────────────────────────────────────── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pop = keyframes`
  0%   { transform: scale(0); }
  60%  { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

/* ── Layout ─────────────────────────────────────────────────────────────────── */
const Page = styled.section`
  padding: ${theme.spacing.xxlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  display: flex;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.large} ${theme.spacing.medium};
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  width: 100%;
  max-width: 1000px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

/* ── Left: branded info panel ───────────────────────────────────────────────── */
const InfoPanel = styled.div`
  position: relative;
  overflow: hidden;
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xlarge};
  display: flex;
  flex-direction: column;

  /* soft decorative circles */
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }
  &::before {
    width: 200px;
    height: 200px;
    top: -70px;
    right: -60px;
  }
  &::after {
    width: 140px;
    height: 140px;
    bottom: -50px;
    left: -40px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.large};
  }
`;

const InfoTitle = styled.h1`
  position: relative;
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: ${theme.spacing.small};
`;

const InfoText = styled.p`
  position: relative;
  font-family: ${theme.fonts.body};
  font-size: 0.98rem;
  line-height: 1.6;
  opacity: 0.92;
  margin-bottom: ${theme.spacing.large};
`;

const ContactList = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
  margin-top: auto;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;

  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  .icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span.label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.75;
    margin-bottom: 1px;
  }
`;

/* ── Right: form panel ──────────────────────────────────────────────────────── */
const FormPanel = styled.div`
  padding: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.large};
  }
`;

const FormHeading = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  color: ${theme.colors.dark};
  margin-bottom: 4px;
`;

const FormSub = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.9rem;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.large};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  text-align: left;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${theme.colors.dark};
  font-weight: 600;
  font-size: 0.85rem;
  font-family: ${theme.fonts.body};
  transition: color 0.25s ease;

  ${FormGroup}:focus-within & {
    color: ${theme.colors.primary};
  }
`;

const fieldStyles = `
  width: 100%;
  padding: 12px 14px;
  border-radius: ${theme.borderRadius.medium};
  border: 1.5px solid ${theme.colors.grayLight};
  font-size: 0.95rem;
  font-family: ${theme.fonts.body};
  background: ${theme.colors.light};
  color: ${theme.colors.dark};
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &::placeholder {
    color: ${theme.colors.gray};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.white};
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}1f;
  }
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Select = styled.select`
  ${fieldStyles}
  cursor: pointer;
`;

const TextArea = styled.textarea`
  ${fieldStyles}
  resize: vertical;
  min-height: 120px;
`;

const SubmitButton = styled.button`
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 14px 25px;
  border-radius: ${theme.borderRadius.round};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 16px ${theme.colors.primary}30;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px ${theme.colors.primary}40;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spin {
    animation: ${spin} 0.9s linear infinite;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.xlarge} ${theme.spacing.medium};
  animation: ${fadeIn} 0.4s ease;

  .success-icon {
    color: ${theme.colors.success};
    margin-bottom: ${theme.spacing.medium};
    animation: ${pop} 0.5s ease;
  }

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: 1.6rem;
    color: ${theme.colors.dark};
    margin-bottom: 8px;
  }

  p {
    font-family: ${theme.fonts.body};
    font-size: 0.95rem;
    color: ${theme.colors.textLight};
    margin-bottom: 4px;
  }
`;

const ErrorMessage = styled.small`
  color: ${theme.colors.danger};
  font-size: 0.8rem;
  margin-top: 4px;
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
      <Page>
        <Card>
          <InfoPanel>
            <InfoTitle>Let's create something beautiful</InfoTitle>
            <InfoText>
              Tell us about your event and we'll get back to you within 24 hours with
              ideas and a free quote.
            </InfoText>

            <ContactList>
              <ContactItem>
                <span className="icon"><Phone size={18} /></span>
                <span>
                  <span className="label">Call / WhatsApp</span>
                  <a href="tel:+255672715657">+255 672 715 657</a>
                </span>
              </ContactItem>
              <ContactItem>
                <span className="icon"><Mail size={18} /></span>
                <span>
                  <span className="label">Email</span>
                  <a href="mailto:info@preetiedecor.com">info@preetiedecor.com</a>
                </span>
              </ContactItem>
              <ContactItem>
                <span className="icon"><MapPin size={18} /></span>
                <span>
                  <span className="label">Location</span>
                  Msasani, Dar es Salaam, Tanzania
                </span>
              </ContactItem>
              <ContactItem>
                <span className="icon"><Clock size={18} /></span>
                <span>
                  <span className="label">Hours</span>
                  Mon – Sat, 9:00 AM – 6:00 PM
                </span>
              </ContactItem>
            </ContactList>
          </InfoPanel>

          <FormPanel>
            {isSubmitted ? (
              <SuccessMessage>
                <CheckCircle2 className="success-icon" size={64} />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully.</p>
                <p>We'll get back to you within 24 hours.</p>
              </SuccessMessage>
            ) : (
              <>
                <FormHeading>Send us a message</FormHeading>
                <FormSub>We'd love to hear about your event.</FormSub>

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

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Loader2 className="spin" size={18} />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </SubmitButton>
                </Form>
              </>
            )}
          </FormPanel>
        </Card>
      </Page>
    </>
  );
};

export default ContactPage;
