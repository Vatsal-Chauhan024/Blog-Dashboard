import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vatsal
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            adipisci suscipit temporibus ipsam cum quidem facilis assumenda
            aliquam. Pariatur, omnis.
          </p>
        </div>

        <div className="flex-1">
          <form action="" className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter Your Username"
                id="username"
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="Enter Your Email"
                id="email"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="text"
                placeholder="Enter Your Password"
                id="password"
              />
            </div>

    <Button gradientDuoTone="purpleToPink" type="submit">
      Signup
    </Button>
          </form>

    <div className="flex gap-2 text-sm mt-5">
      <span>Have an account</span>
      <Link to = "sign-in" className="text-blue-500 underline">Sign in</Link>
    </div>


        </div>
      </div>
    </div>
  );
};

export default Signup;
