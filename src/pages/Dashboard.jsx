// Dashboard.jsx

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// const API = "http://localhost:3000/api"
const API = "https://nodebackend-x4m5.onrender.com/api"

function Dashboard() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState("")

  useEffect(() => {

    if (!token) {
      navigate("/")
      return
    }

    fetchProjects()

  }, [])

  // Fetch Projects
  const fetchProjects = async () => {

    const response = await fetch(`${API}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    setProjects(data.projects)

  }

  // Add Project
  const addProject = async () => {

    if (!projectName.trim()) return

    await fetch(`${API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: projectName
      })
    })

    setProjectName("")
    fetchProjects()

  }

  // Delete Project
  const deleteProject = async (projectId) => {

    await fetch(`${API}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchProjects()

  }

  // Logout
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-gray-800">
          📁 Projects Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      <div className="max-w-3xl mx-auto p-6">

        {/* Create Project */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Create New Project
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Enter project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addProject()}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={addProject}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add
            </button>

          </div>

        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-4">

          {projects.length === 0 ? (

            <div className="bg-white p-10 rounded-xl shadow text-center text-gray-400">
              No Projects Yet
            </div>

          ) : (

            projects.map((project) => (

              <div
                key={project._id}
                className="bg-white p-5 rounded-xl shadow hover:bg-blue-50 transition"
              >

                {/* Top */}
                <div className="flex items-start justify-between">

                  {/* Left */}
                  <div
                    onClick={() => navigate(`/tasks/${project._id}`)}
                    className="cursor-pointer flex-1"
                  >

                    <h3 className="text-lg font-bold text-gray-800">
                      {project.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Open Tasks →
                    </p>

                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold ml-4"
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

export default Dashboard















// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"

// const API = "http://localhost:3000/api"

// function Dashboard() {

//   const navigate = useNavigate()
//   const token = localStorage.getItem("token")

//   const [projects, setProjects] = useState([])
//   const [projectName, setProjectName] = useState("")
//   const [taskInputs, setTaskInputs] = useState({})
//   const [tasks, setTasks] = useState({})

//   useEffect(() => {
//     if (!token) {
//       navigate("/")
//       return
//     }
//     fetchProjects()
//   }, [])

//   const fetchProjects = async () => {
//     const response = await fetch(`${API}/projects`, {
//       headers: { "Authorization": `Bearer ${token}` }
//     })
//     const data = await response.json()
//     setProjects(data.projects)
//     data.projects.forEach(project => fetchTasks(project._id))
//   }

//   const fetchTasks = async (projectId) => {
//     const response = await fetch(`${API}/projects/${projectId}/tasks`, {
//       headers: { "Authorization": `Bearer ${token}` }
//     })
//     const data = await response.json()
//     setTasks(prev => ({ ...prev, [projectId]: data.tasks }))
//   }

//   const addProject = async () => {
//     if (!projectName.trim()) return
//     await fetch(`${API}/projects`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ name: projectName })
//     })
//     setProjectName("")
//     fetchProjects()
//   }

//   const addTask = async (projectId) => {
//     const title = taskInputs[projectId]
//     if (!title || !title.trim()) return
//     await fetch(`${API}/projects/${projectId}/tasks`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ title: title })
//     })
//     setTaskInputs(prev => ({ ...prev, [projectId]: "" }))
//     fetchTasks(projectId)
//   }

//   const updateStatus = async (taskId, newStatus, projectId) => {
//     await fetch(`${API}/projects/${taskId}/status`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ status: newStatus })
//     })
//     fetchTasks(projectId)
//   }



// const deleteTask = async (taskId, projectId) => {
//     await fetch(`${API}/projects/task/${taskId}`, {
//       method: "DELETE",
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     })
  
//     fetchTasks(projectId)
//   }

//   // ✅ Project delete function
//   const deleteProject = async (projectId) => {
//     await fetch(`${API}/projects/${projectId}`, {
//       method: "DELETE",
//       headers: { "Authorization": `Bearer ${token}` }
//     })
//     fetchProjects()
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     navigate("/")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* Navbar */}
//       <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-gray-800">📋 Task Manager</h1>
//         <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
//           Logout
//         </button>
//       </div>

//       <div className="max-w-3xl mx-auto p-6">

//         {/* New Project */}
//         <div className="bg-white rounded-xl p-5 shadow mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-3">New Project</h2>
//           <div className="flex gap-3">
//             <input
//               type="text"
//               placeholder="Project name (e.g. Gym, Work...)"
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && addProject()}
//               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
//             />
//             <button onClick={addProject} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
//               + Add
//             </button>
//           </div>
//         </div>

//         {/* Projects List */}
//         {projects.length === 0 ? (
//           <div className="text-center py-16 text-gray-400">
//             <p className="text-4xl mb-3">📁</p>
//             <p>No projects yet — create one above!</p>
//           </div>
//         ) : (
//           projects.map((project) => (
//             <div key={project._id} className="bg-white rounded-xl shadow mb-5 overflow-hidden">

//               {/* ✅ Project Name + Delete Button */}
//               <div className="bg-blue-600 px-5 py-3 flex justify-between items-center">
//                 <h3 className="text-white font-bold text-lg">{project.name}</h3>
//                 <button
//                   onClick={() => deleteProject(project._id)}
//                   className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-600"
//                 >
//                   Delete Project
//                 </button>
//               </div>

//               <div className="p-5">

//                 {/* Tasks */}
//                 <div className="flex flex-col gap-3 mb-4">
//                   {tasks[project._id] && tasks[project._id].length === 0 && (
//                     <p className="text-gray-400 text-sm text-center py-2">No tasks yet</p>
//                   )}
//                   {tasks[project._id] && tasks[project._id].map((task) => (
//                     <div key={task._id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
//                       <span className={`text-sm font-medium flex-1 ${task.status === "done" ? "line-through text-gray-400" : "text-gray-700"}`}>
//                         {task.title}
//                       </span>
//                       <select
//                         value={task.status}
//                         onChange={(e) => updateStatus(task._id, e.target.value, project._id)}
//                         className="text-xs border border-gray-300 rounded-lg px-2 py-1 mx-3 outline-none cursor-pointer"
//                       >
//                         <option value="todo">Todo</option>
//                         <option value="inprogress">In Progress</option>
//                         <option value="done">Done</option>
//                       </select>
//                       <button
//                         onClick={() => deleteTask(task._id, project._id)}
//                         className="text-red-400 hover:text-red-600 text-lg font-bold"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add Task */}
//                 <div className="flex gap-3">
//                   <input
//                     type="text"
//                     placeholder="Add a task..."
//                     value={taskInputs[project._id] || ""}
//                     onChange={(e) => setTaskInputs(prev => ({ ...prev, [project._id]: e.target.value }))}
//                     onKeyDown={(e) => e.key === "Enter" && addTask(project._id)}
//                     className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 text-sm"
//                   />
//                   <button
//                     onClick={() => addTask(project._id)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
//                   >
//                     + Task
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))
//         )}

//       </div>
//     </div>
//   )
// }

// export default Dashboard