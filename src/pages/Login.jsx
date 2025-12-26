import { Button, Input } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/api/authApi'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
})

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, message, success, role } = useSelector(state => state.auth)

    useEffect(() => {
        if (success && role === 'user') {
            navigate('/')
        }
    }, [success, role, navigate])

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            await schema.validate(form, { abortEarly: false })
            const result = await dispatch(login(form)).unwrap()
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('Please fill all required fields correctly')
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">

                {/* Left Image */}
                <div className="hidden md:block relative">
                    <img
                        src="/register.webp"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-xl font-bold">Lorem Ipsum is simply</h2>
                        <p className="text-sm">Lorem ipsum is simply</p>
                    </div>
                </div>

                {/* Right Form */}
                <div className="p-10 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Welcome back!
                    </h2>

                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-200 rounded-full flex p-1">
                            <button className="px-6 py-1 text-sm text-white rounded-full" style={{backgroundColor: '#49BBBD'}}>
                                Login
                            </button>
                            <button 
                                className="px-6 py-1 text-sm"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            classNames={{
                                inputWrapper: "border-1 border-[#49BBBD] rounded-[40px]",
                                label: "text-black text-sm ml-4",
                                input: "text-sm ml-4"
                            }}
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="focus:outline-none"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                                </button>
                            }
                            classNames={{
                                inputWrapper: "border-1 border-[#49BBBD] rounded-[40px]",
                                label: "text-black text-sm ml-4",
                                input: "text-sm ml-4"
                            }}
                        />

                        <Button
                            type="submit"
                            className="w-full mt-4 text-white rounded-[36px]"
                            style={{backgroundColor: '#49BBBD'}}
                            isLoading={loading}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
