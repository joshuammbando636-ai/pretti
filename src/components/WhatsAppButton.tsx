import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MessageCircle } from 'lucide-react';

const smoothFlicker = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  }
  25% {
    opacity: 0.95;
    transform: scale(1.04);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
  }
  75% {
    opacity: 0.97;
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  }
`;

const WhatsAppLink = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 65px;
  height: 65px;
  background: #25D366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.15, 1); /* Super smooth easing */
  animation: ${smoothFlicker} 3s ease-in-out infinite;
  will-change: transform, box-shadow; /* Optimizes performance */

  &:hover {
    animation: none; /* Stops flicker on hover */
    transform: scale(1.08); /* Very subtle scale */
    box-shadow: 0 12px 30px rgba(37, 211, 102, 0.4); /* Softer shadow */
    background: #20b859; /* Slightly darker green */
    transition: all 0.6s cubic-bezier(0.25, 0.1, 0.15, 1); /* Even slower on hover */
  }

  svg {
    width: 35px;
    height: 35px;
    transition: transform 0.5s ease;
  }

  &:hover svg {
    transform: rotate(3deg); /* Very subtle rotation */
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 55px;
    height: 55px;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  /* Small mobile styles */
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: 15px;
    right: 15px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = "Hello! I'm interested in your services." 
}) => {
  // Remove any non-numeric characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <WhatsAppLink 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle />
    </WhatsAppLink>
  );
};

export default WhatsAppButton;