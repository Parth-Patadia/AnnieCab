import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoReorderThreeSharp } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export const Dashbord = () => {
  const [open, setOpen] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (id) {
      (async () => {
        await axios
          .get(`https://sparkstoideas.daddy11.in/admin/adminGet/${id}`)
          .then((res) => {
            if (res.data.success == 1) {
            } else {
              navigate("/admin/login");
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/admin/login");
          });
      })();
    } else {
      navigate("/admin/login");
    }
  });
  return (
    <div className="flex w-full">
      <div
        className={`w-full ${open ? "max-w-[288px]" : "max-w-[80px]"
          } duration-300`}
      >
        <div
          className={`h-screen w-full ${open ? "max-w-[288px]" : "max-w-[80px]"
            }  fixed min pt-7 px-4 text-white bg-slate-800 duration-300`}
        >
          <div className="flex">
            <img
              className={`bg-white h-auto rounded-md ${!open && "rotate-[360deg] duration-300"
                }`}
              src={require("../asset/logo.png")}
              alt=""
            />
          </div>
          <div className="p-2 mt-5">
            <ul className="space-y-4">
              <li
                onClick={() => navigate("/admin")}
                className="flex items-center cursor-pointer hover:text-green-300"
              >
                <span className=" text-3xl">
                  <AiOutlineDashboard />
                </span>
                <span className={`mx-6 duration-300 ${!open && "scale-0"}`}>
                  Dashboard
                </span>
              </li>
              <li
                onClick={() => navigate("userlist")}
                className="flex items-center cursor-pointer hover:text-green-300"
              >
                <span className=" text-3xl">
                  <BiUser />
                </span>
                <span className={`mx-6 duration-300 ${!open && "scale-0"}`}>
                  User
                </span>
              </li>
              <li
                onClick={() => navigate("vendorlist")}
                className="flex items-center cursor-pointer hover:text-green-300"
              >
                <span className=" text-3xl">
                  <BiUser />
                </span>
                <span className={`mx-6 duration-300 ${!open && "scale-0"}`}>
                  Vendor
                </span>
              </li>
              
              <li
                onClick={() => navigate("contact")}
                className="flex items-center cursor-pointer hover:text-green-300"
              >
                <span className=" text-3xl">
                  <BiSolidMessageSquareDetail />
                </span>
                <span className={`mx-6 duration-300 ${!open && "scale-0"}`}>
                  Contact Details
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-[#f3f3f1]">
        <div className="flex bg-white border-b items-center p-3">
          {open ? (
            <IoReorderThreeSharp
              onClick={() => setOpen(false)}
              className={` cursor-pointer text-2xl text-black top-3 -left-3`}
            />
          ) : (
            <BsArrowLeft
              onClick={() => setOpen(true)}
              className={` rotate-180 cursor-pointer text-2xl text-black top-3 -left-3`}
            />
          )}
          <div className="ml-auto">
            <div
              onClick={() => setDropdown(!dropdown)}
              className="cursor-pointer flex space-x-2 items-center"
            >
              <div>
                <img
                  className="w-10 h-10 object-cover border rounded-full" alt=""
                  src={require("../asset/animation_loh24k7f_small.gif")}
                />
              </div>
              <div className="">
                <div className="text-sm font-medium">Admin</div>
              </div>
            </div>
            {dropdown && (
              <div className="absolute z-50 bg-white rounded-md border p-2 right-5 mt-2">
                <div className="space-y-2 p-2">
                  <ul
                    onClick={() => {
                      setDropdown(false);
                      navigate("/admin/profile");
                    }}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <span>
                      <HiUserCircle className="text-xl mr-2" />
                    </span>
                    Profile
                  </ul>
                  <ul
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/");
                    }}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <span>
                      <RiLogoutBoxRFill className="text-xl mr-2" />
                    </span>
                    Logout
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-4 bg-[#f3f3f1]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
