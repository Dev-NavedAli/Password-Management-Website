import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
        else {
            passwordArray = []
        }
    }, [])

    let copyText = (text) => {
        navigator.clipboard.writeText(text);

        toast('Copy to Clipboard', {
            position: "top-center",   //For Toast
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showPassword = () => {
        if (ref.current.src.includes("/icon/eyecross.svg")) {
            ref.current.src = "/icon/eye.svg";
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "/icon/eyecross.svg";
            passwordRef.current.type = "password"
        }
    };

    const savePassword = () => {
        setPasswordArray([...passwordArray, form ])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDelete = () => {
        setPasswordArray([])
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}                         // For Toast Notification at React-tostify from github in github there is a site 
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="mycontainer">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-800'>&lt;</span>Pass
                    <span className='text-green-800 text-4xl'>Op/</span><span className='text-green-800'>&gt;</span>
                </h1>
                <p className='text-green-900 text-xl text-center'>Your own password manager</p>

                <div className="flex flex-col p-4  text-black gap-8 items-center">
                    <input
                        value={form.site || ''}
                        onChange={handleChange}
                        placeholder='Enter Website Url'
                        className="rounded-full border border-green-700 w-full p-4 py-1"
                        type="text"
                        name='site'
                    />
                    <div className='flex w-full gap-8 justify-between' id='cc'>
                        <input
                            value={form.username || ''}
                            onChange={handleChange}
                            type="text"
                            placeholder='Enter Website username'
                            className="rounded-full border border-green-700 w-full p-4 py-1"
                            name='username'
                        />

                        <div className="relative">
                            <input
                                value={form.password || ''}
                                ref={passwordRef}
                                onChange={handleChange}
                                type="password" // Changed type to password
                                placeholder='Enter password'
                                className="rounded-full border border-green-700 w-full p-4 py-1"
                                name='password'
                            />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/icon/eye.svg" alt="eye" width={20} />
                            </span>
                        </div>
                    </div>

                    <button className='flex justify-center items-center gap-4 bg-green-800 rounded-full px-8 py-2 w-fit text-white
                    hover:bg-green-600 border-2 border-green-700' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/ftndcppj.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                    <button onClick={handleDelete}></button>
                </div>
                <div className="passwords"><h2 className='font-bold text-2xl py-4 text-center'>Your passwords</h2>
                    {passwordArray.length === 0 ? <div>No password to show</div> :
                        <table className="table-auto  w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>passWord</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white flex justify-center items-center ' ><a href={item.site} target='blank'>{item.site}</a>
                                            <div className='lordicon size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </td>

                                        <td className='justify-center text-center  py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <span>{item.username}</span>
                                                <div className='lordicon size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <span>{item.password}</span>
                                                <div className='lordicon size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "2px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>

                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <span className='cursor-pointer  mx-1'>
                                                <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}>
                                            </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}>
                                                </lord-icon></span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    );
};

export default Manager;


