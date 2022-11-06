import styles from './card.css';
import React, { Component } from 'react';

const Card = (props) => {

    function rightOrWrong() {
        // Check if card is right or wrong and updates color(class) there after
        // only gets called if gameOn status changes
        let rightList = [];

        props.rights.map((id, index) => {
            rightList.push(id.id)
        })

        if (rightList.includes(props.id)) {
            return "right"
        }
        else {
            return "wrong"
        }
    }

    return (
        <div className={`card ${!props.gameOn && rightOrWrong(props)}`}>
            <h4 className={`born ${props.gameOn && 'hide'}`}>Born</h4>
            <h3 className={`born ${props.gameOn && 'hide'}`}>{props.born}</h3>
            <h2 className='name'>{props.name}</h2>   
         </div>         
    )
  }
  export default Card
