import styles from './button.css';
import React, { Component } from 'react';

// The toggle buttons for the category
const Button = ({ text, id, activeCategory, setActiveCategory }) => {
    return (
        <> 
            <button
                id={id}
                className={activeCategory == id ? 'btn current' : 'btn'}
                onClick={() => setActiveCategory(id)}            >
                {text}
            </button>
        </>
    )
}

export default Button