import "../css/ListItem.css";
import { CgClose , CgPen } from "react-icons/cg";
export default function ListItem( { todoItem, onEditItem, onDeleteItem } ) {
    const {title, description} = todoItem;
    return (
        <li className="card h-full flex flex-col justify-center items-center relative">
            <CgClose className="remove-item" onClick={() => onDeleteItem(todoItem.id)} />
            <CgPen className="edit-item" onClick={ () => onEditItem( todoItem ) } />
            <h3>{ title }</h3>
            <p>{ description }</p>
        </li>
    )
}