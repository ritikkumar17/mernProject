import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const API = "http://localhost:3000/api"

function Task() {

  const { id } = useParams()

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {

    if (!token) {
      navigate("/")
      return
    }

    fetchTasks()

  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {

    const response = await fetch(`${API}/projects/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    setTasks(data.tasks)

  }

  // Add Task
  const addTask = async () => {

    if (!title.trim()) return

    await fetch(`${API}/projects/${id}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title
      })
    })

    setTitle("")
    fetchTasks()

  }

  // Update Status
  const updateStatus = async (taskId, status) => {

    await fetch(`${API}/projects/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status
      })
    })

    fetchTasks()

  }

  // Delete Task
  const deleteTask = async (taskId) => {

    await fetch(`${API}/projects/task/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchTasks()

  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          📋 Project Tasks
        </h1>

      </div>

      <div className="max-w-3xl mx-auto p-6">

        {/* Add Task */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Add New Task
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add
            </button>

          </div>

        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-4">

          {tasks.length === 0 ? (

            <div className="bg-white p-10 rounded-xl shadow text-center text-gray-400">
              No Tasks Yet
            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
              >

                <div>

                  <h3 className={`font-medium ${task.status === "done"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                    }`}>
                    {task.title}
                  </h3>

                </div>

                <div className="flex items-center gap-3">

                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                  >

                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>

                  </select>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 text-lg font-bold hover:text-red-700"
                  >
                    ✕
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default Task