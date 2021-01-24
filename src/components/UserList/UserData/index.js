import React from "react";

const UserData = ({ user }) => {
  return (
    <li>
      {user.name} cu varsta de {user.age} ani.
    </li>
  );
};

export default UserData;
