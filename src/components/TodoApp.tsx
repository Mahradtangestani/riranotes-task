"use client"

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import swal from 'sweetalert';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const TodoApp = () => {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([
        { id: 1, text: "note 1", description: "description 1", createdAt: new Date(), deadline: new Date(Date.now() + 86400000) }, // Example deadline: 1 day from now
    ]);

    const [inputText, setInputText] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputDeadline, setInputDeadline] = useState<string>("");
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedDeadline, setEditedDeadline] = useState<string>("");

    // Add Todo
    function AddTodo() {
        if (inputText.trim() !== "") {
            const isExistingTodo = todos.some((todo) => todo.text === inputText);
            if (isExistingTodo) {
                swal({
                    title: "Notice!",
                    text: "The input text has already been selected",
                    icon: "warning",
                });
                setInputText('');
                return;
            }
            const newTodo = {
                id: todos.length + 1,
                text: inputText,
                description: inputDescription,
                createdAt: new Date(),  // تاریخ ثبت یادداشت
                deadline: new Date(inputDeadline),
            };
            setTodos([...todos, newTodo]);
            setInputText("");
            setInputDescription("");
            setInputDeadline("");
        }
    }

    // Delete Todo
    function DeleteTodo(id: number) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Edit Todo
    function EditTodo(id: number) {
        setEditMode(id);
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditedText(todoToEdit.text);
            setEditedDescription(todoToEdit.description);
            setEditedDeadline(todoToEdit.deadline.toISOString().split('T')[0]);
        }
    }

    // Save Edited Todo
    function SaveEditedTodo() {
        const updatedTodos = todos.map(todo =>
            todo.id === editMode ? { ...todo, text: editedText, description: editedDescription, deadline: new Date(editedDeadline) } : todo
        );
        setTodos(updatedTodos);
        swal({
            title: "Update",
            text: "Your input text has been successfully updated",
            icon: "success",
        });
        setEditMode(null);
    }

    // Function to determine background color based on deadline
    function getBackgroundColor(todo) {
        const currentTime = new Date().getTime();
        const deadlineTime = new Date(todo.deadline).getTime();
        const timeDifference = deadlineTime - currentTime;

        if (timeDifference < 0) {
            return "bg-red-100"; // Past deadline
        } else if (timeDifference < 86400000) { // Less than 1 day remaining
            return "bg-yellow-100";
        } else {
            return "bg-green-100";
        }
    }

    // Drag and Drop Handlers
    function handleDragStart(e: React.DragEvent<HTMLLIElement>, index: number) {
        e.dataTransfer.setData('text/plain', index.toString());
    }

    function handleDrop(e: React.DragEvent<HTMLLIElement>, index: number) {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (draggedIndex === index) return;

        const reorderedTodos = [...todos];
        const [movedTodo] = reorderedTodos.splice(draggedIndex, 1);
        reorderedTodos.splice(index, 0, movedTodo);
        setTodos(reorderedTodos);
    }

    function handleDragOver(e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
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
                    <input
                        value={inputDeadline}
                        onChange={(e) => setInputDeadline(e.target.value)}
                        type="date"
                        className="w-full border border-gray-300 px-4 py-2 rounded-l bg-slate-300 shadow-lg mt-2"
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
                {todos.map((todo, index) => (
                    <li
                        key={todo.id}
                        className={`flex flex-col border-b py-3 p-4 ${getBackgroundColor(todo)}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
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
                                    <input
                                        value={editedDeadline}
                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                        type="date"
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
                                    <span className="text-gray-500 mt-3 font-bold">{todo.description}</span>
                                    <span className="text-gray-400 mt-3">Created At: {new Date(todo.createdAt).toLocaleDateString()}</span>
                                    <span className="text-gray-400 mt-3">Deadline: {new Date(todo.deadline).toLocaleDateString()}</span>
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

            {/* Description colors */}
            <div className="mt-28 flex flex-col gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="h-4 w-4 rounded-full bg-yellow-400">
                    </div>
                    <p>Less than 1 day remaining</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="h-4 w-4 rounded-full bg-red-400">
                    </div>
                    <p>Past deadline</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="h-4 w-4 rounded-full bg-green-400">
                    </div>
                    <p>You have time</p>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;