import calculateFinalPriceOfComboAndThumbnailArray from '@/lib/calculateFinalPriceOfComboAndThumbnailArray';
import React from 'react';

const ComboDetails = ({ data }) => {
  const { qty, combo } = data;
  const { name, productVarients, discountInPercent } = combo;

  const { totalMrp, actualPrice } = calculateFinalPriceOfComboAndThumbnailArray(combo)

 var total = (actualPrice * qty)
  // Inline styles
  const styles = {
    card: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'row', // Horizontal alignment
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    section: {
      flex: '1',
      padding: '0 16px',
    },
    comboName: {
      fontSize: '1.5rem',
      marginBottom: '12px',
    },
    productVarients: {
      listStyle: 'none',
      paddingLeft: '0',
      marginBottom: '12px',
    },
    varientItem: {
      marginBottom: '8px',
    },
    varientDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    discountInfo: {
      marginTop: '12px',
    },
  };

  return (
    <div style={styles.card}>
      {/* Combo Name and Quantity Section */}
      <div style={styles.section}>
        <h3 style={styles.comboName}>Combo: {name}</h3>
        <div>Quantity: {qty}</div>
      </div>

      {/* Product Variants Section */}
      <div style={styles.section}>
        <h5>Product Variants:</h5>
        <ul style={styles.productVarients}>
          {productVarients.map((varient, index) => (
            <li key={index} style={styles.varientItem}>
              <div style={styles.varientDetails}>
                <strong>{varient.product.name}</strong> MRP- ₹{varient.mrp}
                <span>Weight: {varient.weight}g</span>
                <span>Size: {varient.size}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Discount and Price Section */}
      <div style={styles.section}>
        <p>Discount: {discountInPercent}%</p>
        <p>Mrp of combo: ₹{totalMrp}</p>
        <p>Mrp After Discount: ₹{actualPrice.toFixed(2)}</p>
        <p>total: ₹{total.toPrecision(5)}</p>
      </div>
    </div>
  );
};

export default ComboDetails;
