import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="upper-nav">
          <img src="./panda.svg" class="img-fluid rounded-top" alt="" />
          <div className="search-box">
            <select>
              <option>All category</option>
              <option>Womens's</option>
              <option>Men's</option>
              <option>Cellphones</option>
              <option>Computer</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Home & Garden</option>
              <option>Luggage</option>
              <option>Shoes</option>
            </select>
            <span>
              <FiSearch />
            </span>
            <input type="search" placeholder="search" />
          </div>
          <div className="nav-icons">
            <FaUser />
            <IoIosHeartEmpty />
            <FiShoppingCart />
          </div>
        </div>
        <div className="lower-nav"></div>
      </div>
    </>
  );
}

export default Navbar;
