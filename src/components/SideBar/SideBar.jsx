import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import Logo from "../../assets/rentAwild-logo.png";
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

function Sidebar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavIcon to="#">
          <FaIcons.FaBars /* onClick={showSidebar} */ />
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
          {SidebarData.map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
}

export default Sidebar;
