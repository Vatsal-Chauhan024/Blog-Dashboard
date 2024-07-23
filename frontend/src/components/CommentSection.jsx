import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null)
  const [comment, setComment] = useState("");
  const [commentArray, setCommentsArray] = useState([])


  const handleSubmit = async (e) => {
    setCommentError(null)
    e.preventDefault();
    if (comment.length > 200) {
      alert("Content should be less than or equal to 200 words.")
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null)
        setCommentsArray([data, ...commentArray])
      }
    } catch (error) {
     console.log(error)
     setCommentError(error.message)
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);
  
        if(res.ok){
          const data = await res.json();
          setCommentsArray(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments();
  }, [postId])

  return (
    <div className="max-w-3xl w-full mx-auto p-3">
      {currentUser ? (
        <>
          <div className="flex items-center gap-2 my-5 text-gray-400 text-sm">
            <p>Signed in as:</p>
            <img
              src={currentUser?.profilePicture}
              alt="user"
              className="h-5 w-5 object-cover rounded-full"
            />
            <Link
              to="/dashboard?tab=profile"
              className="text-xs text-blue-500 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        </>
      ) : (
        <div className="text-teal-500 text-sm flex gap-1 items-center">
          Sign In to see comments.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Signin
          </Link>
        </div>
      )}

      {currentUser && (
        <>
          <form onSubmit={handleSubmit} action="" className="border border-teal-500 rounded-md p-3">
            <Textarea
              placeholder="Addd a Comment..."
              rows={3}
              maxLength={400}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />

            <div className="flex justify-between items-center mt-5">
              <p className="text-slate-500 text-xs">
                {200 - comment.length} characters Remaining...
              </p>
              <Button type="submit" outline gradientDuoTone="purpleToBlue">
                Submit
              </Button>
            </div>
          </form>
          {commentError && <Alert color="failure" className="mt-5">{commentError}</Alert>}
        </>
      )}
      {commentArray?.length === 0 ? <>
      <p className="text-sm my-5 text-gray-400">No Comments Yet...</p>
      </>: <>
      <div className="flex gap-2 items-center mt-3">
        <p>Total Comments</p>
        <div className="w-10 h-10 flex justify-center items-center border border-teal-500 rounded-md hover:border-transparent hover:bg-teal-500 hover:text-white">
          <p className="text-center text-lg">{commentArray?.length}</p>
        </div>
      </div>

    {
      commentArray.map((comment) => (
        <Fragment key={comment._id}>
        <Comment comment = {comment}/>
        </Fragment>
      ))
    }

      </>}
    </div>
  );
};

export default CommentSection;
