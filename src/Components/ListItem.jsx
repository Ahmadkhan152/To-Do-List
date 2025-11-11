import "../css/ListItem.css";
import { useState } from "react";
import { CgClose , CgPen } from "react-icons/cg";
export default function ListItem( { todoItem, onEditItem, onDeleteItem } ) {
    const {title, description} = todoItem;
    const [taskCompleted, setTaskCompleted] = useState(false);
    return (
        <li className="card h-full flex flex-col justify-center items-center relative">
            <input onChange={() => setTaskCompleted(!taskCompleted)} type="checkbox" name="complete" className="complete-checkbox" checked={taskCompleted} />
            <CgClose className="remove-item" onClick={() => onDeleteItem(todoItem.id)} />
            <CgPen className="edit-item" onClick={ () => onEditItem( todoItem ) } />
            <h3>{ title }</h3>
            { description && description.length > 10 ? <p className="hover:cursor-pointer" onClick={ () => onEditItem( todoItem, true ) }>{description.slice(0, 10) + '...'}</p> : <p>{description}</p> }
        </li>
    )
}