import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null)
  const [comment, setComment] = useState("");

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
      }
    } catch (error) {
     console.log(error)
     setCommentError(error.message)
    }
  };

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
        </>
      )}
    </div>
  );
};

export default CommentSection;
