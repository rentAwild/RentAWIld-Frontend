/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  SidebarUserData,
  SidebarAdminData,
  SidebarCompanyData,
} from "./SideBarData";
import SubMenu from "./SubMenu";
import Logo from "../../assets/rentAwild-logo.png";
import LogoUser from "../../assets/welcome-logo.png";
import "./SideBar.css";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

function Sidebar(props) {
  const [sidebar, setSidebar] = useState(true);
  console.log(props);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav className="nav">
        <div className="nav-welcome">
          <p className="welcome-text">Hello {props.type}</p>
          <img alt="user" className="welcome-logo" src={LogoUser} />
        </div>
        <NavIcon to="#">
          <FaIcons.FaBars
            className="burguer-icon" /* onClick={showSidebar} */
          />
        </NavIcon>
      </Nav>
      <div className="logo-container">
        <img alt="logo" className="logo" src={Logo} />
      </div>
      <SidebarNav className="nav-bar" sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#">
            {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> */}
          </NavIcon>
          {props.type === "company"
            ? SidebarCompanyData.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <SubMenu item={item} key={index} />;
              })
            : props.type === "admin"
            ? SidebarAdminData.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <SubMenu item={item} key={index} />;
              })
            : SidebarUserData.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <SubMenu item={item} key={index} />;
              })}
          {/* {" "}
          {SidebarData.map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <SubMenu item={item} key={index} />;
          })}{" "} */}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
}

export default Sidebar;
