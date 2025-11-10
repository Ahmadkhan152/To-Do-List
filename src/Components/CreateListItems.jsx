import ListItem from "./ListItem"

export default function CreateListItems( { todoList, onEditItem , onDeleteItem } ) {

    const renderedListItems = todoList.map( (item) => {
        return <ListItem key={item.id} todoItem={item} onEditItem = {onEditItem} onDeleteItem={onDeleteItem} />
    } );

    return <ul className="flex items-center justify-center flex-wrap">{renderedListItems}</ul>
}