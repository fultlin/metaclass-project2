import React, { ChangeEvent, useCallback } from "react"

const TypeDropDown = React.memo(({ onChange }: any) => {

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onChange(selectedValue)
        console.log(selectedValue)
      };

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
})

export default TypeDropDown