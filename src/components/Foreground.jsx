import React from "react";
import Square from "./Square";
import NavBtnBg from "./NavBtnBg";
import Card from "./Card";
const Foreground = () => {
  const data = [
    {
      heading: "Free Shipping",
      img: "../square-1.png",
      bgColor: "#FDDDE4",
      color:"#08819A",
    },
    {
      heading: "Online Order",
      img: "../square-2.png",
      bgColor: "#CDEBBC",
      color:"#08838C",
    },
    {
      heading: "Save Money",
      img: "../square-3.png",
      bgColor: "#D1E8F2",
      color:"#08838C",
    },
    {
      heading: "Promotions",
      img: "../square-4.png",
      bgColor: "#CDD4F8",
      color:"#08838C",
    },
    {
      heading: "Happy Sell",
      img: "../square-5.png",
      bgColor: "#F6DBF6",
      color:"#08838C",
    },
    {
      heading: "24/7 Support",
      img: "../square-6.png",
      bgColor: "#FFF2E5",
      color:"#08838C",
    },
  ];
  
  return (
    <>
      <div className="sq-background">
        {data.map((item, index) => (
          <Square data={item} />
        ))}
      </div>
      <NavBtnBg/>
      <Card/>
    </>
  );
};

export default Foreground;
