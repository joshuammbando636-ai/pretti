import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MessageCircle, X } from 'lucide-react';

const WA_GREEN = '#25D366';
const WA_GREEN_DARK = '#1da851';

/* Gentle one-pass entrance for the panel — no continuous looping */
const popIn = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
  }
`;

const Panel = styled.div`
  width: 320px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  animation: ${popIn} 0.28s cubic-bezier(0.22, 1, 0.36, 1);
`;

const PanelHeader = styled.div`
  background: ${WA_GREEN};
  color: #ffffff;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  .title {
    font-family: inherit;
    font-weight: 600;
    font-size: 1.05rem;
    flex: 1;
  }

  .header-icon {
    width: 26px;
    height: 26px;
  }

  .close {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    opacity: 0.9;
    display: flex;
    padding: 2px;
    border-radius: 50%;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const PanelBody = styled.div`
  padding: 16px 14px 8px;

  .hint {
    font-size: 0.82rem;
    color: #6b7280;
    margin: 0 4px 12px;
  }
`;

const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    background: #e5e7eb;
  }

  .info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    color: #111827;
  }

  .role {
    font-size: 0.82rem;
    color: #374151;
  }

  .reply {
    font-size: 0.78rem;
    color: ${WA_GREEN_DARK};
    margin-top: 1px;
  }
`;

const PanelFooter = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 0.72rem;
  color: #9ca3af;
`;

const Fab = styled.button<{ $open: boolean }>`
  width: 65px;
  height: 65px;
  border: none;
  border-radius: 50%;
  background: ${p => (p.$open ? '#ffffff' : WA_GREEN)};
  color: ${p => (p.$open ? '#111827' : '#ffffff')};
  box-shadow: ${p =>
    p.$open
      ? '0 8px 22px rgba(0, 0, 0, 0.18), 0 0 0 2px ' + WA_GREEN
      : '0 6px 20px rgba(37, 211, 102, 0.45)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &:hover {
    transform: scale(1.06);
  }

  &:focus-visible {
    outline: 3px solid ${WA_GREEN_DARK};
    outline-offset: 3px;
  }

  svg {
    width: 34px;
    height: 34px;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  agentName?: string;
  agentRole?: string;
  agentAvatar?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in your services.",
  agentName = 'Prettiee Decor',
  agentRole = 'Event Decoration Team',
  agentAvatar = '/images/Pr.png',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Remove any non-numeric characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Wrapper>
      {isOpen && (
        <Panel role="dialog" aria-label="Chat with us on WhatsApp">
          <PanelHeader>
            <MessageCircle className="header-icon" />
            <span className="title">Chat with us</span>
            <button
              className="close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat panel"
            >
              <X size={20} />
            </button>
          </PanelHeader>

          <PanelBody>
            <p className="hint">Start a chat to get a fast reply</p>
            <ContactRow
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="avatar" src={agentAvatar} alt={agentName} />
              <span className="info">
                <span className="name">{agentName}</span>
                <span className="role">{agentRole}</span>
                <span className="reply">Typically replies within 1 hour</span>
              </span>
            </ContactRow>
          </PanelBody>

          <PanelFooter>Powered by WhatsApp</PanelFooter>
        </Panel>
      )}

      <Fab
        $open={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Fab>
    </Wrapper>
  );
};

export default WhatsAppButton;
