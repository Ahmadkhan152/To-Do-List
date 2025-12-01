import { useState } from "react";
import "../css/FilterItems.css";

export default function FilterItems( { getFilterValues } ) {
    const [filterKey, setFilterKey] = useState('all');
    function handleOnChange(event) {
        setFilterKey(event.target.value);
        getFilterValues(event.target.value);
    }

    return (
        <>
            <select className="filter-items" onChange = {handleOnChange} value={filterKey}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </>
    )
}