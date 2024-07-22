import React, { useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageeUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please Select Image File..");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageeUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Error Uploading Image...");
          setImageeUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageeUploadProgress(null);
            setFormData({
              ...formData,
              image: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Uploading Failed");
      setImageeUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a Post
        </h1>
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={` ${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>

              {imageUploadError && (
                <Alert color="failure">{imageUploadError}</Alert>
              )}

              {
                formData.image && (
                    <img src={formData.image} className="w-full h-72 object-cover" alt="error-blog-cover"/>
                )
              }

          <ReactQuill
            theme="snow"
            placeholder="Write Something...."
            className="h-72 mb-12"
            required
          />
          <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
