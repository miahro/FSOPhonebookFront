const Person = (props) => {
    console.log('in component Person ', props)
    return (
        <>
            {props.name} {props.number} &nbsp;
            <button onClick={props.click} > delete </button>
            <br></br>
        </>
    )


}

export default Person 