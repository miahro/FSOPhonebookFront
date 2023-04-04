import { useState, useEffect } from 'react'
//import Persons from './components/Persons'
import Submit_form from './components/Submit_form'
import Filter_form from './components/Filter_form'
import personService from './services/persons'
//import axios from 'axios'
import './index.css'
import Success from './components/Success'
import Error from './components/Error'
import Person from './components/Person'

//const cors = require('cors')


const App = () => {

  const [persons, setPersons] = useState([

  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

//App.use('cors')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
    
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('newName ', newName)
    const found = persons.some(person => person.name === newName);
    console.log("test if found: ", found)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`))
              {
                const personObject = {
                  name : newName,
                  number: newNumber,
                  id : persons.filter((person)=>person.name === newName)[0].id
                }
                personService
                  .update(personObject.id, personObject)
                  .then(response => {
                    setPersons(persons.filter((person)=>person.id !==personObject.id).concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setActionMessage (`Updated ${newName}`)
                    setTimeout(()=> {
                      setActionMessage(null)
                    }, 3000)
                  })
              }
    }
    else {
      const personObject = {
        name : newName,
        number: newNumber,
        id : Math.max(persons.id)
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setActionMessage (`Added ${newName}`)
          setTimeout(()=> {
            setActionMessage(null)
          }, 3000)

        })
      }
  }

  const handleDelete = (id) => {
    console.log("in function handleDelete", {id})
    let error = false
    const target = persons.find(target => target.id === id)
    console.log('handleDelete', target.name)
    if (window.confirm(`Deletete ${target.name} ?`))
      personService
        .deleteItem(id)
        .then(() => {
          personService
             .getAll()
 
             .then(response=> {
               setPersons(response.data)
             console.log(response.data)
             setActionMessage (`Deleted ${target.name}`)
             setTimeout(()=> {
               setActionMessage(null)
             }, 3000)            
         })})
        .catch(error=> {
          console.log('trying to catch error here', error)
          console.log(error)
          setErrorMessage(`Information of ${target.name} has already been removed from server `)
          setTimeout(()=>{
            setErrorMessage(null)
          }, 5000)
          })
     
  }



  const handleNumberChange = (event) => {
    console.log(event.target.value)
    console.log("handleNumberChange", newNumber)
    setNewNumber(event.target.value)
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)    
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log('in Main filtered: ', persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={actionMessage}/>
      <Error message={errorMessage}/>
      <Filter_form 
        onFilterChange={handleFilter}
        filterValue={newFilter}
      />
      <h3>add a new</h3>
      <Submit_form 
        name={newName}
        number={newNumber}
        newPerson={handlePersonChange}
        newNumber={handleNumberChange}
        onSubmit={addPerson}
      />


      <h3>Numbers</h3>
      <>
            {personsToShow.map(person => 
               <Person click={() => handleDelete(person.id)} 
               key={person.id}
               id={person.id}
               name={person.name}
               number={person.number}
               />
                ) }
                                
        </> 
    
    </div>
  )
}

export default App