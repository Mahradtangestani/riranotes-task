import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


const TodoApp = ()=>{
    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
            <div className="flex mb-0">
                <input type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2"/>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r">Add</button>
            </div>
            <ul className="mt-7">
                <li className="flex justify-between items-center border-b py-3">

                 {/* <>   
                <input type="text" placeholder="Type here..." className="w-full border border-gray-300 rounded-l px-4 py-2"/>
                <button className="bg-green-500 text-white px-4 py-2 rounded-r">Save</button>
                </> */}
                   <>
                     <span>Todo 1</span>
                     <div className="flex gap-x-2">
                       <FaEdit size={20} className="text-blue-600 cursor-pointer"/>
                       <FaTrash size={20} className="text-red-600 cursor-pointer"/>
                     </div>
                   </> 
                    
                </li>
            </ul>
        </div>
    )
}

export default TodoApp;