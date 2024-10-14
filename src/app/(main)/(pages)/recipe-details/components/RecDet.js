import DangerDiv from '@/components/DangerDiv';
import Link from 'next/link';
import React from 'react';

const RecDet = ({ recipe }) => {
    if (!recipe) {
        return <div>No recipe found</div>;
    }

    return (
        <div className="recipe-details-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Recipe Video */}
            {recipe.videoLink && (
                <div className="video-section" style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '20px' }}>{recipe.name}</h2>
                    <iframe
                        width="100%"
                        height="400"
                        src={recipe.videoLink}
                        title="Recipe Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '8px' }}
                    ></iframe>
                </div>
            )}
            <div style={{ marginTop: "20px" }}>

                <div style={{ display: "flex" }} className="social-list">
                    <DangerDiv htmlEl={recipe.brief} />


                </div>
            </div>
            {/* Ingredients Section */}
            <div className="ingredients-section" style={{ marginBottom: '30px', textAlign: 'left' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>Ingredients:</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} style={{ fontSize: '18px', marginBottom: '5px' }}>{ingredient + " "}{index !== recipe.ingredients.length - 1 && ","} </li>
                    ))}
                </ul>
            </div>
            {/* Products Section */}
            {recipe.products && recipe.products.length > 0 && (
                <div className="products-section" style={{ marginBottom: '30px', textAlign: 'left' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>Our Products:</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {recipe.products.map((product, index) => (
                            <Link href={`/product-details/${product.slug}`}>
                                <li key={index} style={{ fontSize: '18px', marginBottom: '5px', textDecoration: "underline" }}>{product.name + " "}{index !== recipe.products.length - 1 && ","}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}

            {/* Instructions Section */}
            <div className="instructions-section" style={{ marginBottom: '30px', textAlign: 'left' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>Instructions:</h3>
                <DangerDiv htmlEl={recipe.instructions} />
            </div>





        </div>
    );
};

export default RecDet;
