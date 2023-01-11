import React from "react";

function SideBar() {
  return (
    <div className="sideBar">
      <ul>
        <li>
          Cars
          <ul>
            <li>Available</li>
            <li>Booked</li>
            <li>Maintenance</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
