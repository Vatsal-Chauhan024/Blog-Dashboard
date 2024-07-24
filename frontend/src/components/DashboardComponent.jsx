import React, { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import Card from "./Card";
import CommonTable from "./CommonTable";

const DashboardComponent = () => {
  const [users, setUsers] = useState([]);

  const [post, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();

        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <Card
          primaryHeading="Total Users"
          primaryHeadingValue={totalUsers}
          iconValue={<HiOutlineUserGroup />}
          secondIconValue={<HiArrowNarrowUp />}
          secondaryHeading={lastMonthUsers}
          tertiaryHeading="Last Month"
          className="bg-teal-500"
        />
        <Card
          primaryHeading="Total Posts"
          primaryHeadingValue={totalPosts}
          iconValue={<HiAnnotation />}
          secondIconValue={<HiArrowNarrowUp />}
          secondaryHeading={lastMonthPosts}
          tertiaryHeading="Last Month"
          className="bg-indigo-700"
        />
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col lg:flex-row gap-8 w-full  p-2 rounded-md">
          <div className="shadow-lg flex-1">
            <CommonTable
              primaryHeading="Recent Users"
              linktoTab="/dashboard?tab=users"
              linkValue="See All"
              btnColor="purpleToPink"
              tableHeading1="User Image"
              tableHeading2="Username"
              dataArray={users}
            />
          </div>
          <div className="shadow-lg flex-1">
            <CommonTable
              primaryHeading="Recents Post"
              linktoTab="/dashboard?tab=posts"
              linkValue="See All"
              btnColor="purpleToPink"
              tableHeading1="Post Title"
              tableHeading2="Post Image"
              tableHeading3="Post Category"
              dataArray={post}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
