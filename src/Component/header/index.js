import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Navbar expand="lg" style={{ backgroundColor: "#98144d", width:"40%", clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)", position: "absolute"}}>
        <Container>
          <Navbar.Brand style={{ display: "flex", flexDirection: "row" }}>
            <img
              src="/logo192.png"
              width="120"
              height="30"
              className="d-inline-block align-top"
              alt="library Management logo"
            />{' '}
            <span style={{ color: "white", marginLeft: "15px", marginBottom: "5px", fontWeight: "150px" }}>Data Analytics Dashboard</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div style={{ display: "flex", width:"100%" }}>
        <div style={{ backgroundColor: "#98144d", width:"100%", height:"20px" }}></div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Header;
