import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  // Form State
  const [formDetail, setFormDetail] = useState({
    email: "",
    pass: ""
  })

  // Error State
  const [errors, setErrors] = useState({})

  // Success Message
  const [success, setSuccess] = useState("")

  // Handle Input
  const handleFormData = (e) => {

    setFormDetail({
      ...formDetail,
      [e.target.name]: e.target.value
    })

    // Remove Errors While Typing
    setErrors({
      ...errors,
      [e.target.name]: ""
    })

    // Remove Success Message
    setSuccess("")
  }

  // Login Submit
  const handleLoginSubmit = async (e) => {

    e.preventDefault()

    // Validation
    const newErrors = {}

    if (!formDetail.email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!formDetail.pass.trim()) {
      newErrors.pass = "Password is required"
    }

    // Set Errors
    setErrors(newErrors)

    // Stop if errors exist
    if (Object.keys(newErrors).length > 0) {
      return
    }

    try {

      const response = await fetch(
        "https://nodebackend-x4m5.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formDetail.email,
            password: formDetail.pass
          })
        }
      )

      const data = await response.json()

      // Login Success
      if (data.token) {

        // Save Token
        localStorage.setItem("token", data.token)

        // Success Message
        setSuccess("Login Successful")

        // Reset Form
        setFormDetail({
          email: "",
          pass: ""
        })

        // Navigate After Delay
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500)

      } else {

        setSuccess("")
        alert(data.message)

      }

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="bg-blue-600 w-screen h-screen flex justify-center items-center">

      <div className="w-[440px] min-h-[500px] bg-white rounded-2xl">

        <h1 className="text-center text-4xl p-8 font-bold">
          Login Form
        </h1>

        {/* Login Signup Buttons */}
        <div className="flex justify-center gap-2">

          <Link to="/">
            <button className="bg-blue-600 text-white px-10 py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-gray-200 px-10 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
              SignUp
            </button>
          </Link>

        </div>

        {/* Form */}
        <div>

          <form
            onSubmit={handleLoginSubmit}
            className="p-5 flex flex-col items-center gap-2 mt-5"
          >

            {/* Email Input */}
            <input
              className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-inner outline-none
              placeholder:text-gray-400
              hover:placeholder:text-blue-500
              hover:border-blue-500"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFormData}
              value={formDetail.email}
            />

            {errors.email && (
              <p className="text-red-500 text-sm w-72">
                {errors.email}
              </p>
            )}

            {/* Password Input */}
            <input
              className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-inner outline-none
              placeholder:text-gray-400
              hover:placeholder:text-blue-500
              hover:border-blue-500"
              type="password"
              placeholder="Password"
              name="pass"
              onChange={handleFormData}
              value={formDetail.pass}
            />

            {errors.pass && (
              <p className="text-red-500 text-sm w-72">
                {errors.pass}
              </p>
            )}

            {/* Login Button */}
            <button className="bg-blue-600 text-white mt-4 px-24 py-3 rounded-lg hover:bg-blue-700">
              Login
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-600 text-sm mt-3 font-medium">
                {success}
              </p>
            )}

            {/* Footer */}
            <div className="flex gap-2 mt-4">

              <h1>Not a member?</h1>

              <Link
                to="/signup"
                className="text-blue-500 hover:underline"
              >
                Signup Now
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login

// import { useState } from "react"
// import { Link , useNavigate } from "react-router-dom"

// function Login() {
    
//     const [formDetail , setFormDetail] = useState({
//         email:"",
//         pass:""
//     })

//     const navigate = useNavigate()  //navigate hook
//     const handleFormData =(e)=>{
//         setFormDetail({
//             ...formDetail,
//             [e.target.name]:e.target.value
//         }) 
//     }

//     const handleLoginSubmit =async (e)=>{
//         e.preventDefault()
//         // console.log(formDetail.email )
//         // console.log(formDetail.pass)

//         try{
//             // const response = await fetch("http://localhost:3000/api/auth/login",
//             const response = await fetch("https://nodebackend-x4m5.onrender.com/api/auth/login",
//               {
//                 method:"POST",
//                 headers:{
//                    "Content-Type": "application/json"
//                 },
//                 body:JSON.stringify({
//                   email:formDetail.email,
//                   password:formDetail.pass
//                 })
//               }
//             )
//             const data = await response.json()
//             console.log(data)

//             //do token save in localStorage
//             if(data.token){
//               localStorage.setItem("token" ,data.token)
//                 navigate("/dashboard")
//             }
//         }catch(err){
//             console.log(err)
//         }
        
//     }
//   return (
//     <div className="bg-blue-600 w-screen h-screen flex justify-center items-center">

//       <div className="w-[440px] h-[480px] bg-white rounded-2xl">

//         <h1 className="text-center text-4xl p-8 font-bold">
//           Login Form
//         </h1>

//         {/* Login Signup Buttons */}
//         <div className="flex justify-center gap-2">

//           <Link to="/">
//           <button className="bg-blue-600 text-white px-10 py-2 rounded-lg hover:bg-blue-700">
//             Login
//           </button>
//           </Link>

//           <Link to="/signup"> 
//           <button className="bg-gray-200 px-10 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
//             SignUp
//           </button>
//           </Link>
//         </div>

//         {/* Form */}
//         <div className="">

//         <form onSubmit={handleLoginSubmit} 
//         className="p-5 flex flex-col items-center gap-4 mt-5">
            
       

//           <input
//             className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-inner outline-none 
//             placeholder:text-gray-400
//             hover:placeholder:text-blue-500
//             hover:border-blue-500"
//             type="email"
//             placeholder="Email"
//             name="email"
//             onChange={handleFormData}
//             value={formDetail.email}
//           />

// <input
//             className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-inner outline-none 
//             placeholder:text-gray-400
//             hover:placeholder:text-blue-500
//             hover:border-blue-500"
//             type="password"
//             placeholder="Password"
//             name="pass"
//             onChange={handleFormData}
//             value={formDetail.pass}
//           />

//           {/* <input
//             className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-inner outline-none 
//             placeholder:text-gray-400
//             hover:placeholder:text-blue-500
//             hover:border-blue-500"
//             type="email"
//             placeholder="Enter Email"
//           /> */}

//           {/* <a
//             href="#"
//             className="w-72 text-left text-blue-500 hover:underline"
//           >
//             Forgot Password
//           </a> */}

//           <button  className="bg-blue-600 text-white mt-2 px-24 py-3 rounded-lg hover:bg-blue-700">
//             Login
//           </button>

//           <div className="flex gap-2 mt-2">
//             <h1>Not a member?</h1>

//             <Link
//               to="/signup"
//               className="text-blue-500 hover:underline"
//             >
//               Signup Now
//             </Link>
//           </div>
//           </form>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default Login