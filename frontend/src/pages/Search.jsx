import React, { useEffect, useState } from "react";
import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard"

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

console.log(sidebarData)


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const category = urlParams.get("category");




    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: category,
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);

        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    } else if (e.target.id === "sort") {
      const order = e.target.value || "desc";

      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    } else if (e.target.id === "category"){
      const category = e.target.value || "uncategorized";
      setSidebarData({
        ...sidebarData,
        category: category,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("serchTerm", sidebarData.searchTerm)
    urlParams.set("sort", sidebarData.sort)
    urlParams.set("category", sidebarData.category)

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form action="" className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort</label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
              className="flex-1"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
              className="flex-1"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>

        <Button  gradientDuoTone='purpleToPink' type="submit">Submit</Button>

        </form>
      </div>
      <div className="mt-5">
        <h1 className="w-full text-3xl font-semibold sm:border-b border-gray-500 p-3">Post Results:</h1>

        <div className="p-7 flex flex-wrap gap-4">
      {!loading && post.length === 0 && (
        <p className="text-xl text-gray-500">No Post Found...</p>
      )}
      {
        loading && (
          <Spinner size="sm" color="blue"/>
        )
      }

      {!loading && post && post.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}

        </div>
      </div>
    </div>
  );
};

export default Search;
