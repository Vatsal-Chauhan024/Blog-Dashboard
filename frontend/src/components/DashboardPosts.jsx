import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser._id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id]);

  return (
    <div className='w-full table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userPosts.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="capitalize">{post.category}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                  >
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-post/${post._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        </>
      ) : (
        <p>No Post Found...</p>
      )}
    </div>
  );
};

export default DashboardPosts;
