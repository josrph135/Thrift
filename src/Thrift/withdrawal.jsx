import { useState } from "react";
import B0tton from "./button";

export default function Withdraw({setOpenWithdrawform, viewProfile}){
    

    console.log(viewProfile.email)
    return(
        <div className="bg-black/20 fixed top-0 left-0 bottom-0 right-0">
            <form className="w-3/5 md:w-2/3 lg:w-1/2 mx-auto flex flex-col justify-center items-center h-fit px-4 pb-6 mt-12 bg-teal-800 gap-3 relative rounded">
                <p onClick={() => setOpenWithdrawform(prev => !prev)} className='text-xl font-semibold px-2 py-1 rounded-full absolute top-4 right-6 text-black hover:text-yellow-300 duration-300 cursor-pointer'>X</p>
                <div className="text-xl py-4 shadow-2xl">Withdrawal form</div>
                <p>withdrawable bal</p>
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="withdraw">Enter Amount:</label>
                    <input 
                        type="number"
                         id="withdraw" 
                         value={withdraw}
                         onChange={(e) => setWithdraw(e.target.value)}
                         placeholder="enter amount"  className="px-2 py-1 rounded outline-none  bg-yellow-200"/>
                </div>
                <B0tton>submit</B0tton>
            </form>
        </div>
    )
}
