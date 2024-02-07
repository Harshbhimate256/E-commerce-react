import React from "react";
import Square from "./Square";
const Foreground = () => {
  const data = [
    {
      heading: "Free Shipping",
      img: "../square-1.png",
      color: "#FDDDE4",
    },
    {
      heading: "Online Order",
      img: "../square-2.png",
      color: "#CDEBBC",
    },
    {
      heading: "Save Money",
      img: "../square-3.png",
      color: "#D1E8F2",
    },
    {
      heading: "Promotions",
      img: "../square-4.png",
      color: "#CDD4F8",
    },
    {
      heading: "Happy Sell",
      img: "../square-5.png",
      color: "#F6DBF6",
    },
    {
      heading: "24/7 Support",
      img: "../square-6.png",
      color: "#FFF2E5",
    },
  ];

  return (
    <div className="sq-background">
      {data.map((item, index) => (
        <Square data={item} />
      ))}
    </div>
  );
};

export default Foreground;
