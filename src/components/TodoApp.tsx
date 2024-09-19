"use client"

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import swal from 'sweetalert'

import { useAutoAnimate } from '@formkit/auto-animate/react'


const TodoApp = () => {

    const [animationParent] = useAutoAnimate()

    const [todos, setTodos] = useState([
        { id: 1, text: "note 1" },
        { id: 2, text: "note 2" },
        { id: 3, text: "note 3" },
    ])

    const [inputText, setInputText] = useState("")
    const [editMode, setEditMode] = useState<number | null>(null)
    const [editedText, setEditedText] = useState("")


    // Add Todo
    function AddTodo() {
        if (inputText.trim() !== "") {
            const isExistingTodo = todos.some((todo) => todo.text === inputText)
            if (isExistingTodo) {

                // SweetAlert ***
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
            setTodos([...todos, newTodo])
            setInputText("");
        }
    }

    // Delete Todo
    function DeleteTodo(id: number) {
        const updateTodo = todos.filter(todo => todo.id !== id)
        setTodos(updateTodo);
    }


    // Edit Todo 
    function EditTodo(id:number){
        setEditMode(id)

        const todoToEdit = todos.find(todo=>todo.id == id)
        if(todoToEdit){
            setEditedText(todoToEdit.text)
        }
    }

    // Save Edited Todo
    function SaveEditedTodo(){
        const updatedTodos = todos.map(todo=> todo.id === editMode ? {...todo , text: editedText} : todo);
        setTodos(updatedTodos)
        swal({
            title: "Update",
            text: "Your input text has been successfully updated",
            icon: "success",
        });
        setEditMode(null)
    }

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
            <div className="flex mb-0">
                <input value={inputText} onChange={(e) => setInputText(e.target.value)} type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r" onClick={AddTodo}>Add</button>
            </div>
            <ul className="mt-7" ref={animationParent}>
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center border-b py-3">
                        {editMode === todo.id ? <>
                            <input value={editedText} onChange={(e) => setEditedText(e.target.value)} type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2" />
                            <button className="bg-green-500 text-white px-4 py-2 rounded-r" onClick={SaveEditedTodo}>Save</button>
                        </> : <>
                            <span>{todo.text}</span>
                            <div className="flex gap-x-2">
                                <FaEdit size={20} className="text-blue-600 cursor-pointer" onClick={() => EditTodo(todo.id)}/>
                                <FaTrash size={20} className="text-red-600 cursor-pointer" onClick={() => DeleteTodo(todo.id)} />
                            </div>
                        </>}
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default TodoApp;