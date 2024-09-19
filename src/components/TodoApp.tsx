"use client"

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import swal from 'sweetalert'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TodoApp = () => {
    const [animationParent] = useAutoAnimate()
    const [todos, setTodos] = useState([
        { id: 1, text: "note 1", description: "description 1", date: new Date().toLocaleDateString() },
        { id: 2, text: "note 2", description: "description 2", date: new Date().toLocaleDateString() },
        { id: 3, text: "note 3", description: "description 3", date: new Date().toLocaleDateString() },
    ])

    const [inputText, setInputText] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [editMode, setEditMode] = useState<number | null>(null)
    const [editedText, setEditedText] = useState("")
    const [editedDescription, setEditedDescription] = useState("") 

    // Add Todo
    function AddTodo() {
        if (inputText.trim() !== "") {
            const isExistingTodo = todos.some((todo) => todo.text === inputText)
            if (isExistingTodo) {
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
                text: inputText,
                description: inputDescription,
                date: new Date().toLocaleDateString()
            }
            setTodos([...todos, newTodo])
            setInputText("")
            setInputDescription("")
        }
    }

    // Delete Todo
    function DeleteTodo(id: number) {
        const updateTodo = todos.filter(todo => todo.id !== id)
        setTodos(updateTodo);
    }

    // Edit Todo 
    function EditTodo(id: number) {
        setEditMode(id)
        const todoToEdit = todos.find(todo => todo.id === id)
        if (todoToEdit) {
            setEditedText(todoToEdit.text)
            setEditedDescription(todoToEdit.description)
        }
    }

    // Save Edited Todo
    function SaveEditedTodo() {
        const updatedTodos = todos.map(todo => 
            todo.id === editMode ? { ...todo, text: editedText, description: editedDescription } : todo
        );
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
                <div className="flex flex-col w-full">
                   <input 
                       value={inputText} 
                       onChange={(e) => setInputText(e.target.value)} 
                       type="text" 
                       placeholder="Type here..." 
                       className="w-full border border-gray-300 rounded-l px-4 py-2" 
                   />
                   <input 
                       value={inputDescription} 
                       onChange={(e) => setInputDescription(e.target.value)} 
                       type="text" 
                       placeholder="Description..." 
                       className="w-full border border-gray-300 px-4 py-2 rounded-l bg-slate-300 shadow-lg" 
                   />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-r h-10" 
                    onClick={AddTodo}
                >
                    Add
                </button>
            </div>
            <ul className="mt-7" ref={animationParent}>
                {todos.map(todo => (
                    <li key={todo.id} className="flex flex-col border-b py-3">
                        {editMode === todo.id ? (
                            <div className="flex justify-between">
                                <div className="flex flex-col w-full">
                                    <input 
                                        value={editedText} 
                                        onChange={(e) => setEditedText(e.target.value)} 
                                        type="text" 
                                        placeholder="Type here..." 
                                        className="w-full border border-gray-300 px-4 py-2 rounded-l" 
                                    />
                                    <input 
                                        value={editedDescription} 
                                        onChange={(e) => setEditedDescription(e.target.value)} 
                                        type="text" 
                                        placeholder="Description..." 
                                        className="w-full border border-gray-300 px-4 py-2 mb-2 rounded-l bg-slate-300 shadow-lg" 
                                    />
                                </div>
                                <button 
                                    className="bg-green-500 text-white h-10 px-4 py-2 rounded-r" 
                                    onClick={SaveEditedTodo}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                   <span className="font-bold">{todo.text}</span>
                                   <span className="text-gray-500 mt-3">{todo.description}</span>
                                   <span className="text-gray-400 mt-1 text-sm">Created on: {todo.date}</span>
                                </div>
                                <div className="flex gap-x-2 mt-2">
                                    <FaEdit 
                                        size={20} 
                                        className="text-blue-600 cursor-pointer" 
                                        onClick={() => EditTodo(todo.id)}
                                    />
                                    <FaTrash 
                                        size={20} 
                                        className="text-red-600 cursor-pointer" 
                                        onClick={() => DeleteTodo(todo.id)} 
                                    />
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoApp;