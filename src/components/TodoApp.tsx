"use client"

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import swal from 'sweetalert'


const TodoApp = () => {

    const [todos, setTodos] = useState([
        { id: 1, text: "Notes 1" },
        { id: 2, text: "Notes 2" },
        { id: 3, text: "Notes 3" },
    ])

    const [inputText , setInputText] = useState('')

    const addTodo = ()=>{
        if(inputText.trim() !== ""){
         const isExistingTodo = todos.some((todo)=> todo.text === inputText)
         if(isExistingTodo){
            swal({
                title: "Notice!",
                text: "The input text has already been selected",
                icon: "warning",
              });
              setInputText('')
              return;
         }
         const newTodo = {
            id: todos.length + 1,
            text: inputText
         }
         setTodos([...todos , newTodo])
         setInputText("");
        }
    }

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
            <div className="flex mb-0">
                <input value={inputText} onChange={(e)=>setInputText(e.target.value)} type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r" onClick={addTodo}>Add</button>
            </div>
            <ul className="mt-7">
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center border-b py-3">

                        {/* <>   
                <input type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2"/>
                <button className="bg-green-500 text-white px-4 py-2 rounded-r">Save</button>
                </> */}
                        <>
                            <span>{todo.text}</span>
                            <div className="flex gap-x-2">
                                <FaEdit size={20} className="text-blue-600 cursor-pointer" />
                                <FaTrash size={20} className="text-red-600 cursor-pointer" />
                            </div>
                        </>

                    </li>
                ))}

            </ul>
        </div>
    )
}

export default TodoApp;