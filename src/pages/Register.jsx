import { Button, Input } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../features/auth/api/authApi'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object({
    fullName: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter valid email").required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    cpassword: yup.string().required("Please enter confirm password"),
    phoneNumber: yup.string().required("Please enter your phone number"),
    classLevel: yup.string().required("Please enter your class level"),
})

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, message, success } = useSelector(state => state.auth)

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        cpassword: '',
        phoneNumber: '',
        classLevel: '',
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors({})
        
        try {
            await schema.validate(form, { abortEarly: false })
            
            if (form.password !== form.cpassword) {
                setErrors({ cpassword: 'Passwords do not match' })
                toast.error('Passwords do not match')
                return
            }
            
            const result = await dispatch(register(form)).unwrap()
            if (result.message.toLowerCase().includes('successfully')) {
                toast.success(result.message)
                setTimeout(() => navigate('/login'), 2000)
            } else {
                toast.error(result.message)
                if (result.message.toLowerCase().includes('already exists')) {
                    setTimeout(() => navigate('/login'), 2000)
                }
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
                        Welcome to lorem..!
                    </h2>

                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-200 rounded-full flex p-1">
                            <button 
                                className="px-6 py-1 text-sm"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button className="px-6 py-1 text-sm text-white rounded-full" style={{backgroundColor: '#49BBBD'}}>
                                Register
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            isInvalid={!!errors.fullName}
                            errorMessage={errors.fullName}
                            classNames={{
                                inputWrapper: "border-1 border-[#49BBBD] rounded-[40px]",
                                label: "text-black text-sm ml-4",
                                input: "text-sm ml-4"
                            }}
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email}
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
                            isInvalid={!!errors.password}
                            errorMessage={errors.password}
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

                        <Input
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            name="cpassword"
                            value={form.cpassword}
                            onChange={handleChange}
                            isInvalid={!!errors.cpassword}
                            errorMessage={errors.cpassword}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="focus:outline-none"
                                >
                                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                                </button>
                            }
                            classNames={{
                                inputWrapper: "border-1 border-[#49BBBD] rounded-[40px]",
                                label: "text-black text-sm ml-4",
                                input: "text-sm ml-4"
                            }}
                        />

                        <Input
                            label="Phone Number"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.phoneNumber}
                            errorMessage={errors.phoneNumber}
                            classNames={{
                                inputWrapper: "border-1 border-[#49BBBD] rounded-[40px]",
                                label: "text-black text-sm ml-4",
                                input: "text-sm ml-4"
                            }}
                        />

                        <Input
                            label="Class Level"
                            name="classLevel"
                            value={form.classLevel}
                            onChange={handleChange}
                            isInvalid={!!errors.classLevel}
                            errorMessage={errors.classLevel}
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
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
