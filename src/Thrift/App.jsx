import React, { useState } from 'react'
import MemberData from './data'
import image from '../image/th.jpg'
import frame from '../image/savings.jpg'
import MembershipForm from './memberShipform'
import MemberSection from './memberSection'
import Template from "./template"
import B0tton from './button'
import Withdraw from './withdrawal'

function Header({memberlist}){

    const total = memberlist.reduce((currentTotal, member) => {
        return member.bal + currentTotal
    }, 0)
    return(
        <div className='pt-4 pb-1 w-full bg-gradient-to-t from-teal-900 to-yellow-100/50'>
            <h2 className='pt-2 text-xl sm:text-2xl text-center text-black font-bold'>AWA THRIFT✨</h2>
            <p className='text-center font-semibold text-sm sm:text-base'>🔐Saving for a better tomorrow</p>
            <div className='justify-between flex flex-row text-sm sm:text-base px-4'>
                <p>Total Member: {memberlist.length}</p>
                <p>Current Bal: ${total}</p>
            </div>
        </div>
    )
}

function Profile({viewProfile, closeAccount, setViewProfile}){
    function closeProfile(){
        setViewProfile(prev => null)
    }
    return(
        <div className='w-full h-full bg-teal-800/80 pb-4 relative gap-2 rounded mx-auto text-white pt-4 lg:pt-8 lg:px-4 flex flex-col'>
            <p onClick={closeProfile} className='text-xl font-semibold px-2 py-1 rounded-full absolute top-4 right-6 text-black hover:text-yellow-300 duration-300 cursor-pointer'>X</p>
            <div className='justify-center flex'>
                <img className='md:w-28 md:h-28 w-20 h-20 rounded-full' src={image} alt="" />
            </div>
            <div className='flex flex-row pt-4 px-2 md:px-4 text-black text-sm md:text-base justify-between'>
                <div className=' font-semibold gap-[2px] flex flex-col text-start'>
                    <h1>Full Name: {viewProfile.FullName}</h1>
                    <p>Profession: {viewProfile.profession}</p>
                    <p>Email Address: {viewProfile.email}</p>
                    <p>Phone Num: {viewProfile.phoneNum}</p>
                </div>
                <div className='font-semibold gap-2 flex flex-col'>
                    <p className='absolute top-4 left-2 md:left-4 lg:left-8 flex flex-row gap-2 text-center'><span>Balance: </span> <span> ${viewProfile.bal}</span></p>
                    <div className='flex gap-2 flex-col lg:flex-row items-end mt-auto ml-auto'>
                       <B0tton onClick={() => closeAccount(viewProfile)}>Close Account</B0tton>
                    </div>
                </div>
            </div>
        </div>
    )
}


const App = () => {
    const [openForm, setOpenform] = useState(false)
    const [memberlist, setMemberlist] = useState(MemberData)
    const [viewProfile, setViewProfile] = useState(null)
    const [openWithdrawForm, setOpenWithdrawform] = useState(false)
    function handleProfile(card){
        setViewProfile(prev => card)
    }
    
    function addMember(newMember){
        setMemberlist(prev => [...prev, newMember])
    }

    function closeAccount(viewed){
        if(viewed.bal < 0) window.alert("you need to clear your debt");
        if(viewed.bal < 0)return;        
        const alert = prompt("Are you sure you want to close your account?")
        if(alert === "yes")
        setMemberlist(member => member.filter(selected => selected.id !== viewed.id))
        setViewProfile(null)
    }

  return (
    <div className='gap-[2px]  flex flex-col bg-yellow-300'>
        <Header memberlist={memberlist}/>
        <div className={`flex-col md:flex-row flex gap-[2px]`}>
            <div className='md:w-[50%] relative flex flex-col border lg:w-[70%] '>
                {viewProfile && <div className='flex flex-col gap-[2px] mr-auto w-full h-[55%]'>
                    <Profile viewProfile={viewProfile} closeAccount={closeAccount} setViewProfile={setViewProfile} setOpenWithdrawform={setOpenWithdrawform}/>
                </div>}
                <div className={`mr-auto ${viewProfile ? "h-[44%]" : "h-[100%]"} opacity-0 md:opacity-100 w-full absolute bottom-0 bg-teal-800/80 rounded`}>
                        <img className='w-full h-full rounded' src={frame} alt="" />
                </div>
            </div>
            <div className='flex flex-col md:ml-auto gap-1 md:w-[50%] lg:w-[30%] h-[90%]'>
                <MemberSection>
                    {memberlist.map(member => 
                        <Template 
                            key={member.id}
                            card={member}
                            handleProfile={handleProfile}
                            viewProfile={viewProfile}
                            setMemberlist={setMemberlist} 
                            setOpenWithdrawform={setOpenWithdrawform}
                        />

                    )}
                </MemberSection>

                <button onClick={() => setOpenform(open => !open)} className='w-full bg-teal-950 py-[4px] text-teal-500 font-semibold duration-300 hover:bg-opacity-75'>Join</button>
            </div>
        </div>
        
        <MembershipForm addMember={addMember} setOpenform={setOpenform} openForm={openForm}/>   

        {openWithdrawForm && <Withdraw setOpenWithdrawform={setOpenWithdrawform} profile={viewProfile}/>}
    </div>
  )
}

export default App