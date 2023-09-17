import { useState } from "react"
import image from '../image/th.jpg'
import B0tton from "./button"

export default function Template({card, handleProfile, viewProfile, setMemberlist}){
    const [addedFund, setAddedFund] = useState("")
    const {FullName, bal, phoneNum, email, profession} = card
    const isSelected = card.id === viewProfile?.id
    const [add, setAdd] = useState(null)
    const [withdraw, setWithdraw] = useState(null)
    const [amountToWithdraw, setAmountToWithdrawal] = useState("")
    
    function addCapital(card){
        setAdd(open => open?.id === card.id ? null : card)
        setWithdraw(null)
    }
    function withdrawAmount(card){
        setWithdraw(open => open?.id === card.id ? null : card)
        setAdd(null)
    }

    function handleAdd(current){
        setMemberlist(members => members.map(member => member.id === current.id ? {...member, bal: addedFund + member.bal} : member))
    }
    function handleWithdraw(current){
        setMemberlist(members => members.map(member => member.id === current.id ? {...member, bal: member.bal - amountToWithdraw} : member))
    }

    function submitAddedFund(event){
        event.preventDefault()
        if(!addedFund)return;
        handleAdd
        setAdd(null)
        setAddedFund("")
    }

    function submitWithdraw(event){
        event.preventDefault()
        if(!amountToWithdraw)return;
        handleWithdraw
        setWithdraw(null)  
        setAmountToWithdrawal("")      
    }
    return(
        <div className='flex flex-col pb-8 bg-teal-800/80'>
            <div className='flex flex-row gap-4 p-4'>
                <div>
                    <img className='w-12 h-12 rounded-full' src={image} alt="" />
                </div>
                <div>
                    <h2 onClick={() => handleProfile(card)} className='font-semibold  hover:underline cursor-pointer'>{FullName}    </h2>
                    <p className='text-sm font-semibold'>{profession}</p>
                    <p className='text-xs font-semibold'>{email}</p>
                    <p className='font-semibold text-xs'>{phoneNum}</p>
                </div>
                <div className='ml-auto'>
                    {bal < 0 ? <p className="text-xs font-semibold">Overdraft</p> : <p className="text-xs font-semibold">Balance</p>}
                    <p className='font-semibold'>${bal}</p>
                </div>
            </div>
            <div className='flex flex-row w-2/3 ml-auto pr-4 sm:pr-4 sm:gap-2 gap-8  whitespace-nowrap'>
                <B0tton  onClick={() => addCapital(card)}>Deposit</B0tton>
                <B0tton onClick={() => withdrawAmount(card)}>Withdraw</B0tton>
            </div>
            {add && <form onSubmit={submitAddedFund} className='pt-3 items-center text-sm mt-auto flex flex-row gap-2 justify-center'>
                <label htmlFor="newAddition">Enter Amount:</label>
                <input 
                    type="number" 
                    id='newAddition'
                    value={addedFund}
                    onChange={(e) => setAddedFund(Number(e.target.value))}
                    className='w-[100px] pl-2 bg-yellow-200 py-1 outline-none rounded'
                />
                <B0tton  onClick={() => handleAdd(card)}>Submit</B0tton>
            </form>}

            {withdraw && <form onSubmit={submitWithdraw} className='pt-3 items-center  mt-auto text-sm flex flex-row gap-2 justify-center'>
                <label htmlFor="newAddition">Withdrawal Amount:</label>
                <input 
                    type="number" 
                    id='newAddition'
                    value={amountToWithdraw}
                    onChange={(e) => setAmountToWithdrawal(Number(e.target.value) > bal ? bal : Number(e.target.value))}
                    className='w-[100px] pl-2 bg-yellow-200 py-1 outline-none rounded'
                />
                <B0tton  onClick={() => handleWithdraw(card)}>Submit</B0tton>
            </form>}
            
        </div>
    )
}
