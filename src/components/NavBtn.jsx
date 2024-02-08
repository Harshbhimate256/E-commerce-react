import React from "react";

const NavBtn = ({data}) => {
  return (
    <>
        <button style={{color:`${data.colorTrue ? data.color: ''}`, cursor:"pointer"}} >{data.text}</button>
    </>
  );
};

export default NavBtn;
