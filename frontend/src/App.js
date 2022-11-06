import React, { Component } from 'react';
import Header from './components/header/Header'
import Gamechoise from './components/gamechoise/Gamechoise'
import Gameboard from './components/gameboard/Gameboard';
import Awaitingstart from './components/awaitingstart/Awaitingstart';


const BASE_URL = 'http://127.0.0.1:8000/api'

function App() {
  const [categories, setCategories] = React.useState([]);
  const [persons, setPersons] = React.useState([]);
  const [category, setCategory] = React.useState(0);

  React.useEffect(function () {
    async function fetchData() {
      try {
        // fetching the data from api, before the page loaded
        const res_categories = await fetch(`${BASE_URL}/categorys`);
        const categories = await res_categories.json();     
        setCategories(categories);

        if (category) {
          const res_persons = await fetch(`${BASE_URL}/random/${category}`);
          const persons = await res_persons.json();
          setPersons(persons);
        }

      } catch (e) {
        console.log(e);
      }
    }    
    fetchData();    
  }, [category])

  return (
    <div className='container'>
      <Header />
      <Gamechoise categories={categories} setCategory={setCategory}/>
      {category ? 
        <Gameboard persons={persons} setPersons={setPersons} />
        : 
        <Awaitingstart />
      }

    </div>
  );
}

export default App;