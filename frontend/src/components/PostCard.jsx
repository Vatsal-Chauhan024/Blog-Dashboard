import React from 'react'
import {Link } from "react-router-dom"

const PostCard = ({post}) => {


  return (
    <div className='group w-full border h-fit overflow-hidden rounded-lg sm:w-[430px] shadow-md'>
        <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="post-cover" className='h=[260px] rounded-md w-full object-cover group-hover:scale-105 transition-all duration-300 z-20'/>
        </Link>
        <div className="p-3 flex flex-col gap-2">
            <p className='text-2xl font-semibold font-sans line-clamp-3'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <Link className='z-10 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2' to={`/post/${post.slug}`}>Read More</Link>
        </div>
    </div>
    
  )
}

export default PostCard
