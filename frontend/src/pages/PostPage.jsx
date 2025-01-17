import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null)


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);


  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();

        if(res.ok){
          setRecentPost(data.posts)
        }
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error)
    }
  }, [])



  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen">
    <h1 className="text-4xl lg:text-5xl mt-10 p-3 text-center  max-w-2xl mx-auto">{post?.title}</h1>
    <Link to = {`/search?category=${post?.category}`} className="self-center mt-5">
    <Button color="gray" pill size="xs">{post?.category}</Button>
    </Link>

    <img src={post?.image} alt="error-blog-post" className="mt-10 p-3 max-h-[600px] w-full object-cover"/>

    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full  text-xs">
    <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
    <span className="italic">{(post?.content.length/1000).toFixed(0)} mins read</span>
    </div>

    <div className="p-3 max-w-5xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post?.content}}></div>

    <div className="mx-auto w-full">
      <CallToAction/>
    </div>
    <CommentSection postId = {post?._id}/>

    <div className="flex flex-col items-center justify-center mb-5">
      <h1 className="text-4xl font-bold my-5">Recent Articles</h1>
      <div className="flex flex-wrap gap-8 justify-center items-center w-full px-4">
      {
        recentPost?.map((post) => (
          <PostCard key = {post._id} post={post}/>
        ))
      }
      </div>
    </div>

  </main>
};

export default PostPage;
