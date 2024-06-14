"use client";
import axios from "axios";
import Link from "next/link";
import "./style.css";
import logo from '../../img/logo.png'
import img1 from '../../img/36b305d19388f346e3d0617b44b866246105dbc4-2880x1040.webp'
import img2 from '../../img/mts-1716886627.png'
import img5 from '../../img/sneakers-1716886573.png'
import img6 from '../../img/traning-1716886716.png'
import img7 from '../../img/tshirt-1716886666.png'
import img8 from '../../img/MicrosoftTeams-image (129)-1716891745.png'

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const logout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetail = async () => {
    const res = await axios.get("api/users/me");

    console.log(res.data);
    setData(res.data.data._id);
  };

  // const handleDropdownToggle = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  // const handleMenuToggle = () => {
  //   setIsMenuOpen((prev) => !prev);
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
    <div className="Nav">
      <div className="logo">
      <Image className="logo-img"
      src={logo}
      alt="Landscape picture"
      width={800}
      height={300}
    />      </div>
      
      <div className="Nav-menu">
        <Link className="Navlink" href="/">
          Home
        </Link>
        
        <Link className="Navlink" href="/order">
          Orders
        </Link>
        <Link className="Navlink" href="/Store">
          Store
        </Link>
        <Link className="Navlink" href="/Profile">
          Profile
        </Link>

        <h2 className="p-1 rounded bg-green-500">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>

        {/* <button onClick={getUserDetail}>Get Detail</button> */}
        <button className="logout-btn" onClick={logout}>Logout</button>

        <div className="icons-part">
          <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          <i className="fa-regular fa-heart fa-xl"></i>
          {/* <Link className="Navlink" to="/cart">
            <img className="bag" src={bag} alt="Cart" />
          </Link>*/}
        </div>
      </div>
    </div>
    <Image className="img1"
      src={img1}
      alt="Landscape picture"
      // width={''}
      // height={}
    />  
    <div className="cat-img">
    
  <Image
    className="profile-img"
    src={img2}
    alt="Landscape picture"
    width={100}
    height={300}
      />
  <Image
    className="profile-img"
    src={img7}
    alt="Landscape picture"
    width={100}
    height={300}
      />
  <Image
    className="profile-img"
    src={img8}
    alt="Landscape picture"
    width={100}
    height={300}
      />
  <Image
    className="profile-img"
    src={img5}
    alt="Landscape picture"
    width={100}
    height={300}
      />
  <Image
    className="profile-img"
    src={img6}
    alt="Landscape picture"
    width={100}
    height={300}
      />
    </div>

    </div>
  );
}

function handleClickOutside(this: Document, ev: MouseEvent) {
  throw new Error("Function not implemented.");
}
