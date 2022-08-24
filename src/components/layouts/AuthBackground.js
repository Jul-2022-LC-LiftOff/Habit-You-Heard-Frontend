import React from "react";
import { Outlet } from "react-router";

function AuthBackground(props) {
  console.log(props);
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.discordapp.com/attachments/1004931241138737212/1007071579206860931/Untitled162_20220810184229.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
}

export default AuthBackground;
