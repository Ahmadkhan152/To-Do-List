import { useState } from "react"
import '../css/ModalBox.css';

export default function ModalBox() {
    const [userInput, setUserInput] = useState('Enter Your Entry...');

    function handleOnChange(event) {
        setUserInput(event.target.value);
    }

    function handleOnSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="modal-box bg-cyan-700/80">
            <form className="create-entry h-full flex flex-col justify-center align-center" onSubmit={handleOnSubmit}>
                <input type="text" onChange={handleOnChange} value={userInput} name="entry"  />
                <button className="btn-save p-2 bg-white mt-6 mx-auto" type="submit">Save</button>
            </form>
        </div>
    )
}