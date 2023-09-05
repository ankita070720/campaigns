import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";


function Header(props) {
  return (
<header>
    <MDBContainer>
    <div className='p-5  bg-light'>
    <h3 className='mb-3'>Campaigns List View</h3>
   </div>
  </MDBContainer> 
</header>
  );
}
export default Header;