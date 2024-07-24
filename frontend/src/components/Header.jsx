import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {toggleTheme} from "../store/theme/ThemeSlice"
import { SignOut } from "../utils/SignOut";
import { signOutSuccess } from "../store/user/UserSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const {theme}  = useSelector ((state) => state.theme)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation();
  const navigate = useNavigate()


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    setSearchTerm(searchTermFromUrl)
  }, [location.search])


  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search)
    urlParams.set("serchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Vatsal
        </span>
        Blog
      </Link>

      <form action="" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch className="text-lg" />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
        {theme === "light" ? <FaMoon/> : <FaSun/>}
        </Button>
        {currentUser ? (
          <>
          <Dropdown arrowIcon = {false} inline label = {
            <Avatar alt="user" img={currentUser.profilePicture} rounded size="sm"/>
          }>

            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              <Link to = "/dashboard?tab=profile">
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
              </Link>
              <Dropdown.Divider/>

              <Dropdown.Item onClick={() => SignOut(dispatch, signOutSuccess)}>
                Sign Out
              </Dropdown.Item>

            </Dropdown.Header>

          </Dropdown>
          </>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              SignIn
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        {["/", "about", "projects"].map((elem, i) => (
          <Navbar.Link
            className="*:text-sm *:sm:text-base"
            active={i === 0 ? path === "/" : path === "/" + elem.toLowerCase()}
            as="div"
            key={i}
          >
            <Link to={i === 0 ? "/" : `/${elem.toLowerCase()}`}>
              {elem === "/" ? "Home" : elem.toUpperCase()}
            </Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
