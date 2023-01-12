import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

// eslint-disable-next-line import/prefer-default-export
export const SidebarUserData = [
  {
    title: "Cars Overview",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: " My Bookings",
    path: "/bookings",
    icon: <IoIcons.IoIosPaper />,
  },
];
export const SidebarCompanyData = [
  {
    title: "Fleet Overview",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Fleet Bookings",
    /* path: "/reports", */
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Manage Fleet",
    /* path: "/products", */
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: "Account",
    /* path: "/team", */
    icon: <IoIcons.IoMdPeople />,
  },
];
export const SidebarAdminData = [
  {
    title: "Client Overview",
    /* path: "/overview", */
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Company Overview",
    /* path: "/reports", */
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Account",
    /* path: "/team", */
    icon: <IoIcons.IoMdPeople />,
  },
];
