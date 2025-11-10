import { useState } from "react";
import { CgSmile , CgSmileMouthOpen , CgClose , CgSmileSad } from "react-icons/cg";
import '../css/ModalBox.css';


export default function ModalBox( {onToggle , addToDoItem , editItem, updateItem} ) {
    
    const [todoTitle, setTodoTitle] = useState(editItem?.title || '');
    const [iconKey, setIconKey] = useState('smile');
    const [todoDescription, setTodoDescription] = useState(editItem?.description || '');
    
    function handleOnChangeTitle(event) {
        setTodoTitle(event.target.value);
    }

    function handleOnChangeDescription(event) {
        setTodoDescription(event.target.value);
    }
    
    function onHoverIcon(iconName) {
        setIconKey(iconName);
    }
    
    function handleOnSubmit(event) {
        event.preventDefault();
        if (!editItem)
            addToDoItem({title: todoTitle, description: todoDescription})
        else
            updateItem({id: editItem.id, title: todoTitle, description: todoDescription})
        onToggle();
    }
    
    const modalIcons = {
        smile: <CgSmile className="smiley-icon" onMouseEnter={() => onHoverIcon('smileOpen')} />,
        smileOpen: <CgSmileMouthOpen className="smiley-icon" onMouseLeave={() => onHoverIcon('smile')} />,
        close: <CgClose className="icon-close" />,
        sad: <CgSmileSad className="smiley-icon" />
    }
    const formIcon = modalIcons[iconKey];
    return (
        <div className="modal-box bg-cyan-700/80">
            <form className="create-entry h-full flex flex-col justify-center items-center" onSubmit={handleOnSubmit}>
                <CgClose className="icon-close" onMouseEnter={ () => onHoverIcon('sad') } onMouseLeave={ () => onHoverIcon('smile')} onClick={() => onToggle(false)}  />
                { formIcon }
                <input id="userEntryField" placeholder="Wanna Create Your Todo...!" type="text" onChange={handleOnChangeTitle} value={todoTitle} name="todo-name"  />
                <textarea id="userTextArea" placeholder="Describle Your Todo..." type="text" onChange={handleOnChangeDescription} value={todoDescription} name="todo-description" rows={5} maxLength={40} />
                <button className="btn-save p-2 bg-white mt-6 mx-auto" type="submit">Create</button>
            </form>
        </div>
    )
}