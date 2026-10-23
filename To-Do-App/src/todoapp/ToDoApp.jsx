import { useEffect, useState, useRef } from "react"

function ToDoApp() {
    const [updateInputElement, setUpdateInputElement] = useState("");
    const upInpRef = useRef();
    const [newtask, setNewTask] = useState("");
    const [listOfTask, setListOfTask] = useState(() => {
        try {
            const savedTasks = localStorage.getItem("tasks");

            if (!savedTasks) {
                return [];
            }

            const parsedTasks = JSON.parse(savedTasks);

            return Array.isArray(parsedTasks) ? parsedTasks : [];
        } catch (error) {
            console.error("Could not load saved tasks:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(listOfTask));
    }, [listOfTask]);

    const addOrUpdateTask = (type, key = null) => {
        if (type == 'add') {
            if (newtask == '') return
            else {
                setListOfTask(prev => [...prev, newtask]);
                localStorage.setItem('tasks', JSON.stringify((listOfTask)));
                console.log(localStorage.getItem('tasks'))
            }
            setNewTask("")
        }
        else {
            updateTask(key)
        }
    }

    const deleteTask = (key) => {
        setListOfTask(listOfTask.filter((_, index) => index !== key))
        localStorage.setItem('tasks', JSON.stringify(listOfTask))
    }

    const goUp = (idx) => {
        if (idx == 0) return
        for (let i = 0; i <= idx; i++) {
            if (i == idx - 1) {
                const prev = listOfTask[i];
                listOfTask[i] = listOfTask[idx];
                listOfTask[idx] = prev;
                setListOfTask([...listOfTask])
            }
        }
    }

    const goDown = (idx) => {
        if (idx == listOfTask.length - 1) return

        const next = listOfTask[idx + 1];
        listOfTask[idx + 1] = listOfTask[idx];
        listOfTask[idx] = next;
        setListOfTask([...listOfTask])
    }

    const toggleComplete = (e, key) => {
        const task = document.querySelector(`#key-${key}`);
        if (e.target.checked) {
            task.style.textDecoration = "line-through"
            task.style.color = "grey"
        }
        else {
            task.style.textDecoration = "none"
            task.style.color = "white";
        }
    }

    const showHideEditModal = (key, type) => {
        if (type == 'close') {
            document.querySelector(`#updateTaskModal-${key}`).classList.add('hidden')
        }
        else {
            document.querySelector(`#updateTaskModal-${key}`).classList.remove('hidden')
            const old_task = listOfTask[key];
            setUpdateInputElement(old_task)
            console.log(updateInputElement)
        }
        // const new_task = inputElement.current.value;
        // console.log(new_task)
        // listOfTask[listOfTask.indexOf(old_task)] = new_task

        // console.log(listOfTask.indexOf(old_task));

    }

    const updateTask = (key) => {
        const newTask = upInpRef.current.value;
        listOfTask[key] = newTask;
        console.log(listOfTask)
        setListOfTask([...listOfTask])
        localStorage.setItem('tasks', JSON.stringify(listOfTask))
        console.log('tasks', JSON.stringify(listOfTask))
        showHideEditModal(key, 'close')


    }

    return (
        <div className="px-4 w-140 h-fit max-h-[730px] overflow-auto text-gray-300 border-2 absolute top-30 left-[50%] translate-x-[-50%] flex flex-col gap-4">
            <div className="sticky top-0 flex flex-col justify-between bg-gray-900 ">
                <h1 className="text-4xl font-bold text-center text-white mb-2">To-do app</h1>
                <div className="addTask w-full min-h-20 border-2 flex justify-between items-center px-4">
                    <input type="text"
                        value={newtask}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                addOrUpdateTask('add')
                            }
                        }}
                        onChange={(e) => { setNewTask(e.target.value) }} className="w-80 h-12 text-2xl border-b-2 outline-none" />
                    <button className="px-8 py-2 bg-blue-700 text-xl text-white rounded-xl shadow-lg shadow-blue-500 active:shadow-md outline-none active:translate-[2px]" onClick={(e) => { addOrUpdateTask(e, 'add') }}>Add Task</button>
                </div>
            </div>
            <div className="">
                {listOfTask.length === 0 ? (
                    <h1 className="text-2xl text-center font-bold text-gray-400">No tasks available</h1>
                ): ""}
                <ul className="flex flex-col gap-[9px] mb-3">
                    {listOfTask.map((items, key) => (
                        <li key={key} className="border-2 flex justify-between items-center duration-1000">
                            <div id={`updateTaskModal-${key}`} className="hidden absolute border-2 h-30 backdrop-blur-sm flex flex-col items-end">
                                <div className="text-right font-bold text-2xl rotate-45 w-fit"><span className="rotate-45 cursor-pointer" onClick={() => showHideEditModal(key, 'close')}>+</span></div>
                                <div className="px-2">
                                    <input type="text"
                                        ref={upInpRef}
                                        value={updateInputElement}
                                        onChange={e => { setUpdateInputElement(e.target.value) }}
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') addOrUpdateTask('update', key)
                                        }}
                                        className="w-80 h-12 text-2xl border-b-2 outline-none" />
                                    <button className="px-8 py-2 bg-green-700 text-xl text-white rounded-xl shadow-lg shadow-green-500 active:shadow-md outline-none active:translate-[2px]" onClick={() => { addOrUpdateTask('update', key) }}>Update Task</button>
                                </div>
                            </div>
                            <div className="px-4 flex gap-1">
                                <input type="checkbox" onChange={(e) => { toggleComplete(e, key) }} className="w-4" key={key} id={key} />
                                <label htmlFor={key} id={`key-${key}`}>{(items)}</label>
                            </div>
                            <div className="flex gap-2 p-2">
                                <button className="px-2  border-2 border-red-600 hover:text-white hover:bg-red-600 cursor-pointer duration-100 rounded-xl" onClick={() => { deleteTask(key) }}>Remove</button>
                                <button className="px-2 border-2 border-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer duration-100 rounded-xl" onClick={() => { showHideEditModal(key, 'show') }}>Edit</button>
                                <button className={`text-2xl ${key == 0 ? "cursor-not-allowed" : "cursor-pointer  hover:translate-y-[-3px] cursor-pointer"} duration-100 px-2 py-1 rounded-full border-2`} onClick={() => goUp(key)}>&uarr;</button>
                                <button className={`text-2xl ${key == listOfTask.length - 1 ? "cursor-not-allowed" : "cursor-pointer hover:translate-y-[3px] "} duration-100 px-2 py-1 rounded-full border-2`} onClick={() => goDown(key)}>&darr;</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ToDoApp