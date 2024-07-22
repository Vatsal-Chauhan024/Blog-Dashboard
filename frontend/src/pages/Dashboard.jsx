import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardProfile from "../components/DashboardProfile"
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardPosts from "../components/DashboardPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromUrl = urlParam.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side bar  */}
      <div className="md:w-56">
      <DashboardSidebar/>
      </div>
      {tab === "profile" && <DashboardProfile/>}
      {tab === "posts" && <DashboardPosts/>} 
    </div>

  );
};

export default Dashboard;
