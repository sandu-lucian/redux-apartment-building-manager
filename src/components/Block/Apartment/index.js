import React from "react";

import "./styles.css";

const Apartment = ({ number, isOccupied, user }) => {
  if (isOccupied) {
    return (
      <div className="used-apartment">
        <span>{number}</span>
        <span>{user.name}</span>
      </div>
    );
  }

  return <div className="unused-apartment">{number}</div>;
};

export default Apartment;
