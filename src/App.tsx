import Todos from "./components/Todos"
import AddToDo from "./components/AddToDo"
import NavBar from "./components/NavBar"
import './App.css'
const App = () => {
  return (
    <main>
      <h1>
        TODO REACT + TYPESCRIPT
      </h1>
      <NavBar/> 
      <AddToDo/>
      <Todos/>
    </main>  
  )
}

export default App