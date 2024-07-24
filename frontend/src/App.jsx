import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard"  element={<Dashboard />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element = {<PostPage/>}/>
          <Route element={<AdminPrivateRoute />}>
            <Route element={<CreatePost />} path="/create-post" />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route element={<UpdatePost />} path="/update-post/:postId" />
          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
