import React from "react";
import Square from "./Square";
import NavBtnBg from "./NavBtnBg";
import Card from "./Card";
import Panel from "./Panel";
import DealCard from "./DealCard";

const Foreground = () => {
  const data = [
    {
      heading: "Free Shipping",
      img: "../square-1.png",
      bgColor: "#FDDDE4",
      color: "#08819A",
    },
    {
      heading: "Online Order",
      img: "../square-2.png",
      bgColor: "#CDEBBC",
      color: "#08838C",
    },
    {
      heading: "Save Money",
      img: "../square-3.png",
      bgColor: "#D1E8F2",
      color: "#08838C",
    },
    {
      heading: "Promotions",
      img: "../square-4.png",
      bgColor: "#CDD4F8",
      color: "#08838C",
    },
    {
      heading: "Happy Sell",
      img: "../square-5.png",
      bgColor: "#F6DBF6",
      color: "#08838C",
    },
    {
      heading: "24/7 Support",
      img: "../square-6.png",
      bgColor: "#FFF2E5",
      color: "#08838C",
    },
  ];
  const cardData = [
    {
      trend: "New",
      trendColor: "#99BBAD",
      brand: "armani",
      title: "Cartoon Astronaut T-shirts",
      price: "$78",
      img: "../card-shirt1.jpg",
      imgHover: "../card-shirt1(hover).jpg",
    },
    {
      trend: "Hot",
      trendColor: "#FF75A0",
      brand: "armani",
      title: "Plain Striola Shirts",
      price: "$35",
      img: "../card-shirt2.jpg",
      imgHover: "../card-shirt2(hover).jpg",
    },
    {
      trend: "Hot",
      trendColor: "#A1CAE2",
      brand: "armani",
      title: "Landscape Painting Shirt",
      price: "$55",
      img: "../card-shirt3.jpg",
      imgHover: "../card-shirt3(hover).jpg",
    },
    {
      trend: "",
      trendColor: "",
      brand: "adidas",
      title: "Letter Print T-Shirt",
      price: "$110",
      img: "../card-shirt4.jpg",
      imgHover: "../card-shirt4(hover).jpg",
    },
    {
      trend: "",
      trendColor: "",
      brand: "helix",
      title: "Element Pattern Print Shirt",
      price: "$150",
      img: "../card-shirt5.jpg",
      imgHover: "../card-shirt5(hover).jpg",
    },
    {
      trend: "Hot",
      trendColor: "#FF75A0",
      brand: "armani",
      title: "Henley Shirt",
      price: "$24",
      img: "../card-shirt6.jpg",
      imgHover: "../card-shirt6(hover).jpg",
    },
    {
      trend: "Sale",
      trendColor: "#A1CAE2",
      brand: "armani",
      title: "Chen Cardigan",
      price: "$67",
      img: "../card-pant7.jpg",
      imgHover: "../card-pant7(hover).jpg",
    },
    {
      trend: "Sale",
      trendColor: "#A1CAE2",
      brand: "adidas",
      title: "Chen Sweater",
      price: "$116",
      img: "../card-shirt8.jpg",
      imgHover: "../card-shirt8(hover).jpg",
    },
  ];
  const DealCardData =[
    {
      title : "Smart Offer",
      heading : "Save 20% on Woman Bag",
      img : "../deal-card1.png",
    },
    {
      title : "Sale off",
      heading : "Great Summer Collection",
      img : "../deal-card2.png",
    },
    {
      title : "New Arrivals",
      heading : "Shop Today's Deals & Offers",
      img : "../deal-card3.png",
    },
  ];
  return (
    <>
      <div className="sq-background">
        {data.map((item, index) => (
          <Square data={item} />
        ))}
      </div>
      <NavBtnBg />
      <div className="card-container">
        {cardData.map((cardItem, index) => (
          <Card cardData={cardItem} />
        ))}
      </div>
      <Panel/>
      <div className='DealCard-container'>
        {DealCardData.map((DealItem,index)=>(
          <DealCard DealData = {DealItem}/>
        ))}
      </div>
    </>
  );
};

export default Foreground;
