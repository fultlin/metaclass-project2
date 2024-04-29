const TypeDropDown = ({ onChange }: any) => {

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        onChange(e.target.value)
        console.log(e.target.value)
    }

    return (
        <select name="Enter type" id="" className="search__drop" onChange={handleTypeChange}>
            <option value="all" defaultValue={'all'}>All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="forks">forks</option>
            <option value="sources">sources</option>
            <option value="member">member</option>
        </select>
    )
}

export default TypeDropDown