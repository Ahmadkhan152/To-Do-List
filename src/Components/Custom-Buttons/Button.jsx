import { cn } from "../../lib/utils";

export default function Button({ children, className, type }) {
    return (
        <button type={type} className={cn(className)}>{children}</button>
    )
}