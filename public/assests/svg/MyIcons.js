import React from "react";
const MyIcons = () => (
  <React.Fragment>
    <svg
      style={{ display: "none" }}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{
        __html: `
            <symbol id="icon-arrow" viewBox="0 0 24 24">
            <path
           d="M8.094 2.814l9.092 9.186-9.092 9.186-1.244-1.207 7.979-7.979-7.979-7.979 1.244-1.207zm.028-2.814l-4.122 4 8 8-8 8 4.122 4 11.878-12-11.878-12z"
            fill="white"
          ></path>
            </symbol>
          `,
      }}
    />
  </React.Fragment>
);
export default MyIcons;