import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=9`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to My Blog Website..
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia itaque
          sapiente rem saepe nulla enim aperiam! Cupiditate rem soluta
          voluptatum quaerat, dolorum veniam laboriosam nostrum itaque nihil
          assumenda aperiam blanditiis.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-500 font-bold hover:underline"
        >
          View All Posts
        </Link>
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-800 max-w-5xl mx-auto rounded-md ">
        <CallToAction />
      </div>

      <div className="max-w-6xl p-3 mx-auto flex flex-col gap-8 py-7 mt-3">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-center">Recent Posts</h1>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <Button color="teal" className="max-w-sm mx-auto">
            <Link to="/search" className="w-full h-full">
              View All Post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
