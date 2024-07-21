import { Footer, FooterDivider } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FooterArray, FooterIconsArray } from "../assets/data/Footer";

const FooterComponent = () => {
  return (
    <Footer container className="border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid sm:gap-3 w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Vatsal
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-3 sm:gap-5">
            {FooterArray.map((elem, i) => (
              <div key={i}>
                <Footer.Title title={elem.title} />
                <Footer.LinkGroup col>
                  {elem.innerElements?.map((innerElem) => (
                    <Footer.Link href={innerElem.elementLink} key={innerElem.elementText}>
                      {innerElem.elementText}
                    </Footer.Link>
                  ))}
                </Footer.LinkGroup>
              </div>
            ))}
          </div>
        </div>

        <FooterDivider />
        <div className="w-full items-center flex flex-col sm:flex-row gap-5 sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Vatsal Chauhan"
            year={new Date().getFullYear()}
          />
          <div className="flex items-center gap-5">
            {FooterIconsArray.map((elem, i) => (
              <Footer.Icon
              key={i}
                href={elem.itemLink}
                icon={elem.icon}
                className={elem.hoverColor}
              />
            ))}
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
