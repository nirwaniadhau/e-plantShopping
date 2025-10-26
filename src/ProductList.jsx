import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    
    // Get cart items from Redux store
    const cartItems = useSelector(state => {
        console.log('Redux State:', state);
        return state.cart?.items || [];
    });

    // Calculate total quantity of items in cart
    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const totalCartItems = calculateTotalQuantity();
    
    console.log('Cart Items:', cartItems);
    console.log('Total Cart Items:', totalCartItems);

    // ------------------ PLANT DATA ------------------
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: 15 },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: 12 },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: 18 },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: 20 },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: 17 },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: 14 }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                // Alternative Lavender

{ name: "Jasmine", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400", description: "Sweet fragrance, promotes relaxation.", cost: 18 },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: 15 },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: 12 },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: 14 },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Hyacinth is a beautiful flowering plant known for its fragrant.", cost: 22 }
            ]
        }
    ];

    // ------------------ HANDLERS ------------------
    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        console.log('🛒 Adding to cart:', product);
        // Dispatch addItem action to Redux store
        dispatch(addItem(product));
        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true,
        }));
        console.log('✅ Item added, new count should be:', totalCartItems + 1);
    };

    // ------------------ RENDER ------------------
    return (
        <div>
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Paradise Nursery Logo" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3>Paradise Nursery</h3>
                                <i>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="navbar-links">
                    <div><a href="#" onClick={handlePlantsClick}>Plants</a></div>
                    <div className="cart-wrapper">
                        <a href="#" onClick={handleCartClick}>
                            🛒
                        </a>
                        {totalCartItems > 0 && (
                            <span className="cart-badge">{totalCartItems}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* 🌿 Product Grid */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h1 className="plant_heading">{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <h3 className="product-title">{plant.name}</h3>
                                        <p className="product-cost">${plant.cost}</p>
                                        <p className="product-description">{plant.description}</p>
                                        <button
                                            className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;