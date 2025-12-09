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
    let dueHours = todoItem.dueTime && todoItem.dueTime.slice(11,13);
    let dueUpdatedTime = null;
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

    if (todoItem.dueTime) {
        if (parseInt(dueHours) > 12) {
            dueHours = parseInt(dueHours);
            dueHours = (dueHours % 12);
            dueHours = dueHours.toString();
            dueUpdatedTime = todoItem.dueTime.slice(0,10) + " " + dueHours + " " + todoItem.dueTime.slice(13) + " PM";
        } else {
            dueUpdatedTime = todoItem.dueTime.slice(0,10) + " " + dueHours + " " + todoItem.dueTime.slice(13) + " AM";
        }
    }

    function dueDateCal() {
        const today = new Date();
        const offset = today.getTimezoneOffset() * 60 * 1000;
        const localDate = new Date(today.getTime() - offset );
        {console.log('TIme Checking: ', todoItem.time, localDate.toISOString().slice(0,16))}
        return localDate.toISOString().slice(0,16); 
    }

    return (
        <li className={cn("card h-full flex flex-col justify-center items-center relative", taskCompleted && "completed", dueDateCal() >= todoItem.dueTime && "due-date-card", dueDateCal() < todoItem.time && "completed schedule-card flex items-center content-center")}>
            <input onChange={ handleOnChange } type="checkbox" name="complete" className="complete-checkbox" checked={taskCompleted} disabled={dueDateCal() < todoItem.time ? true : false} />
            <CgClose className="remove-item" onClick={() => onDeleteItem(todoItem.id)} />
            {(!taskCompleted && <CgPen className="edit-item" onClick={ () => onEditItem( todoItem ) } /> )}
            <h3>{ title }</h3>
            { description && description.length > 10 ? <p className="hover:cursor-pointer" onClick={ () => onEditItem( todoItem, true ) }>{description.slice(0, 10) + '...'}</p> : <p>{description}</p> }
            { dueUpdatedTime && <p className="date-time">{ dueUpdatedTime }</p> }
        </li>
    )
}