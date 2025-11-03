import Header from './Header';
import '../css/TodoList.css';
import { CgMathPlus } from "react-icons/cg";
import ModalBox from './ModalBox';
import { useState, useEffect } from 'react';
import CreateListItems from './CreateListItems';

export default function TodoList() {
    const [showModalBox, setShowModalBox] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [todolist, setTodolist] = useState([]);
    const [id, setID] = useState(0);

    useEffect(() => {
        const data = localStorage.getItem('TodoList');
        if (data)
            setTodolist(JSON.parse(data));
    }, []);

    
    const onUpdateItem = ( {id, title, description} ) => {
        const updatedList = [...todolist.slice(0, id), { id, title, description }, ...todolist.slice(id + 1)];
        setTodolist(updatedList);
        localStorage.setItem('TodoList', JSON.stringify(updatedList));
    }

    const onEditItem = ( todoItem ) => {
        setEditItem(todoItem);
        onCreate();
    }

    const addToDoItem = ({title, description}) => {
        setTodolist([...todolist, {id , title , description}]);
        localStorage.setItem('TodoList', JSON.stringify([...todolist, {id, title, description}]));
        setID(id + 1);
    }
    function onCreate() {
        setShowModalBox(!showModalBox);
    }
    return (
        <div className='todolist bg-sky-500/50'>
            <Header />
            <CreateListItems onEditItem={onEditItem} todoList={todolist} />
            {showModalBox && ( editItem === null ? <ModalBox onCreate={onCreate} addToDoItem={addToDoItem} /> : <ModalBox onCreate={onCreate} editItem={editItem} updateItem = {onUpdateItem} /> )}
            <CgMathPlus onClick={onCreate} className='p-2 create-icon text-4xl absolute shadow-xl/40 hover:bg-blue-400' />
        </div>
    )
}