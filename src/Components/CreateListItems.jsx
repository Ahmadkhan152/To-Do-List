import ListItem from "./ListItem"

export default function CreateListItems( { todoList, onEditItem } ) {

    const renderedListItems = todoList.map( (item) => {
        return <ListItem key={item.id} todoItem={item} onEditItem = {onEditItem} />
    } );

    return <ul className="flex items-center mt-10">{renderedListItems}</ul>
}