import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsGithub,
    BsLinkedin,
  } from "react-icons/bs";

export const FooterArray = [
  {
    title: "About",
    innerElements: [
      {
        elementLink: "#",
        elementText: "100 JS Project",
      },
      {
        elementLink: "#",
        elementText: "Frontend Developer Blogs",
      },
    ],
  },
  {
    title: "Follow Us",
    innerElements: [
      {
        elementLink: "#",
        elementText: "Github",
      },
      {
        elementLink: "#",
        elementText: "LinkedIn",
      },
    ],
  },
  {
    title: "Legal",
    innerElements: [
      {
        elementLink: "#",
        elementText: "Privacy Policy",
      },
      {
        elementLink: "#",
        elementText: "Terms & Conditions",
      },
    ],
  },
];


export const FooterIconsArray = [
    {
        icon: BsFacebook,
        itemLink: "#",
        hoverColor: "text-blue-500"
    },
    {
        icon: BsInstagram,
        itemLink: "#",
        hoverColor: "text-pink-500"
    },
    {
        icon: BsTwitter,
        itemLink: "#",
        hoverColor: "text-black"
    },
    {
        icon: BsGithub,
        itemLink: "#",
        hoverColor: "text-black"
    },
    {
        icon: BsLinkedin,
        itemLink: "#",
        hoverColor: "text-blue-500"
    }
]