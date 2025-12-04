import "../css/ListItem.css";
import { useState } from "react";
import { cn } from "../lib/utils";
import { CgClose , CgPen } from "react-icons/cg";
export default function ListItem( { todoItem, onEditItem, onDeleteItem, itemCompleted } ) {
    const {title, description} = todoItem;
    const [taskCompleted, setTaskCompleted] = useState(todoItem.completed);
    const handleOnChange = () => {
        setTaskCompleted(!taskCompleted);
        itemCompleted(todoItem.id);
    }
    let hours = todoItem.time && todoItem.time.slice(11,13);
    let updatedTime = null;
    if (todoItem.time) {
        if (parseInt(hours) > 12) {
            hours = parseInt(hours);
            hours = (hours % 12);
            hours = hours.toString();
            updatedTime = todoItem.time.slice(0,10) + " " + hours + " " + todoItem.time.slice(13) + " PM";
        } else {
            updatedTime = todoItem.time.slice(0,10) + " " + hours + " " + todoItem.time.slice(13) + " AM";
        }
    }
    return (
        <li className={cn("card h-full flex flex-col justify-center items-center relative", taskCompleted && "completed")}>
            <input onChange={ handleOnChange } type="checkbox" name="complete" className="complete-checkbox" checked={taskCompleted} />
            <CgClose className="remove-item" onClick={() => onDeleteItem(todoItem.id)} />
            {(!taskCompleted && <CgPen className="edit-item" onClick={ () => onEditItem( todoItem ) } /> )}
            <h3>{ title }</h3>
            { description && description.length > 10 ? <p className="hover:cursor-pointer" onClick={ () => onEditItem( todoItem, true ) }>{description.slice(0, 10) + '...'}</p> : <p>{description}</p> }
            { updatedTime && <p className="date-time">{ updatedTime }</p> }
        </li>
    )
}