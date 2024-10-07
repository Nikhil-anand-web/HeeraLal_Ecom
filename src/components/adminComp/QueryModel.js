import React, { useState } from 'react';

const ExpandableInfo = ({ name, email, message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleExpand = () => setIsOpen(!isOpen);

  // Limit the initial visible part of the message
  const visiblePartLength = 100; // Number of characters to show before truncating
  const isTruncated = message.length > visiblePartLength;
  const visibleMessage = isTruncated ? message.substring(0, visiblePartLength) + '...' : message;

  const styles = {
    container: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginBottom: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      padding: '10px',
      backgroundColor: isOpen ? '#f1f1f1' : '#fff',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    details: {
      maxHeight: isOpen ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.5s ease',
      paddingTop: isOpen ? '10px' : '0',
    },
    toggleButton: {
      fontSize: '24px',
      cursor: 'pointer',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
    },
    info: {
      margin: '10px 0',
      color: '#555',
      fontSize: '16px',
    },
    message: {
      margin: '10px 0',
      color: '#555',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    expandButton: {
      color: '#007BFF',
      cursor: 'pointer',
      display: 'inline-block',
      marginLeft: '5px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={toggleExpand}>
        <span>{name}</span>
        <span style={styles.toggleButton}>{isOpen ? '−' : '+'}</span>
      </div>
      <div style={styles.details}>
        {isOpen && (
          <div>
            <p style={styles.info}><strong>Name:</strong> {name}</p>
            <p style={styles.info}><strong>Email:</strong> {email}</p>
            <p style={styles.message}>
              <strong>Message:</strong> {isOpen ? message : visibleMessage}
              {isTruncated && !isOpen && (
                <span style={styles.expandButton} onClick={toggleExpand}>
                  Read More
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableInfo;
