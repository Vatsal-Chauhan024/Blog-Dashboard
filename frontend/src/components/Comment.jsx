import React, { useEffect, useState } from 'react'
import moment from "moment"
import { Button } from 'flowbite-react'
import {FaThumbsUp} from "react-icons/fa"
import { useSelector } from 'react-redux'

const Comment = ({comment, onLike}) => {


    const [user, setUser] = useState({})
    const {currentUser} = useSelector(state => state.user)

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
            <span className='font-boldd mr-1 truncate'>{user ? `@${user?.username}`: `Anonymous`}</span>
            <span className='text-xs text-gray-400'>{moment(comment?.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 mb-2'>{comment?.content}</p>
        <div className="flex items-center pt-2 gap-2 border-t dark:border-slate-700 max-w-fit">
          <Button type='button' onClick={() => onLike(comment._id)} color="none" className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}><FaThumbsUp/></Button>
          <p className='text-gray-400 text-sm'>
            {comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like": "Likes")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comment
