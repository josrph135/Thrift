import React, { useState } from 'react'
import MemberData from './data'
import image from '../image/th.jpg'
import frame from '../image/savings.jpg'
import MembershipForm from './memberShipform'



function MemberSection({children}){
    return(
        <div className='flex flex-col rounded h-[470px] overflow-scroll divide-y-2 divide-dotted divide-black text-black'>
            <div className='font-semibold text-center bg-teal-800/70 py-2 text-lg bg-teal-950 text-yellow-400'>Members👬</div>
                {children}
        </div>
    )
}

function B0tton({children, onClick}){
    return(
        <button onClick={onClick} className='text-sm px-2 py-1 rounded-lg bg-yellow-200 hover:bg-inherit hover:border-yellow border border-yellow-300 hover:text-yellow-300 duration-500'>{children}</button>
    )
}

function Template({card, handleProfile, viewProfile, setMemberlist}){
    const [addedFund, setAddedFund] = useState("")
    const {FullName, bal, phoneNum, email, profession} = card
    const isSelected = card.id === viewProfile?.id
    const [add, setAdd] = useState(null)
    
    function addCapital(card){
        setAdd(open => open?.id === card.id ? null : card)
    }

    function handleAdd(current){
        setMemberlist(members => members.map(member => member.id === current.id ? {...member, bal: addedFund + member.bal} : member))
    }

    function submitAddedFund(event){
        event.preventDefault()
        if(!addedFund)return;
        handleAdd
        setAdd(null)
    }
    return(
        <div className='flex flex-col pb-8 bg-teal-800/80'>
            <div className='flex flex-row gap-4 p-4'>
                <div>
                    <img className='w-12 h-12 rounded-full' src={image} alt="" />
                </div>
                <div>
                    <h2 className='font-semibold'>{FullName}    </h2>
                    <p className='text-sm font-semibold'>{profession}</p>
                    <p className='text-xs font-semibold'>{email}</p>
                    <p className='font-semibold text-xs'>{phoneNum}</p>
                </div>
                <div className='ml-auto'>
                    <p className='font-semibold'>${bal}</p>
                </div>
            </div>
            <div className='flex flex-row w-2/3 ml-auto pr-4 sm:pr-4 sm:gap-2 gap-8  whitespace-nowrap'>
                <B0tton  onClick={() => addCapital(card)}>Add to balance</B0tton>
                <B0tton  onClick={() => handleProfile(card)}>view profile</B0tton>
            </div>
            {add && <form onSubmit={submitAddedFund} className='pt-3 mt-auto flex flex-row gap-4 justify-center'>
                <label htmlFor="newAddition">Enter Amount:</label>
                <input 
                    type="number" 
                    id='newAddition'
                    value={addedFund}
                    onChange={(e) => setAddedFund(Number(e.target.value))}
                    className='w-[100px] pl-2 bg-yellow-200 outline-none rounded'
                />
                <B0tton  onClick={() => handleAdd(card)}>Add</B0tton>
            </form>}
            
        </div>
    )
}

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
                    <p className='flex flex-col text-center'><span>Account Balance:</span> <span>${viewProfile.bal}</span></p>
                    <div className='flex items-end mt-auto ml-auto'>
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
    function handleProfile(card){
        setViewProfile(prev => card)
    }
    
    function addMember(newMember){
        setMemberlist(prev => [...prev, newMember])
    }

    function closeAccount(viewed){
        const alert = prompt("Are you sure you want to close your account?")
        if(alert === "yes")
        setMemberlist(member => member.filter(selected => selected.id !== viewed.id))
        setViewProfile(null)
    }

  return (
    <div className='gap-[2px]  flex flex-col bg-yellow-300'>
        <Header memberlist={memberlist}/>
        <div className={`flex-col md:flex-row flex gap-[2px]`}>
            <div className='md:w-[50%] relative border lg:w-[70%] '>
                {viewProfile && <div className='flex flex-col gap- mr-auto w-full h-[55%]'>
                    <Profile viewProfile={viewProfile} closeAccount={closeAccount} setViewProfile={setViewProfile} />
                </div>}
                <div className={`mr-auto ${!openForm ? "h-[100%]" : "h-[44%]"} opacity-0 md:opacity-100 w-full absolute bottom-0 bg-teal-800/80 rounded`}>
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
                        />

                    )}
                </MemberSection>

                <button onClick={() => setOpenform(open => !open)} className='w-full bg-teal-950 py-[4px] text-teal-500 font-semibold duration-300 hover:bg-opacity-75'>Join</button>
            </div>
        </div>
        
        {openForm && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/80 justify-center items-center'>
                <MembershipForm addMember={addMember} setOpenform={setOpenform}/>
                <div onClick={() => setOpenform(false)} className='bottom-3  md:bottom-12 right-3  md:right-12 fixed font-semibold text-lg px-2 sm:px-4 py-1 sm:py-2 ring-2 rounded-full hover:ring-white hover:text-white duration-300 bg-teal-800 text-black'>X</div>
        </div>}    

    </div>
  )
}

export default App