import React from 'react';

const WhatsAppChannelLink = () => {
  const whatsappLink = process.env.WHATSAPP_CHAN; // Replace with your channel link

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
      <button style={{
        backgroundColor: '#25D366',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        border:"none"
      }}>
        <i className="fab fa-whatsapp"></i> Follow us
      </button>
    </a>
  );
};

export default WhatsAppChannelLink;
