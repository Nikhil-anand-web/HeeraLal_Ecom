"use client"
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  const styles = {
    container: {
      marginBottom: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      backgroundColor: '#fff',
    },
    question: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      cursor: 'pointer',
      backgroundColor: isOpen ? '#f7f7f7' : '#fff',
      transition: 'background-color 0.3s ease',
    },
    button: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#007BFF',
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
    },
    answer: {
      maxHeight: isOpen ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.5s ease',
      padding: isOpen ? '20px' : '0 20px',
      backgroundColor: '#f9f9f9',
      color: '#555',
      fontSize: '16px',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.question} onClick={toggleAnswer}>
        {question}
        <button style={styles.button}>
          {isOpen ? '−' : '+'}
        </button>
      </div>
      <div style={styles.answer}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
