import Header from './Header';
import '../css/TodoList.css';
import { CgMathPlus } from "react-icons/cg";
import ModalBox from './ModalBox';
import { useState, useEffect } from 'react';
import CreateListItems from './CreateListItems';

export default function TodoList() {
    const [prev, setShowModalBox] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [todolist, setTodolist] = useState([]);
    const [id, setID] = useState(0);

    const saveList = (list) => {
        setTodolist(list);
        localStorage.setItem('TodoList', JSON.stringify(list));
    };
    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem('TodoList') || '[]');
        const lastItem = Array.isArray(allData) ? allData[allData.length - 1] : null;
        const data = localStorage.getItem('TodoList');
        if (data) {
            setTodolist(JSON.parse(data));
            if (lastItem)
                setID(lastItem.id + 1);
        }
    }, []);


    const onUpdateItem = ( {id, title, description} ) => {
        const updatedList = todolist.map((item) => item.id === id ? {id, title, description} : item );
        saveList(updatedList);
    }

    const onEditItem = ( todoItem, disableInputs ) => {
        setEditItem(todoItem);
        onToggle();
        if (disableInputs) {
            
        }
    }


    const onDeleteItem = ( id ) => {
        const updatedList = todolist.filter((item) => item.id !== id)
        saveList(updatedList)
    }

    const addToDoItem = ({title, description}) => {
        saveList([...todolist, {id, title, description}]);
        setID(id + 1);
    }
    function onToggle() {
        setShowModalBox(!prev);
        if (editItem)
            setEditItem(null);
    }
    return (
        <div className='todolist bg-sky-500/50'>
            <Header />
            <div className='main-container'>
                <div className='todolist-container bg-sky-500/75'>
                    <CreateListItems onEditItem={onEditItem} todoList={todolist} onDeleteItem = {onDeleteItem} />
                </div>
                {prev && ( editItem === null ? <ModalBox onToggle={onToggle} addToDoItem={addToDoItem} /> : <ModalBox onToggle={onToggle} editItem={editItem} updateItem = {onUpdateItem} /> )}
                <CgMathPlus style={prev ? {transform: 'rotate(220deg)'} : {}} onClick={onToggle} className='p-2 create-icon text-4xl absolute shadow-xl/40 hover:bg-sky-500/75' />
            </div>
        </div>
    )
}