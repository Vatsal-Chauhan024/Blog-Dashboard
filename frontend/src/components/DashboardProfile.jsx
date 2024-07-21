import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess
} from "../store/user/UserSlice";
import {HiOutlineExclamationCircle} from "react-icons/hi"

const DashboardProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image.");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setUpdateUserSuccess(null);
    setErrorMsg(null);

    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      return;
    }
    if (imageFileUploading) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setErrorMsg(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Updated SuccessFully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setErrorMsg(error);
    }
  };

  const handleDeleteUser =async () => {
    setShowModal(false)
    
  try {
    
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: "DELETE"
    })
    const data = await res.json()

    if(!res.ok){
      dispatch(deleteUserFailure(data.message))
    }
    else {
      dispatch(deleteUserSuccess(data))
    }

  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
    
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={filePickerRef}
        />
        <div
          className="w-32 h-32 mx-auto cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62m 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="error-user"
            className="w-full h-full border-8 border-gray-100 rounded-full"
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">Error Uploading File</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue="********"
          onChange={handleChange}
        />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>

      <div className="text-red-500 *:cursor-pointer flex justify-between mt-5 *:font-semibold hover:*:underline *:underline-offset-2">
        <span onClick={() => setShowModal(true)}>Delete Account</span>
        <span>Sign Out</span>
      </div>

      {updateUserSuccess ? (
        <Alert color="success" className="mt-3">
          {updateUserSuccess}
        </Alert>
      ) : (
        errorMsg && (
          <Alert color="failure" className="mt-3">
            {errorMsg}
          </Alert>
        )
      )}

      {error &&  <Alert color="failure" className="mt-3">
            {error}
          </Alert>}


      <Modal show = {showModal} onClose={() => setShowModal(false)} popup size="md">
      <Modal.Header />
      <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="h-14 w-14 text-slate-600 dark:text-slate-200 mb-4 mx-auto"/>
        <h3 className="mb-5 text-lg text-slate-500 dark:text-slate-300 capitalize">Are you sure?</h3>
        <div className="flex justify-center gap-5">
          <Button color="failure" onClick={handleDeleteUser}>I am Sure</Button>
          <Button color="blue" onClick={() => setShowModal(false)}>Cancel</Button>
        </div>
      </div>
      </Modal.Body>
      </Modal>

    </div>
  );
};

export default DashboardProfile;
