import styles from './gamechoise.css';
import Button from '../button/Button'
import React, { Component } from 'react';
        
const Gamechoise = (props) => {

    const [activeCategory, setActiveCategory] = React.useState(null)
    const [startgameCategory, setStartgameCategory] = React.useState(null)

    if (startgameCategory) {
        props.setCategory(startgameCategory)
    }

    return (
        <>
            <div className='choiseFrame' id="choise-cont">
                <h3>Choose Your Category</h3>
                <div className="category_row">
                    {props.categories.map(item => (
                        <Button text={item.category} id={item.id} key={item.id} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>            
                ))}
                </div>
                <button className={activeCategory ? 'btn startgame' : 'btn disabled'} onClick={() => setStartgameCategory(activeCategory)}>Start Game</button>

            </div>
        </>
    )
}

export default Gamechoise
