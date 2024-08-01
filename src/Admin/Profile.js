import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState();
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmnewpassword] = useState("");
  const id = sessionStorage.getItem("session_id");

  useEffect(() => {
    (async () => {
      await axios
        .get(`https://sparkstoideas.daddy11.in/admin/adminGet/${id}`)
        .then((res) => setData(res.data.result))
        .catch((err) => console.log(err));
    })();
  }, []);
  console.log(data);

  useEffect(() => {
    if (data) {
      setFirstname(data.firstName);
      setLastname(data.lastName);
      setEmail(data.email);
    }
  }, [data]);

  const update = async () => {
    const data = { firstName, lastName, email };
    console.log(data);
    await axios
      .patch(`https://sparkstoideas.daddy11.in/admin/updateProfile/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.success == 1) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const changepassword = async () => {
    const Pdata = { password, newPassword, confirmnewpassword };
    console.log(Pdata);
    if (newPassword == confirmnewpassword) {
      await axios
        .post(`https://sparkstoideas.daddy11.in/admin/changePassword/${id}`, {
          password,
          newPassword,
        })
        .then((res) => alert(res.data.message))
        .catch((err) => console.log(err));
    } else {
      alert("Please Enter Newpassword and Confirmpassword Are Same");
    }
  };
  return (
    <>
      <div className="bg-white py-10 rounded-md">
        <img
          className="w-24 h-24 rounded-full object-cover mx-auto" alt=""
          src={require("../asset/animation_loh24k7f_small.gif")}
        />
        <div className="text-center font-semibold">
          {data?.firstName} {data?.lastName}
        </div>
      </div>
      <div className="flex my-4 space-x-10">
        <div
          onClick={() => setOpen(true)}
          className={`p-2 rounded cursor-pointer ${
            open && "bg-slate-800 text-white"
          } `}
        >
          Personal Details
        </div>
        <div
          onClick={() => setOpen(false)}
          className={`p-2 rounded cursor-pointer ${
            !open && "bg-slate-800 text-white"
          }`}
        >
          Change Password
        </div>
      </div>
      <div className="bg-white p-4">
        {open ? (
          <div className="space-y-4">
            <div className="font-medium">Personal Details</div>
            <div className="flex w-full space-x-4">
              <div className="grid w-full space-y-2">
                <label>First Name</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstName}
                  type="text"
                />
              </div>
              <div className="grid w-full space-y-2">
                <label>Last Name</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastName}
                  type="text"
                />
              </div>
              <div className="grid w-full space-y-2">
                <label>Email Address</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={update}
                className="bg-blue-600 font-medium text-white p-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="font-medium">Change Password</div>
            <div className="flex w-full space-x-4">
              <div className="grid w-full space-y-2">
                <label>Old Password</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
              <div className="grid w-full space-y-2">
                <label>New Password</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setNewpassword(e.target.value)}
                  value={newPassword}
                  type="password"
                />
              </div>
              <div className="grid w-full space-y-2">
                <label>Confirm New Password</label>
                <input
                  className="border p-1 rounded"
                  onChange={(e) => setConfirmnewpassword(e.target.value)}
                  value={confirmnewpassword}
                  type="password"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={changepassword}
                className="bg-blue-600 font-medium text-white p-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
