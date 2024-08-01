import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";


export const Dash = () => {
  const [user, setUser] = useState("Loading...")
  const [vendor, setVendor] = useState("Loading...")
  const [data, setData] = useState()
  const [Verification, setVerification] = useState("Loading...")
  useEffect(() => {
    (async () => {
      await axios
        .get("https://sparkstoideas.daddy11.in/user/getAlldata")
        .then((res) => {
          setUser(res.data.data.length);
        })
        .catch((err) => console.log(err));
    })();
  });

  useEffect(() => {
    (async () => {
      await axios
        .get("https://sparkstoideas.daddy11.in/vender/allVenders")
        .then((res) => {
          setData(res.data.result);
          setVendor(res.data.result.length);
        })
        .catch((err) => console.log(err));
    })();
  });

  useEffect(() => {
    if (data) {
      const arr = [];
      data.reverse().map((e, i) => {
        if (e.verification == "Pending") {
          arr.push(e);
        }
      });
      setVerification(arr.length);
    }
  });

  return (
    <div className='flex w-full justify-around'>
      <div className='border w-full rounded-md flex justify-between h-full items-center max-w-xs bg-white p-4'>
        <div>
          <div className='text-lg font-medium'>Total User</div>
          <div className='text-3xl font-bold'>{user}</div>
        </div>
        <div className='bg-blue-100 p-4 rounded-xl'>
          <FaUser className='text-4xl text-blue-700' />
        </div>
      </div>
      <div className='border w-full rounded-md flex justify-between h-full items-center max-w-xs bg-white p-4'>
        <div>
          <div className='text-lg font-medium'>Total Vendor</div>
          <div className='text-3xl font-bold'>{vendor}</div>
        </div>
        <div className='bg-blue-100 p-4 rounded-xl'>
          <FaUser className='text-4xl text-blue-700' />
        </div>
      </div>
      
    </div>
  )
}
