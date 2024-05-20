import React, { useState, useRef, useEffect } from 'react';

const Manager = () => {
    const ref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])
    const [passWord, setPassword] = useState(true)




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

    const handleClick = ()=>{
        setPassword(!passWord)
    }

    const showPassword = () => {
        if (ref.current.src.includes("/icon/eyecross.svg")) {
            ref.current.src = "/icon/eye.svg";
        } else {
            ref.current.src = "/icon/eyecross.svg";
        }
    };

    const savePassword = () => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

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
                    <div className='flex w-full gap-8 justify-between'>
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
                                onChange={handleChange}
                                type={passWord ? "password" : "text"} // Changed type to password
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
                        Add A Password
                  </button>
                </div>
                <div className="passwords"><h2 className='font-bold text-2xl py-4 text-center'>Your passwords</h2>
                    {passwordArray.length === 0 ? <div>No password to show</div> : 
                    <table className="table-auto  w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>passWord</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item,index)=>{
                                return <tr key={index}>
                                <td className='text-center w-32 py-2 border border-white' ><a href={item.site} target='blank'>{item.site}</a></td>
                                <td className='text-center w-32 py-2 border border-white'>{item.username}</td>
                                <td className='text-center w-32 py-2 border border-white'>{item.password}</td>
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
