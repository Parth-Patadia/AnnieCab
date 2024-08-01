import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Details = () => {
    const [data, setData] = useState()
    const location = useLocation()

    useEffect(() => {
        (async () => {
            if (location.state.type == "user") {
                await axios.get(`https://sparkstoideas.daddy11.in/user/userdata/${location.state.Id}`)
                    .then(res => {
                        setData(res.data.data)
                    })
                    .catch(err => console.log(err))
            }
            if (location.state.type == "vendor") {
                await axios.get(`https://sparkstoideas.daddy11.in/vender/getVender/${location.state.Id}`)
                    .then(res => {
                        console.log(res)
                        setData(res.data.data)
                    })
                    .catch(err => console.log(err))
            }
        })()
    })

    if (location.state.type == "user") {
        return (
            <>
                {data && <div className='w-full flex'>
                    <div className='w-1/3'>
                        <h1 className='text-lg font-bold bg-blue-50 px-4 py-2'>Personal Information</h1>
                        <div className='bg-white rounded-md my-3 p-2'>
                            <div className='text-center py-4'>
                                {data.profile == null ? <img className='w-20 h-20 mx-auto rounded-full' src={require("../asset/user.jpg")} alt='' /> : <img className='w-20 h-20 mx-auto rounded-full' src={data.profile} alt='' />}

                                <div className='text-2xl font-semibold'><span>{data.firstName}</span><span> {data.lastName}</span></div>
                            </div>
                            <div className='space-y-3'>
                                <div>
                                    <label className='text-gray-400 text-sm'>Email</label>
                                    <div className='text-sm'>{data.email}</div>
                                </div>
                                <div>
                                    <label className='text-gray-400 text-sm'>Phone</label>
                                    <div className='text-sm'>{data.phno}</div>
                                </div>
                                <div>
                                    <label className='text-gray-400 text-sm'>Address</label>
                                    {data.address == "" ? <div className='text-sm'>null</div> : <div className='text-sm'>{data.address}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/3 px-4'>
                        <h1 className='text-lg font-bold bg-blue-50 px-4 py-2'>Contact Details</h1>
                        <div className='bg-white rounded-md my-3 p-2'>
                            <div className='space-y-3 py-2'>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Account Role</label>
                                    <div className='text-sm'>{location.state.type}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Profile Id</label>
                                    <div className='text-sm'>{data._id}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Create At</label>
                                    <div className='text-sm'>{data.createAt}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Account Last Login</label>
                                    {data.lastLoggedin == null ? <div className='text-sm'>null</div> : <div className='text-sm'>{data.lastLoggedin}</div>}
                                </div>
                                

                                <div className='flex justify-between p-2'>
                                    <label className='text-gray-400 text-sm'>Account LoginStatus</label>
                                    {data.LoginStatus == 0 ? <div className='text-sm text-green-600'>Actived</div> : <div className='text-sm text-red-600'>Blocked</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        )
    }

    if (location.state.type == "vendor") {
        return (
            <>
                {data && <div className='w-full flex'>
                    <div className='w-1/3'>
                        <h1 className='text-lg font-bold bg-blue-50 px-4 py-2'>Personal Information</h1>
                        <div className='bg-white rounded-md my-3 p-2'>
                            <div className='text-center py-4'>
                                {data.profile == null ? <img className='w-20 h-20 mx-auto rounded-full' src={require("../asset/user.jpg")} alt='' /> : <img className='w-20 h-20 mx-auto object-cover rounded-full' src={data.profile} alt='' />}

                                <div className='text-2xl font-semibold'><span>{data.firstName}</span><span> {data.lastName}</span></div>
                            </div>
                            <div className='space-y-3'>
                                <div>
                                    <label className='text-gray-400 text-sm'>Email</label>
                                    <div className='text-sm'>{data.email}</div>
                                </div>
                                <div>
                                    <label className='text-gray-400 text-sm'>Phone</label>
                                    <div className='text-sm'>{data.phno}</div>
                                </div>
                               
                                <div>
                                    <label className='text-gray-400 text-sm'>Address</label>
                                    {data.address == "" ? <div className='text-sm'>null</div> : <div className='text-sm'>{data.address}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/3 px-4'>
                        <h1 className='text-lg font-bold bg-blue-50 px-4 py-2'>Contact Details</h1>
                        <div className='bg-white rounded-md my-3 p-2'>
                            <div className='space-y-3 py-2'>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Account Role</label>
                                    <div className='text-sm'>{location.state.type}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Profile Id</label>
                                    <div className='text-sm'>{data._id}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Create At</label>
                                    <div className='text-sm'>{data.createAt}</div>
                                </div>
                                <div className='flex justify-between p-2 border-b'>
                                    <label className='text-gray-400 text-sm'>Account Last Login</label>
                                    {data.lastLoggin == null ? <div className='text-sm'>null</div> : <div className='text-sm'>{data.lastLoggin}</div>}
                                </div>
                                
                               
                                
                                <div className='flex justify-between p-2'>
                                    <label className='text-gray-400 text-sm'>Account LoginStatus</label>
                                    {data.LoginStatus == 0 ? <div className='text-sm text-green-600'>Actived</div> : <div className='text-sm text-red-600'>Blocked</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >}
            </>
        )
    }
}
