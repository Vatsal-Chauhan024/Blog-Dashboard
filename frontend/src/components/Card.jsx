import React from "react";

const Card = ({
  primaryHeading,
  primaryHeadingValue,
  iconValue,
  secondIconValue,
  secondaryHeading,
  tertiaryHeading,
  className
}) => {
  return (
    <>
      <div className="flex flex-col p-3 bg-white hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-950 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="uppercase text-2xl">{primaryHeading}</h3>
            <p className="text-slate-600 dark:text-gray-500 font-bold text-4xl">{primaryHeadingValue}</p>
          </div>
          <div className={`${className} text-white rounded-full flex items-center justify-center h-10 w-10 shadow-lg`}>
            {iconValue}
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-green-500 flex items-center">
            {secondIconValue}
            {secondaryHeading}
          </span>
          <div className="text-gray-500">{tertiaryHeading}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
