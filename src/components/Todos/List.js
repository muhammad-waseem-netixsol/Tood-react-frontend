import Todo from "./Todo";

const List = props => {
  const onDeleteRender = (param) => {
    props.postDeleteTodo(param);
  };
  const editTodoHandler = todoObj => {
    props.todoEdit(todoObj);
  }; 

    return <div className="list w-full">
      <div className="flex justify-between items-center flex-col rounded-sm ">
        {props.todos.map(todo => <Todo todo={todo} key={Math.random()} onDelete={onDeleteRender} editTodo={editTodoHandler}/>)}
      </div>  
    </div>
};
export default List;