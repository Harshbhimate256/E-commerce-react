import React from "react";
import Square from "./Square";
import NavBtnBg from "./NavBtnBg";
import Card from "./Card";
import Panel from "./Panel";
import DealCard from "./DealCard";
import CardSwiper from "./CardSwiper";
import ClockCard from "./ClockCard";
import BrandSlider from "./BrandSlider";
import BrandImgCard from "./BrandImgCard";
import Blogs from "./Blogs";
import Variety from "./Variety";
import Contact from "./Contact";

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
      trend2: "",
      trendColor: "#99BBAD",
      trendColor2: "",
      brand: "armani",
      title: "Cartoon Astronaut T-shirts",
      price: "$78",
      img: "../card-shirt1.jpg",
      imgHover: "../card-shirt1(hover).jpg",
    },
    {
      trend: "Hot",
      trend2: "",
      trendColor: "#FF75A0",
      trendColor2: "",
      brand: "armani",
      title: "Plain Striola Shirts",
      price: "$35",
      img: "../card-shirt2.jpg",
      imgHover: "../card-shirt2(hover).jpg",
    },
    {
      trend: "Hot",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
      brand: "armani",
      title: "Landscape Painting Shirt",
      price: "$55",
      img: "../card-shirt3.jpg",
      imgHover: "../card-shirt3(hover).jpg",
    },
    {
      trend: "",
      trend2: "",
      trendColor: "",
      trendColor2: "",
      brand: "adidas",
      title: "Letter Print T-Shirt",
      price: "$110",
      img: "../card-shirt4.jpg",
      imgHover: "../card-shirt4(hover).jpg",
    },
    {
      trend: "",
      trend2: "",
      trendColor: "",
      trendColor2: "",
      brand: "helix",
      title: "Element Pattern Print Shirt",
      price: "$150",
      img: "../card-shirt5.jpg",
      imgHover: "../card-shirt5(hover).jpg",
    },
    {
      trend: "Hot",
      trend2: "",
      trendColor: "#FF75A0",
      trendColor2: "",
      brand: "armani",
      title: "Henley Shirt",
      price: "$24",
      img: "../card-shirt6.jpg",
      imgHover: "../card-shirt6(hover).jpg",
    },
    {
      trend: "Sale",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
      brand: "armani",
      title: "Chen Cardigan",
      price: "$67",
      img: "../card-pant7.jpg",
      imgHover: "../card-pant7(hover).jpg",
    },
    {
      trend: "Sale",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
      brand: "adidas",
      title: "Chen Sweater",
      price: "$116",
      img: "../card-shirt8.jpg",
      imgHover: "../card-shirt8(hover).jpg",
    },
  ];
  const cardData2 = [
    {
      trend: "New",
      trend2: "",
      trendColor: "#99BBAD",
      trendColor2: "",
      brand: "armani",
      title: "Cartoon Astronaut T-shirts",
      price: "$78",
      img: "../card-shirt1.jpg",
      imgHover: "../card-shirt1(hover).jpg",
    },
    {
      trend: "Hot",
      trend2: "Sale",
      trendColor: "#FF75A0",
      trendColor2: "#A1CAE2",
      brand: "armani",
      title: "Plain Striola Shirts",
      price: "$35",
      img: "../card-shirt2.jpg",
      imgHover: "../card-shirt2(hover).jpg",
    },
    {
      trend: "Hot",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
      brand: "armani",
      title: "Landscape Painting Shirt",
      price: "$55",
      img: "../card-shirt3.jpg",
      imgHover: "../card-shirt3(hover).jpg",
    },
    {
      trend: "",
      trend2: "",
      trendColor: "",
      trendColor2: "",
      brand: "adidas",
      title: "Letter Print T-Shirt",
      price: "$110",
      img: "../card-shirt4.jpg",
      imgHover: "../card-shirt4(hover).jpg",
    },
    {
      trend: "",
      trend2: "",
      trendColor: "",
      trendColor2: "",
      brand: "helix",
      title: "Element Pattern Print Shirt",
      price: "$150",
      img: "../card-shirt5.jpg",
      imgHover: "../card-shirt5(hover).jpg",
    },
    {
      trend: "Best",
      trend2: "Sale",
      trendColor: "#FF75A0",
      trendColor2: "#FFAB73",
      brand: "armani",
      title: "Henley Shirt",
      price: "$24",
      img: "../card-shirt6.jpg",
      imgHover: "../card-shirt6(hover).jpg",
    },
    {
      trend: "Sale",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
      brand: "armani",
      title: "Chen Cardigan",
      price: "$67",
      img: "../card-pant7.jpg",
      imgHover: "../card-pant7(hover).jpg",
    },
    {
      trend: "Sale",
      trend2: "",
      trendColor: "#A1CAE2",
      trendColor2: "",
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
  const timerData = [
    {
      title : "Deal of the Day",
      para : "Limited quantities",
      heading : "Summer Collection New Modern Design",
      actualPrice  : "$160.99",
      offerPrice : "$139.00",
    },
    {
      title : "Men Clothing",
      para : "Shirt & Bag",
      heading : "Summer Collection New Modern Design",
      actualPrice  : "$256.99",
      offerPrice : "$178.00",
    },
  ]
  const BrandImgData=[
    {
      img : "../brand1.png"
    },
    {
      img : "../brand2.png"
    },
    {
      img : "../brand3.png"
    },
    {
      img : "../brand4.png"
    },
    {
      img : "../brand5.png"
    },
    {
      img : "../brand6.png"
    },
  ]
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
      <div className="cardSwiper-container">
          <CardSwiper/>
        <div className="cardSwiper-container-main">
          {cardData2.map((cardItem, index) => (
          <Card cardData={cardItem} />
        ))}
        </div>
      </div>
      <div className="clockCard-container">
        {timerData.map((timerdata,index)=>(
          <ClockCard timerData = {timerdata}/>
        ))}
      </div>
      <div className='brandSlider-container'>
        <BrandSlider/>
        <div className='brandingCard-container'>
          {BrandImgData.map((imgData,index)=>(
          <BrandImgCard imgdata={imgData}/>
          ))}
        </div>
      </div>
      <Blogs/>
      <Variety/>
      <Contact/>
    </>
  );
};

export default Foreground;
