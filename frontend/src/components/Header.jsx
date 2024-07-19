import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;

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

      <form action="">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch className="text-lg" />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>SignIn</Button>
        </Link>
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
