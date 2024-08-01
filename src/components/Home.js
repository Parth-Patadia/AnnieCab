import React, { useEffect, useRef, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Home = () => {
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [date, setDate] = useState()
    const [formatdate, setFormatdate] = useState("select Date")
    const [firstName, setFirstname] = useState()
    const [lastName, setLastname] = useState()
    const [email, setEmail] = useState()
    const [phno, setPhon] = useState()
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    // const formatDate = (inputDate) => {
    //     // Assuming inputDate is in the format "YYYY/MM/DD"
    //     const parts = inputDate.split('-');
    //     const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]); // Month is 0-indexed

    //     const dd = String(formattedDate.getDate()).padStart(2, '0');
    //     const mm = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    //     const yyyy = formattedDate.getFullYear();

    //     return `${dd}/${mm}/${yyyy}`;
    // };

    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };

    useEffect(() => {
        if (date) {
            setFormatdate(date)
        }
    }, [date])

    const send = async () => {
        const data = { firstName, lastName, email, phno, message }
        if (firstName && lastName && email && phno && message) {
            await axios.post("https://sparkstoideas.daddy11.in/contact/sendContact", data)
                .then(res => {
                    if (res.data.success == 1) {
                        toast.success(res.data.message)
                        setFirstname("")
                        setLastname("")
                        setEmail("")
                        setPhon("")
                        setMessage("")
                    } else {
                        toast.error(res.data.message)
                        setFirstname("")
                        setLastname("")
                        setEmail("")
                        setPhon("")
                        setMessage("")
                    }
                })
                .catch(err => console.log(err))
        } else {
            toast.warning('Please Enter the valid details.')
        }
    }

    const search = (e) => {
        e.preventDefault()
        const data = { from, to, formatdate }
        console.log(data)
        navigate(`/cab_search/${from}/${to}`, { state: { data, date } })
    }

    const vendor = JSON.parse(localStorage.getItem('session_vid'))

    return (
        <div>
            <div className='h-[500px] bg-center bg-no-repeat bg-cover flex items-end' style={{ backgroundImage: `url(${require('../asset/bg-img-home.png')})` }}>
                {!vendor && <div className='px-4 sm:px-8 w-full'>
                    <form onSubmit={search} className='w-full rounded-lg grid m-4 md:flex mx-auto max-w-4xl -mb-12 p-6 bg-white shadow-lg space-y-4 md:space-y-0 space-x-0 md:space-x-3'>
                        <input required value={from} onChange={e => setFrom(e.target.value.toLocaleLowerCase())} className='md:py-1 p-3 px-3 w-full rounded-lg bg-[#F2F2F2]' type='text' placeholder='Leaving From' />
                        <input required value={to} onChange={e => setTo(e.target.value.toLocaleLowerCase())} className='md:py-1 p-3 px-3 w-full rounded-lg bg-[#F2F2F2]' type='text' placeholder='Going To' />
                        <input required value={date} onChange={e => setDate(e.target.value)} name='date' className='md:py-1 p-3 px-3 w-full rounded-lg bg-[#F2F2F2]' type='date' min={minDate()} />
                        <button className='bg-[#6EDA48] rounded-lg py-3 w-full font-semibold'>Search</button>
                    </form>
                </div>}
            </div>
            <div className='sm:flex mt-20 mb-10 w-full max-w-6xl mx-auto sm:space-x-4 sm:space-y-0 space-y-4 justify-around p-4'>
                <div className='w-full border-2 border-slate-400 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid'>
                    <img className='w-12 mx-auto' src={require('../asset/coin-2-svgrepo-com 1.png')} alt='img' />
                    <span className='text-center font-semibold'>Comfortable and Convenient Rides</span>
                    <div className='text-[#726d6d]'>Travel comfortably with our reliable cab services. Choose from a variety of vehicles to match your needs, and enjoy a seamless booking experience.</div>
                </div>
                <div className='w-full border-2  border-slate-400 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid'>
                    <img className='w-12 mx-auto' src={require('../asset/coin-2-svgrepo-com 1.png')} alt='img' />
                    <span className='text-center font-semibold'>Safe and Secure Journeys</span>
                    <div className='text-[#726d6d]'>Your safety is our priority. Enjoy peace of mind with our verified drivers. Our cabs are thoroughly inspected to ensure a safe journey every time.</div>
                </div>
                <div className='w-full border-2  border-slate-400 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid'>
                    <img className='w-12 mx-auto' src={require('../asset/coin-2-svgrepo-com 1.png')} alt='img' />
                    <span className='text-center font-semibold'>Flexible Ride Options</span>
                    <div className='text-[#726d6d]'>Quick city trips or long-distance travels, our diverse fleet and flexible booking options fit your needs perfectly.</div>
                </div>
            </div>

            <div className='w-full max-w-6xl mx-auto space-x-4 space-y-4 justify-around p-4'>
    <div></div>
    <h1 className='text-3xl font-bold'>About us</h1>
    <div className='sm:flex sm:flex-row-reverse grid place-items-center'>
        <div></div>
        <div className='flex place-items-center'>
            <img className='w-full max-w-md' alt="" src={require('../asset/Group 4.png')} />
        </div>
        <div className='bg-[#6EDA48] hidden sm:flex w-1 mx-4 h-52 rounded-full'></div> {/* Adjusted the margin here */}
        <div className='w-full'>
            <div className='space-y-4'>
                <p className='text-[#100f0f] bg-gray-200 p-6 rounded-lg border border-gray-200'> {/* Added background, padding, rounded border, and border */}
                    Welcome to our cab booking service, where we prioritize your convenience and safety. We offer a wide range of vehicles to suit your travel needs, whether you're commuting in the city or planning a long-distance journey. Our user-friendly platform ensures a seamless booking experience, making it easy to find the perfect ride. With verified drivers, you can travel with confidence knowing that your safety is our top priority. Join us for a comfortable and reliable journey every time.
                </p>
                {/* <button className='bg-[#6EDA48] px-4 py-2 font-medium rounded-md'>Read More</button> */}
            </div>
        </div>
    </div>
</div>

            <div className='bg-[#6EDA48] my-10 w-full sm:flex sm:flex-row-reverse sm:p-5 place-items-center'>
                <div className='sm:w-1/2 flex justify-center'>
                    <img className='w-full max-w-sm' alt="" src={require('../asset/scamDetective-653544b71d88f51797db 1 (1) 1.png')} />
                </div>
                <div className='sm:w-1/2 p-10 space-y-4'>
                    <h2 className='text-white text-2xl font-medium'>Help us keep you safe from scams</h2>
                    <p className='text-white text-sm'>We take your safety seriously and implement rigorous checks to ensure every ride is secure. Our verified drivers, real-time tracking, and strict safety protocols are designed to protect you from scams and ensure a trustworthy experience. Stay informed and ride with confidence.</p>
                </div>
            </div>

            <div className='my-20 max-w-6xl mx-auto p-4 space-y-20'>
                <div className='text-center'>
                    <h1 className='text-4xl grid font-semibold'>
                        For More Details Contact us
                    </h1>
                </div>
                <div className='w-full sm:space-x-10 lg:space-x-20 sm:flex justify-around'>
                    <div className='sm:w-1/2 space-y-2'>
                        <div className='md:flex w-full md:space-x-3'>
                            <div className='grid space-y-2 w-full'>
                                <label className='font-semibold text-sm'>First Name</label>
                                <input className='bg-[#F2F2F2] w-full rounded-md p-2' type='text' value={firstName} onChange={e => setFirstname(e.target.value)} />
                            </div>
                            <div className='grid space-y-2 w-full'>
                                <label className='font-semibold text-sm'>Last Name</label>
                                <input className='bg-[#F2F2F2] w-full rounded-md p-2' type='text' value={lastName} onChange={e => setLastname(e.target.value)} />
                            </div>
                        </div>
                        <div className='grid w-full space-y-2'>
                            <label className='font-semibold text-sm'>Email</label>
                            <input type='email' className='bg-[#F2F2F2] w-full rounded-md p-2' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='grid w-full space-y-2'>
                            <label className='font-semibold text-sm'>Mobile Number</label>
                            <input type='text' className='bg-[#F2F2F2]  w-full rounded-md p-2' value={phno} onChange={e => setPhon(e.target.value)} />
                        </div>
                        <div className='grid w-full space-y-2'>
                            <label className='font-semibold text-sm'>Comment or Message</label>
                            <textarea type="textarea" className='bg-[#F2F2F2]  w-full rounded-md p-2' rows="3" value={message} onChange={e => setMessage(e.target.value)} />
                        </div>
                        <div className='text-center'>
                            <button onClick={send} className='bg-[#6EDA48] my-5 py-1 px-6 rounded-md text-white text-lg'>Submit</button>
                        </div>
                    </div>
                    
                    <div className='sm:w-1/2 space-y-2'>
                    <br></br><br></br>
                        <div className='text-[#726d6d]'>
                        Have questions or need assistance? Our support team is here to help you with any inquiries or issues you may have. Reach out to us anytime, and we'll ensure you have a smooth and enjoyable experience.
                        </div>
                        <div className='flex space-x-4 items-center'>
                            <CiLocationOn className='h-10 w-12 text-green-400' />
                            <div className='text-[#726d6d]'>
                                406 Akshat Tower, Nr. Pakwan Hotel, Opp. Rajpath Club, Sarkhej - Gandhinagar Highway, Ahmedabad - 380054
                            </div>
                        </div>
                        <div className='flex space-x-4 items-center'>
                            <AiOutlineMail className='h-10 w-6  text-green-400' />
                            <div className='text-[#726d6d]'>
                                Info@anniecab.com
                            </div>
                        </div>
                        <div className='flex space-x-4 items-center'>
                            <BsTelephone className='h-10 w-6 text-green-400' />
                            <div className='text-[#726d6d]'>
                                +91 9510203204
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}