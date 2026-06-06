import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loading from '../../../components/Loading'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (
            <main className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
                Loading...
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="form-container w-full max-w-md bg-black rounded-2xl shadow-2xl p-8">
                
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="input-group">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Username
                        </label>

                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name='username'
                            placeholder='Enter username'
 className="w-full px-4 py-3 border border-gray-600 bg-white text-gray-800 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="input-group">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Email
                        </label>

                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter email address'
                            className="w-full px-4 py-3 border border-gray-600 bg-white text-gray-800 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="input-group">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Password
                        </label>

                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Enter password'
 className="w-full px-4 py-3 border border-gray-600 bg-white text-gray-800 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"

                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-6 text-white">
                    Already have an account?{" "}
                    <Link
                        to={"/login"}
                        className="text-green-500 font-semibold hover:text-green-400"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    )
}

export default Register