import { useState } from "react";

const Todo = (props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    // delete todo
    const onDeleteTodoHandler = (event) => {
        event.stopPropagation();
        setIsDeleting(true);
        
        const todoRemoverHandler = () => {
            fetch("/remove", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: props.todo._id
                })
            }).then(res => {
                return res.json();
            }).then(response => {
                props.onDelete(true);
                return;
            }).catch(err => console.log(err));
        };
        setTimeout(todoRemoverHandler, 2000);
    };
    // on edit todo
    const onEditTodoHandler = (event) => {
        event.stopPropagation();
        props.editTodo({
            id: props.todo._id,
            text: props.todo.text,
            status: props.todo.status
        })
    };
    // on mark as done
    const onMarkAsDoneHandler = () => {
        if(props.todo.status !== "TODO"){
            return;
        }
        fetch("/mark", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: props.todo._id,
                text:props.todo.text, 
            })
        }).then(marked => {
            props.onDelete(true);
            return;
        }).catch(err => console.log(err));

    };
    return <div onClick={onMarkAsDoneHandler} className={`flex justify-between items-center w-full cursor-pointer border my-2 py-3 px-1 hover:bg-slate-200 ${props.todo.status === "DONE" ? "bg-[aliceblue]" : ""} transition duration-500 ease`}>
            <div className="max-w-[80%] overflow-x-clip h-max text-start">
                <div className="flex justify-between items-center gap-3"> 
                    <span>
                        <input type="radio" readOnly checked={props.todo.status === "TODO" ? false : true}/> 
                    </span>
                    <p className={`break-words ${props.todo.status === "DONE" ? "line-through" : ""}`}>{props.todo.text}</p> 
                </div>
            </div>
            <div>
                {props.todo.status === "TODO" && <button className="mr-3" onClick={onEditTodoHandler}>
                <i className="fa-solid fa-pen-to-square text-gray-600"></i>
                </button>}
            
                <button onClick={onDeleteTodoHandler}>
                    {isDeleting && <i className="fa-solid fa-spinner text-red-600 animate-spin"></i>}
                    {!isDeleting && <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i>}
                </button>
            </div>
        </div>
};

export default Todo;