import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from "react-redux"

const DashboardProfile = () => {


  const {currentUser} = useSelector(state => state.user)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form action="" className='flex flex-col gap-5'>
      <div className='w-32 h-32 mx-auto cursor-pointer shadow-md overflow-hidden rounded-full'>
      <img src={currentUser.profilePicture} alt="error-user" className='w-full h-full border-8 border-gray-100 rounded-full'/>
      </div>

    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
    <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
    <TextInput type='password' id='password' placeholder='password' defaultValue="********"/>


    <Button type='submit' gradientDuoTone="purpleToBlue" outline>
    Update
    </Button>
    </form>

    <div className="text-red-500 *:cursor-pointer flex justify-between mt-5 *:font-semibold hover:*:underline *:underline-offset-2">
      <span >Delete Account</span>
      <span >Sign Out</span>
    </div>

    </div>
  )
}

export default DashboardProfile
