import { cn } from "../../lib/utils";
import "../../css/custom-inputs/Radio.css"


export default function Radio( {children, checked, onChange, className} ) {
    return (
        <label className={cn(className, "radio-container inline-flex items-center justify-center")}>
            <input type="radio" className="btn-radio" checked = {checked} name="Priority" onChange={onChange} />
            <span className={cn("radioChecked")}></span>
            {children}
        </label>
    )
}