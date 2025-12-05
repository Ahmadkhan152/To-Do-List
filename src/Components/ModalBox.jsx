import { useState } from "react";
import { CgSmile , CgSmileMouthOpen , CgClose , CgSmileSad } from "react-icons/cg";
import '../css/ModalBox.css';
import { cn } from "../lib/utils";


export default function ModalBox( {onToggle , addToDoItem , editItem, updateItem, showDescriptionItem} ) {
    
    const [todoTitle, setTodoTitle] = useState(editItem?.title || '');
    const [iconKey, setIconKey] = useState('smile');
    const [showError, setShowError] = useState(false);
    const [todoDescription, setTodoDescription] = useState(editItem?.description || ''); 
    const getCurrentDateTime = () => {
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0,16); 
    }
    const [todoDateTime, setTodoDateTime] = useState(editItem?.time || getCurrentDateTime());
    const [dueTodotime, setDueTodotime] = useState(editItem?.dueTime || null);

    function handleOnChangeDescription(event) {
        setTodoDescription(event.target.value);
    }

    function handleOnChangeTitle(event) {
        setTodoTitle(event.target.value);
    }
    
    function onHoverIcon(iconName) {
        setIconKey(iconName);
    }

    function onChangeDateTime(event) {
        setTodoDateTime(event.target.value);
    }

    function onDueToodo(event) {
        setDueTodotime(event.target.value);
    }
    
    function handleOnSubmit(event) {
        event.preventDefault();
        if (!todoTitle) {
            setIconKey('sad');
            setShowError(true);
        } else {
            console.log(dueTodotime);
            if (!editItem) {
                addToDoItem({title: todoTitle, description: todoDescription, time: todoDateTime, dueTime: dueTodotime})
            } else
                updateItem({id: editItem.id, title: todoTitle, description: todoDescription, time: todoDateTime, dueTime: dueTodotime})
            onToggle();
        }
    }
    
    const modalIcons = {
        smile: <CgSmile className="smiley-icon" onMouseEnter={() => onHoverIcon('smileOpen')} />,
        smileOpen: <CgSmileMouthOpen className="smiley-icon" onMouseLeave={() => onHoverIcon('smile')} />,
        close: <CgClose className="icon-close" />,
        sad: <CgSmileSad className="smiley-icon" />
    }
    const formIcon = modalIcons[iconKey];
    return (
        <div className="modal-box">
            <form className="create-entry h-full flex flex-col justify-center items-center" onSubmit={handleOnSubmit}>
                <CgClose className="icon-close" onMouseEnter={ () => onHoverIcon('sad') } onMouseLeave={ () => onHoverIcon('smile')} onClick={() => onToggle(false)}  />
                { formIcon }
                <input type="datetime-local" className="datetime-input" value={todoDateTime} onChange={onChangeDateTime} readOnly={showDescriptionItem} />
                <input type="datetime-local" className="datetime-input due-input" value={dueTodotime} onChange={onDueToodo} readOnly={showDescriptionItem} />
                <input className={ cn(showError && 'mb-0') } id="userEntryField" placeholder="Wanna Create Your Todo...!" type="text" onChange={handleOnChangeTitle} value={todoTitle} name="todo-name" readOnly={showDescriptionItem} maxLength={20} />
                { showError && <p className="text-red-500 error-text">Title cannot be empty!</p> }
                <textarea id="userTextArea" placeholder="Describle Your Todo..." type="text" onChange={handleOnChangeDescription} value={todoDescription} name="todo-description" rows={5} maxLength={40} readOnly={showDescriptionItem}/>
                {!showDescriptionItem && <button className="btn-save p-2 bg-white mt-6 mx-auto" type="submit">Create</button> }
            </form>
        </div>
    )
}