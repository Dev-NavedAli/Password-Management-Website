import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" ,id : uuidv4()});
    const [passwordArray, setPasswordArray] = useState([])


    const getPassword = async() => {
        let req  = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
            
    }
    

    useEffect(() => {
        getPassword()
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

    const savePassword = async() => {
        if(form.site.length >3 && form.username.length > 3 && form.password.length> 3){

            //If any such id exist in db delete it
            await fetch("http://localhost:3000/",{method: "DELETE" , headers: {"Content-Type":"application/json"},body: JSON.stringify({id:form.id})})


        setPasswordArray([...passwordArray,{...form,id: uuidv4()}])
        await fetch("http://localhost:3000/",{method: "POST" , headers: {"Content-Type":"application/json"},body: JSON.stringify({...form, id:uuidv4() }) })

        // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id: uuidv4()}]))
        // console.log([...passwordArray, form])

        setForm({site:"", username:"",password:""})
        toast('Save Succesfully', {
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
    else{
        toast('Err : PAssword not saved')
    }
    };

    const deletePassword = async(id)=>{
        let c = confirm("Do you Really wanted to delete")
        if(c){
        const updatedArray = passwordArray.filter(item => item.id != id)
        setPasswordArray(updatedArray)

        let res = await fetch("http://localhost:3000/",{method: "DELETE" , headers: {"Content-Type":"application/json"},body: JSON.stringify({id})})

        toast('Password Deleted Succesfully', {
            position: "top-center",   // Toast
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        
        }
    }

    const editPassword = (id)=>{
        console.log("button is clicked",id)
        setForm({...passwordArray.filter(i=>i.id === id)[0],id:id})   // for populating the details of the inputs
        setPasswordArray(passwordArray.filter(item => item.id !=id)) //jab hum phle bina is statement ke edit krte the to ek new set add hota tha poorana vaal 
                                                                    //  bhi rhta tha isse poorana vaala delete ho jaayega or new edited array aa jayega
        console.log("half work done")
    }


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


            <div className="p-2 md:p-0 md:mycontainer min-h-[81.3vh]">
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
                        id='site'
                    />
                    <div className='flex flex-col md:flex-row w-full gap-8 justify-between' id='cc'>
                        <input
                            value={form.username || ''}
                            onChange={handleChange}
                            type="text"
                            placeholder='Enter Website username'
                            className="rounded-full border border-green-700 w-full p-4 py-1"
                            name='username'
                            id='username'
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
                        <table className="table-auto  w-full rounded-md overflow-hidden mb-10">
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
                                        <td className='text-center py-2 flex justify-center items-center ' ><a href={item.site} target='blank'>{item.site}</a>
                                            <div className='lordicon size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </td>

                                        <td className=' text-center  py-2 '>
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
                                        <td className='text-center w-32 py-2'>
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
                                        <td className='text-center w-32 py-2'>
                                            <span className='cursor-pointer  mx-1' onClick={()=>{deletePassword(item.id)}}>
                                                <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}>
                                            </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
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


