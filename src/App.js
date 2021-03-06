import react, {useState, useEffect} from 'react';
import './App.css';
//inporting components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status , setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([]);
  //runs only once when we start the app
  useEffect(()=>{
    getLocalTodos();
  },[]);
  // effect
    useEffect(() => {
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);
  //functions
  const filterHandler = () => {
    switch(status){
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed === true));
      break;
    case 'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed === false));
      break;
    default:
      setFilteredTodos(todos);
      break;
    }
  }
  //save 
  const saveLocalTodos = () => {
      if (todos.length > 0) 
        localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoloc = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoloc);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>My Todo List </h1>
    </header>
    <Form 
      inputText={inputText}
      todos={todos}
      setTodos={setTodos}
      setInputText={setInputText}
      setStatus={setStatus}
      
    />
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/> 
    </div>
  );
}

export default App;
