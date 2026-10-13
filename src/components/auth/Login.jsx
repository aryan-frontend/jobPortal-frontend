import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/authSlice'

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            console.log("API BASE URL:", USER_API_END_POINT);
            console.log("LOGIN URL:", `${USER_API_END_POINT}/login`);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label className="my-2">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventhandler}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="my-2">Password</Label>
                        <Input
                            type="passwor"
                            name="password"
                            value={input.password}
                            onChange={changeEventhandler}
                            placeholder="Enter the password"
                        />
                    </div>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role == 'student'}
                                onChange={changeEventhandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role == 'recruiter'}
                                onChange={changeEventhandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <Button type="submit" className="w-full my-4 bg-black text-white">Login</Button>

                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>
                </form>
            </div>
        </div>
    )
}
