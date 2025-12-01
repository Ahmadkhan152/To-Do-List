import Header from './Header';
import '../css/TodoList.css';
import { CgMathPlus } from "react-icons/cg";
import ModalBox from './ModalBox';
import { useState, useEffect } from 'react';
import CreateListItems from './CreateListItems';
import FilterItems from './FilterItems';

export default function TodoList() {
    const [prev, setShowModalBox] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [todolist, setTodolist] = useState([]);
    const [id, setID] = useState(0);
    const [uiToDoList, setUiToDoList] = useState([]);
    const [showItemDescription, setShowItemDescription] = useState(false);

    const saveList = (list) => {
        setTodolist(list);
        setUiToDoList(list);
        localStorage.setItem('TodoList', JSON.stringify(list));
    };
    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem('TodoList') || '[]');
        const lastItem = Array.isArray(allData) ? allData[allData.length - 1] : null;
        const data = localStorage.getItem('TodoList');
        if (data) {
            setTodolist(JSON.parse(data));
            setUiToDoList(JSON.parse(data));
            if (lastItem)
                setID(lastItem.id + 1);
        }
    }, []);

    const itemCompleted = (itemID) => {
        const allData = JSON.parse(localStorage.getItem('TodoList') || '[]');
        let data = allData.map((item) => {
            if (item.id === itemID)
                item.completed = !item.completed;
            return item;
        })
        setTodolist(data);
        setUiToDoList(data);
        localStorage.setItem('TodoList', JSON.stringify(data));
    }

    const getFilterValues = (filterKey) => {
        if (filterKey === 'all') {
            setUiToDoList([...todolist]);
        }
        else if (filterKey === 'completed') {
            const filteredList = todolist.filter((item) => item.completed)
            setUiToDoList(filteredList);
        }
        else if (filterKey === 'pending') {
            const filteredList = todolist.filter((item) => !item.completed)
            setUiToDoList(filteredList);
        }
    }



    const onUpdateItem = ( {id, title, description} ) => {
        const updatedList = todolist.map((item) => item.id === id ? {id, title, description} : item );
        saveList(updatedList);
    }

    const onEditItem = ( todoItem, showDescriptionItem ) => {
        setEditItem(todoItem);
        if (showDescriptionItem)
            setShowItemDescription(true);
        else
            setShowItemDescription(false);
        onToggle();
    }


    const onDeleteItem = ( itemID ) => {
        const updatedList = todolist.filter((item) => item.id !== itemID)
        saveList(updatedList);
    }

    const addToDoItem = ({title, description}) => {
        saveList([...todolist, {id, title, description, completed: false}]);
        setID(id + 1);
    }
    function onToggle() {
        setShowModalBox(!prev);
        if (editItem)
            setEditItem(null);
        if (showItemDescription)
            setShowItemDescription(false)
    }

    return (
        <div className='todolist'>
            <Header />
            <div className='main-container'>
                <div className='todolist-container'>
                    <div className='todolist-header mb-6 flex items-center justify-between'>
                        <div className='todolist-header flex flex-wrap items-center'>
                            <h3 className='text-white tracking-[.1em]'>Items: {uiToDoList.length}</h3>
                            <h3 className='text-white tracking-[.1em] ml-3'>Todo Items: {uiToDoList.filter(item => item.completed !== true).length}</h3>
                            <h3 className='text-white tracking-[.1em] ml-3'>Completed: {uiToDoList.filter(item => item.completed === true).length}</h3>
                        </div>
                        <div className='filter-lists'>
                            <FilterItems getFilterValues={getFilterValues} />
                        </div>
                    </div>
                    <CreateListItems itemCompleted = {itemCompleted} onEditItem={onEditItem} todoList={uiToDoList} onDeleteItem = {onDeleteItem} />
                </div>
                {prev && <ModalBox onToggle={onToggle} addToDoItem={addToDoItem} editItem={editItem} updateItem = {onUpdateItem} showDescriptionItem={showItemDescription} /> }
                <CgMathPlus style={prev ? {transform: 'rotate(220deg)'} : {}} onClick={onToggle} className='p-2 create-icon text-4xl absolute shadow-xl/40' />
            </div>
        </div>
    )
}