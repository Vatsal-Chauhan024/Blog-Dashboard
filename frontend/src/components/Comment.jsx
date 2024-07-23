import React, { useEffect, useState } from 'react'
import moment from "moment"

const Comment = ({comment}) => {


    const [user, setUser] = useState({})


    useEffect(() => {
        const getUser  = async() => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                
                const data = await res.json()

                if(res.ok){
                    setUser(data)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getUser();

    }, [comment])

  return (
    <div className='flex p-4 border-b dark:border-slate-400'>
      <div className="flex flex-shrink-0 mr-3">
        <img src={user?.profilePicture} alt="error-user-icon" className='w-10 h-10 rounded-full bg-gray-200'/>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
            <span className='font-boldd mr-1 truncate'>{user ? `@${user.username}`: `Anonymous`}</span>
            <span className='text-xs text-gray-400'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 mb-2'>{comment?.content}</p>
      </div>
    </div>
  )
}

export default Comment
