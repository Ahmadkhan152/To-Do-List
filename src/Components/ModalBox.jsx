import { useState } from "react";
import { CgSmile , CgSmileMouthOpen , CgClose , CgSmileSad } from "react-icons/cg";
import '../css/ModalBox.css';

export default function ModalBox( {onCreate} ) {
    const [userInput, setUserInput] = useState('');
    const [changeIcon, setChangeIcon] = useState(false);

    function handleOnChange(event) {
        setUserInput(event.target.value);
    }

    function onHoverIcon() {
        setChangeIcon(!changeIcon);
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        onCreate(false);
    }

    let formIcon = changeIcon && <CgSmileMouthOpen className="smiley-icon" onMouseLeave = {() => onHoverIcon()} />
    if (!formIcon)
        formIcon = <CgSmile className="smiley-icon" onMouseEnter = {() => onHoverIcon()} />;

    return (
        <div className="modal-box bg-cyan-700/80">
            <form className="create-entry h-full flex flex-col justify-center items-center" onSubmit={handleOnSubmit}>
                <CgClose className="icon-close" onClick={() => onCreate(false)}  />
                { formIcon }
                <input id="userEntryField" placeholder="Wanna Create Your Todo...!" type="text" onChange={handleOnChange} value={userInput} name="entry"  />
                <button className="btn-save p-2 bg-white mt-6 mx-auto" type="submit">Create</button>
            </form>
        </div>
    )
}