import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const VehicleInfo = () => {
  const [open, setOpen] = useState();
  const location = useLocation();
  console.log(location.state);
  const data = location.state;
  return (
    <>
      <div className={`w-full grid ${open && "h-[80vh] overflow-hidden"}`}>
        <h1 className="text-lg font-bold bg-white p-4">Vehicle Information</h1>
        <div className="bg-white rounded-md my-3 p-2">
          <div className="space-y-3">
            <div className="flex p-4 justify-between border-b">
              <label className="mr-4">Vehicle Id</label>
              <div className="font-semibold">{data._id}</div>
            </div>
            <div className="flex p-4 justify-between border-b">
              <label className="mr-4">Vehicle Brand</label>
              <div className="font-semibold">{data.vehicleBrand}</div>
            </div>
            <div className="flex p-4 justify-between border-b">
              <label className="mr-4">Vehicle Model</label>
              <div className="font-semibold">{data.vehicleModel}</div>
            </div>
            <div className="flex p-4 justify-between border-b">
              <label className="mr-4">Vehicle Number</label>
              <div className="font-semibold">{data.vehicleNumber}</div>
            </div>
          </div>
          <div className="flex justify-around text-center py-4">
            <div
              onClick={() => setOpen(data.vehicleImg)}
              className="border cursor-pointer w-2/5 p-4 rounded space-y-4 h-full"
            >
              <img
                className="rounded w-full mx-auto h-80"
                src={data.vehicleImg}
                alt=""
              />
              <div className="text-lg font-semibold">Vehicle Image</div>
            </div>
            <div
              onClick={() => setOpen(data.vehicleInsurance)}
              className="border cursor-pointer w-2/5 p-4 rounded space-y-4 h-full"
            >
              <img
                className="rounded w-full mx-auto h-80"
                src={data.vehicleInsurance}
                alt=""
              />
              <div className="text-lg font-semibold">Vehicle Insurance</div>
            </div>
          </div>
          <div className="flex justify-around text-center py-4">
            <div
              onClick={() => setOpen(data.puc)}
              className="border cursor-pointer w-2/5 p-4 rounded space-y-4 h-full"
            >
              <img
                className="rounded w-full mx-auto h-80"
                src={data.puc}
                alt=""
              />
              <div className="text-lg font-semibold">PUC</div>
            </div>
            <div
              onClick={() => setOpen(data.vehicleRC)}
              className="border cursor-pointer w-2/5 p-4 rounded space-y-4 h-full"
            >
              <img
                className="rounded w-full mx-auto h-80"
                src={data.vehicleRC}
                alt=""
              />
              <div className="text-lg font-semibold">Vehicle RC</div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed grid place-items-center top-0 left-0 bg-[#000000ae] w-full h-screen overflow-y-scroll">
          <div className="bg-white w-full max-w-5xl rounded-md">
            <div className="flex justify-end text-3xl">
              <IoMdCloseCircleOutline
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
            <div className="p-4">
              <img className="mx-auto w-full h-full max-h-fit " src={open} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
