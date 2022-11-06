import React, { Component } from 'react';
import styles from './gameboard.css';
import Card from '../card/Card';

import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

const Gameboard = (props) => {

    const [gameOn, setGameOn] = React.useState(true);
    const [rightAnswers, setRightAnswers] = React.useState([]);
    const [totalPoints, setTotalPoints] = React.useState([]);
    const [isMobile, setIsMobile] = React.useState(false)
 
    //Handle if mobile device(change from vertical to horizotaldrag)
    const handleResize = () => {
    if (window.innerWidth < 1000) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
    }
    React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    })


    
    // Updates the list after dragging and checks so its in a droppzone
    function handleOnDragEnd(result) {
        if(!result.destination) return;
        const newPerson = Array.from(props.persons);
        const [draggedItem] = newPerson.splice(result.source.index, 1);
        newPerson.splice(result.destination.index, 0, draggedItem);
        props.setPersons(newPerson);
    }

    function checkTimeline(props) {        
        // Change Game status to over
        setGameOn(false);
        // Get the correct order
        const correctBirthOrder = [...props].sort((a, b) => a.born - b.born);        
        // Get the rightly placed persons and count points
        let correct = [];
        let points = 0;  
        
        props.map((person, index) => {
            if (person.id === correctBirthOrder[index].id) {
                correct.push(person)
                points += 1000;
            }
            else {
                if (person.id > correctBirthOrder[index].id){
                    let removePoints = (person.id - correctBirthOrder[index].id) * 10;
                    points = points - removePoints                    
                }
                else {
                    let removePoints = (correctBirthOrder[index].id - person.id) * 10;
                    points = points - removePoints
                }
            }     
        }) 
        // Only returns the Persons the player got right
        setRightAnswers(correct);
        setTotalPoints(points);
    }

  
  return (
    <div className='boardcontainer'>
        <div className='boardInfo'>
            <h3>Past</h3><h2>Timeline Direction</h2><h3>Present</h3>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>      
            <Droppable droppableId="unordedZone" direction={isMobile ?"vertical" : "horizontal"}> 
                {(provided, snapshot) => (          
                    <div className="droppZone" ref={provided.innerRef} {...provided.droppableProps}>       
                        {props.persons.map(({id, name, born}, index) => 
                        <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                            {(provided) => (
                            <div className='cardspace' ref={provided.innerRef} 
                                {...provided.dragHandleProps} {...gameOn && provided.draggableProps}>
                                <Card id={id} name={name} born={born} gameOn={gameOn} rights={rightAnswers}/>                                               
                            </div>
                            )}
                        </Draggable>
                        )}
                        {provided.placeholder}
                    </div>  
                )}            
            </Droppable>            
        </DragDropContext>
        {gameOn ?
            <button id="finishBtn" className='btn' onClick={() => checkTimeline(props.persons)}>Lock in<br></br> Timeline</button>
        :   
            <div>
                <h3>You Got</h3>
                <h1>{totalPoints}</h1>
                <h3>Points</h3>
                <p>(Get 10 000 points for perfect score!)</p>
                <button id="newgameBtn" className='btn' onClick={() => window.location.reload()}>New Game?</button>
            </div>
        }
    </div>
    
  );
}

export default Gameboard;