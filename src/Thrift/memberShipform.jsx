import { useState } from "react"



export default function MembershipForm({addMember, setOpenform}){
    const [formData, setFormData] = useState({
        bal: "",
        FullName: "",
        email: "",
        phoneNum: "",
        profession: "",
        agree: false
    })

    function handleChange(event){
        const {name, value, type, checked} = event.target
        setFormData(prevData => {
            return{
                ...prevData, 
                [name]: type === "checkbox"? checked : value
            }
    })}

    function formsubmit(event){
        event.preventDefault()
        if(!formData.FullName || !formData.agree || !formData.bal || !formData.email || !formData.phoneNum)return;

        const newMember= {...formData, bal:Number(formData.bal), id: Date.now()}
        addMember(newMember)
        setOpenform(false)
        
        
    }

    return(
        <form onSubmit={formsubmit} className='w-4/5 h-fit my-6 sm:my-10 md:my-12 pb-4 rounded mx-auto sm:w-1/2 lg:w-1/3 bg-teal-800 text-white'>
            <h1 className='pt-5 pb-3 text-lg font-semibold text-center drop-shadow-xl bg-inherit'>Membership Form</h1>
            <div className='py-6 px-6 flex flex-col gap-2 sm:gap-4'>
                <div className='flex sm:flex-row gap-2 flex-col justify-between items-center'>
                    <label htmlFor="name">Enter Full Name:</label>
                    <input 
                        type="text" 
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleChange} 
                        id="name" 
                        className='bg-white/30 outline-none rounded pl-2 py-1'/>
                </div>

                <div className='flex sm:flex-row gap-2 flex-col justify-between items-center'>
                    <label htmlFor="email">Enter Email:</label>
                    <input 
                        type="text"  
                        id="email"
                        name='email'
                        value={formData.email} 
                        onChange={handleChange}
                        className='bg-white/30 outline-none rounded pl-2 py-1'/>
                </div>

                <div className='flex sm:flex-row gap-2 flex-col justify-between items-center'>
                    <label htmlFor="phone">Enter Phone No:</label>
                    <input 
                        type="number"  
                        id="phone" 
                        name='phoneNum'
                        value={formData.phoneNum}
                        onChange={handleChange}
                        className='bg-white/30 outline-none rounded pl-2 py-1'/>
                </div>


                <div className='flex sm:flex-row gap-2 flex-col justify-between items-center'>
                    <label htmlFor="bal">Starting Amount:</label>
                    <input 
                        type="number" 
                        id="bal" 
                        name='bal'
                        value={formData.bal}
                        onChange={handleChange}
                        className='bg-white/30 outline-none rounded  pl-2 py-1'/>
                </div>

                
                <div className='flex sm:flex-row gap-2 flex-col justify-between items-center'>
                    <label htmlFor="profession">What is your Profession?</label>
                    <input 
                        type="text"  
                        id="profession" 
                        name='profession'
                        value={formData.profession}
                        onChange={handleChange}
                        className='bg-white/30 outline-none rounded pl-2 py-1'/>
                </div>

                <div className='flex flex-row gap-4 items-center'>
                    <input 
                        type="checkbox"  
                        id="agree" 
                        checked={formData.agree}
                        name='agree'
                        onChange={handleChange}
                        className='bg-white/30 outline-none rounded pl-2 py-1'/>
                    <label htmlFor="agree" className='text-sm'>Agree to the terms and conditions</label>
                </div>
                

            </div>
            <div className='text-center'>
                <button className='py-2 bg-teal-600 hover:ring-2 hover:ring-white duration-300 hover:bg-opacity-70 ring-2 px-8 rounded-lg'>Submit</button>
            </div>
        </form>
    )
}