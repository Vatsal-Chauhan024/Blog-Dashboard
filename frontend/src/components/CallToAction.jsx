import React from "react";
import {Button} from "flowbite-react"

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl">Want To Learn More about JavaScript ?</h2>
        <p className="text-gray-400 my-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quos voluptatem officiis laborum vitae ipsam unde ad similique voluptas saepe!</p>
        <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">Learn More</Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="error-blog-post" className="rounded-md"
        />
      </div>
    </div>
  );
};

export default CallToAction;
