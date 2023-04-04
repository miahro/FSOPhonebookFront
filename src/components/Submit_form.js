const Submit_form = ({name, number, newPerson, newNumber,onSubmit}) => {
return (
    <div>
    <form onSubmit={onSubmit}>
    <div> name: <input name='name' value={name} onChange={newPerson} label='name' required/></div>
    <div> number: <input name='number' value={number} onChange={newNumber} label='number' /></div>
    <div><button type="submit">add</button></div>
    </form>
    </div>
    )
}

export default Submit_form