const Filter_form = ({onFilterChange, filterValue}) => {
    return (
        <form >
            <div>filter shown with &nbsp;
                <input name='filter' value={filterValue} 
                onChange={onFilterChange} /></div>
        </form>
    )
}

export default Filter_form