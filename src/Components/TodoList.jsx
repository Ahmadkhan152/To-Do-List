import Header from './Header';
import '../css/TodoList.css';
import { CgMathPlus } from "react-icons/cg";
import ModalBox from './ModalBox';
import { useState } from 'react';

export default function TodoList() {
    const [showModalBox, setShowModalBox] = useState(false);
    function onCreate() {
        setShowModalBox(!showModalBox);
    }
    const modalBox = showModalBox && <ModalBox />
    return (
        <div className='todolist bg-sky-500/50'>
            <Header />
            {modalBox}
            <CgMathPlus onClick={onCreate} className='p-2 create-icon text-4xl absolute shadow-xl/40 hover:bg-blue-400' />
        </div>
    )
}