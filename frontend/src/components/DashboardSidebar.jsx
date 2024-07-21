import {React, useEffect, useState} from 'react'
import {Sidebar} from "flowbite-react"
import {HiUser, HiArrowSmRight} from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom'
import { SignOut } from '../utils/SignOut'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../store/user/UserSlice'

const DashboardSidebar = () => {

  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromUrl = urlParam.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search]);

  return (
   <Sidebar className='w-full md:56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
        <Sidebar.Item active ={tab === "profile"} icon = {HiUser} label = {"User"} labelColor = "dark" as="div">
          Profile
          </Sidebar.Item>
        </Link>
          <Sidebar.Item  icon = {HiArrowSmRight} className = "cursor-pointer" onClick = {() => SignOut(dispatch, signOutSuccess)}>
          Sign Out
          </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}

export default DashboardSidebar
