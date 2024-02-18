import React from "react";

const NavBtn = ({data}) => {
  return (
    <>
        <button style={{color:`${data.colorTrue ? data.color: ''}`, cursor:"pointer", background:`${data.colorTrue ? data.backgroundColor : ""}`}} >{data.text}</button>
    </>
  );
};

export default NavBtn;
