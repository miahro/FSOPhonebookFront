
import Person from './Person'

const Persons = (props) => {
    console.log('in component Persons',props)
    
    return (
        <>
            {props.persons.map(person => 
                <Person key={person.id} click={props.click} id={person.id} name={person.name} number={person.number} />                
                ) }
        </>
    )
}

export default Persons