import {createContext , ReactNode} from "react";
import { useState , useContext } from "react"
export type ToDosProvideerprops = {
    children : ReactNode
}

export type Todo = {
    id : string;
    task : string;
    completed : boolean;
    createdAt : Date;
}

export type TodosContext = {
    todos:Todo[];
    handleAddToDo:(task:string)=> void;
    toggleTodoAsCompleted:(id:string)=>void;
    handleDeletetodo:(id:string)=>void;
}

export const todoContext = createContext<TodosContext | null>(null);

export const ToDosProvideer = ({children}:ToDosProvideerprops)=>{{

    const [todos , setTodos] = useState<Todo[]>(()=>{
        try {
            const newToDos = localStorage.getItem("todos")||"[]";
            return JSON.parse(newToDos) as Todo[]
        } catch (error) {
            return []
        }
    })
    const handleAddToDo = (task:string) =>{
        setTodos((prev)=>{
            const newToDos:Todo[] = [{
                id:Math.random().toString(),
                task:task,
                completed :false,
                createdAt:new Date()
            }, 

            ...prev
        ]
        // console.log(newToDos);
        // console.log("my prev" , prev)

        localStorage.setItem("todos" , JSON.stringify(newToDos))
        return newToDos;
    })
    }

    const toggleTodoAsCompleted = (id:string)=>{
        setTodos((prev)=>{
            let newToDos = prev.map((todo)=>{
                if(todo.id === id){
                return{...todo , completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos" , JSON.stringify(newToDos))

            return newToDos;
        })
    }
    const handleDeletetodo = (id:string)=>{
        setTodos((prev)=>{
            let newToDos = prev.filter((filterTodo)=> filterTodo.id !== id);
            localStorage.setItem("todos" , JSON.stringify(newToDos))

            return newToDos;
        })
    }
    return<todoContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeletetodo}}>
        {children}
        </todoContext.Provider>
}}

export const useTodos = () =>{
    const todoConsumer = useContext(todoContext);
    if(!todoConsumer){
        throw new Error("useTodos used outside the provider");
    }
    return todoConsumer
}