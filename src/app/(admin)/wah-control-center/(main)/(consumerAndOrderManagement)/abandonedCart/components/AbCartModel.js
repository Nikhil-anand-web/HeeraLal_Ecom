import Link from 'next/link';
import React from 'react';
// Assuming you're using React Router

const AbCartModel = ({ email, mobile,  firstName, lastName, goTo }) => {
  return (
    <div style={styles.thumbnailContainer}>
      <div style={styles.field}><strong>First Name:</strong> {firstName}</div>
      <div style={styles.field}><strong>Last Name:</strong> {lastName}</div>
      <div style={styles.field}><strong>Email:</strong> {email}</div>
      <div style={styles.field}><strong>Mobile:</strong> {mobile}</div>
     
      {goTo && (
        <Link href={goTo} style={styles.link}>
          Go to details
        </Link>
      )}
    </div>
  );
};

const styles = {
  thumbnailContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  field: {
    margin: '0 15px',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    marginLeft: 'auto', // Ensures the link stays at the far right
    fontWeight: 'bold'
  }
};

export default AbCartModel;
