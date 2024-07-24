import React from "react";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const CommonTable = ({
  primaryHeading,
  linktoTab,
  linkValue,
  btnColor,
  tableHeading1,
  tableHeading2,
  tableHeading3,
  dataArray,
}) => {
  return (
    <>
      {tableHeading3 ? (
        <>
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">{primaryHeading}</h1>
            <Button outline gradientDuoTone={btnColor}>
              <Link to={linktoTab} className="w-full h-full">
                {linkValue}
              </Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>{tableHeading1}</Table.HeadCell>
              <Table.HeadCell>{tableHeading2}</Table.HeadCell>
              <Table.HeadCell>{tableHeading3}</Table.HeadCell>
            </Table.Head>
            {dataArray?.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:boreder-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt="user-icon"
                      className="w-14 h-10 rounded-md bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-96">{post.title}</Table.Cell>
                  <Table.Cell className="w-5">{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <>
          {" "}
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">{primaryHeading}</h1>
            <Button outline gradientDuoTone={btnColor}>
              <Link to={linktoTab} className="w-full h-full">
                {linkValue}
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>{tableHeading1}</Table.HeadCell>
              <Table.HeadCell>{tableHeading2}</Table.HeadCell>
            </Table.Head>
            {dataArray?.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:boreder-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt="user-icon"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      )}
    </>
  );
};

export default CommonTable;
