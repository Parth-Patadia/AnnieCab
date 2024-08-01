import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Admin_login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await axios
      .post("https://sparkstoideas.daddy11.in/admin/login", data)
      .then((res) => setInfo(res)
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    localStorage.clear();
    
  }, []);

  useEffect(() => {
    if (info) {
      console.log(info);
      if (info.data.success == 1) {
        sessionStorage.setItem("session_id", info.data.Id);
        sessionStorage.setItem("last_login", info.data.time);
        navigate("/admin");
      } else {
        setMessage(info.data.message);
      }
    }
  }, [info]);

  return (
    <div className="w-full h-screen bg-gray-300 grid place-items-center">
      <div
        style={{ boxShadow: "0 50px 50px -50px darkslategray" }}
        className="border rotate-180 w-full max-w-xl bg-[#f3f3f1] p-4 rounded-md"
      >
        <div className="w-full my-2 flex">
          <form
            onSubmit={login}
            className="space-y-10 rotate-180 w-full grid p-4"
          >
            <div className="text-xl font-semibold mx-auto">ADMIN LOGIN</div>
            <div className="space-y-6 w-full">
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 w-full font-mono border-gray-600 bg-transparent focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <div>
                <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-2 w-full font-mono border-gray-600 bg-transparent focus:outline-none" type="password" placeholder="Password"/>
                <div className="text-red-500 font-medium text-xs">
                  {message}
                </div>
              </div>
            </div>
            <div className="w-full">
              <button className="bg-black rounded-md w-full text-white p-1">
                LOGIN
              </button>
            </div>
          </form>
          <div
            style={{
              backgroundImage: `url(${require("../asset/animation_loh24k7f_small.gif")})`,
            }}
            className="border-2 rotate-180 rounded-md w-full bg-cover bg-center grid place-items-center"
          >
            <img className="ro" src={require("../asset/logo.png")} />
          </div>
        </div>
      </div>
    </div>
  );
};
