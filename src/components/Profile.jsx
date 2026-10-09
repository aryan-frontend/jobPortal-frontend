import React, { useState } from 'react'
import { Navbar } from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { AppliedJobsTable } from './AppliedJobsTable';
import { Button } from './ui/button';
import { UpdateProfileDialog } from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const skills = ["Html", "Css", "Javascript", "Reactjs", "Nextjs"];

export const Profile = () => {

    const {user} = useSelector((store) => store.auth);

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>bio</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                        {skills.length !== 0 ? (
                            skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobsTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}
