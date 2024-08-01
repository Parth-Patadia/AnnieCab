import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

export const Vehicle = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname

  useEffect(() => {
    (async () => {
      await axios
        .post("https://sparkstoideas.daddy11.in/addVehicle/getVehicleId", {
          vendorID: location.state,
        })
        .then((res) => {
          setData(res.data.result);
          console.log(res.data.result);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const ab = (e) => {
    if (path == "/admin/vehicle") {
      navigate("/admin/vehicle_info", { state: e })
    }
  }
  return (
    <>
      {loader && <Loader />}
      <div className="bg-white">
        {data?.length > 0 ? (
          <>
            <div className="p-4 underline underline-offset-4">
              Total Car {data?.length}
            </div>
            <div className="flex flex-wrap">
              {data.reverse().map((e, i) => {
                return (
                  <div
                    onClick={() => ab(e)}
                    className="w-1/2 grid p-4 place-items-center"
                    key={i}
                  >
                    <div className="w-full max-w-sm p-4 border rounded-md hover:border-slate-400 cursor-pointer">
                      <img src={e.vehicleImg} className="rounded-2xl w-full h-56 object-contain object-center p-2  " />
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">vehicleName</h3>
                        <p>{e.vehicleBrand} - {e.vehicleModel}</p>
                      </div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">vehicleNumber</h3>
                        <p>{e.vehicleNumber}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-xl font-semibold">
            No Vehicle Available
          </div>
        )}
      </div>
    </>
  );
};
