import Friend from "./data";
import React, { useState } from 'react'
import frame1 from '../image/th.jpg'


function Button({children}){
    return(
        <button className="px-4 py-2 border border-black rounded-md bg-gray-400 text-base font-semibold">{children}</button>
    )
}
function Root({single, handleSelect, onSelect}){
    const isSelected = single.id === onSelect?.id
    return(

        <div className={`flex flex-row ${isSelected ? "bg-slate-200" : "bg-inherit"} p-2 bg-opacity-40 justify-between items-center`}>
            <img className="w-16 h-16 justify-start rounded-full" src={single.image} alt={single.fName} />
            {single.bal < 0 && <p className="text-base font-semibold text-red-600">You are owing {single.fName} #{single.bal}</p>}
            {single.bal === 0 && <p className="text-base font-semibold">You and {single.fName} are even</p>}
            {single.bal > 0 && <p className="text-base font-semibold text-green-600">{single.fName} is owing you #{single.bal}</p>}
            <button className="px-4 py-2 border border-black rounded-md bg-slate-700/40 text-base font-semibold" onClick={() => handleSelect(single)}>{isSelected ? "close" : "Select"}</button>
        </div>
    )
}

function Firstcomp({array, handleSelect, onSelect}){
    return(
        <div className="flex flex-col px-4 mx-auto mt-8 py-4  rounded gap-4">
        {array.map(single => 
            <Root 
                key={single.id}
                
                single={single}
                handleSelect={handleSelect}
                onSelect={onSelect}
            />
            )}
    </div>
    )
}

function Form({addFriend, onAddFriend}){
    const [name, setName] = useState("")
    const [image, setImage] = useState(frame1)
    

    function submit(event){
        event.preventDefault()
        if(!name || !image) return;

        let newfriend= {fName: name, image: image,  bal: 0, id:Date.now()}
        addFriend(newfriend)

        onAddFriend(false)
        setImage("")
        setName("")
        console.log(newfriend)
    }
   

    return(
            <form onSubmit={submit} className="flex p-4 bg-slate-200 bg-opacity-60 flex-col gap-2 w-full">
                <div className="flex flex-row font-semibold justify-between">
                    <label htmlFor="name">🚹 Friend Name:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name" 
                        className="outline-none border border-gray-800  py-1 px-2 rounded"/>
                </div>    
                <div className="flex flex-row items-center justify-between">
                    <label className="font-semibold text-base" htmlFor="image">🚹 Friend Image URL:</label>
                    <input 
                        type="text" 
                        id="image" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="outline-none py-1 border border-gray-800 px-2 rounded"/>
                </div> 
                <button className="px-4 py-2 border w-fit ml-auto border-black rounded-md bg-gray-400 text-base font-semibold">ADD</button>
            </form>
    )
}

function Split({onSelect, SetOnSelect, handleSplitBill}){
    const [bill, setbill] = useState("")
    const [userExpenses, setUserExpenses] = useState("")
    const FriendExpenses = bill ? bill-userExpenses : ""
    const [whoISpaying, setWhoIsPaying] = useState("user")

    function submit(e){
        e.preventDefault()
        if(!bill || !userExpenses) return;
        handleSplitBill(whoISpaying === "user" ? FriendExpenses : -userExpenses)

        setbill("")
        setUserExpenses("")
        SetOnSelect(null)
    }

    return(
        <form 
            onSubmit={submit}
            className="flex px-6 py-4 bg-slate-200 bg-opacity-60 flex-col gap-2 ">
                <h2 className="uppercase font-semibold text-xl">Split a bill with {onSelect.fName}</h2>
                <div className="flex flex-row font-semibold justify-between">
                    <label htmlFor="bill">✨ Bill value</label>
                    <input 
                        type="number"
                        id="bill" 
                        value={bill}
                        min={0}
                        onChange={(e) => setbill(Number(e.target.value))}
                        className="outline-none border border-gray-800  py-1 px-2 rounded"/>
                </div>    
                
                <div className="flex flex-row font-semibold justify-between">
                    <label htmlFor="expense">😎 Your Expenses</label>
                    <input 
                        type="number"
                        id="expense"
                        min={0} 
                        value={userExpenses}
                        onChange={(e) => setUserExpenses(Number(e.target.value) > bill? userExpenses : Number(e.target.value))}
                        className="outline-none border border-gray-800  py-1 px-2 rounded"/>
                </div>    
                
                <div className="flex flex-row font-semibold justify-between">
                    <label htmlFor="friendExpense">👬 {onSelect.fName}'s Expenses</label>
                    <input 
                        min={0}
                        type="number"
                        id="friendExpense" 
                        value={FriendExpenses}
                        className="outline-none bg-transparent py-1 px-2 rounded" disabled/>
                </div>    
                <div className="flex flex-row font-semibold justify-between">
                    <label htmlFor="paying">😉 Who is paying the bill?</label>
                    <select name="paying" id="" className="outline-none px-2 rounded-sm" onChange={(e) => setWhoIsPaying(e.target.value)}>
                        <option value="user">User</option>
                        <option value={onSelect.fName}>{onSelect.fName}</option>
                    </select>
                </div>    
                
                <button className="px-4 py-2 border w-fit ml-auto border-black rounded-md bg-gray-400 text-base font-semibold">ADD</button>
        </form>
       
    )
}

const App = () => {
    const [openForm, setOpenFriend] = useState(false)
    const [array, setArray] = useState([...Friend])
    const [onSelect, SetOnSelect] = useState(null)

    function handleSelect(single){
        SetOnSelect(selected => selected?.id === single.id ? null : single)
        setOpenFriend(false)
    }

    function handleOpenForm(){
        setOpenFriend(prev => !prev)
    }
    function addFriend(newfriend){
        setArray(prev => [...array, newfriend])
    }

    function handleSplitBill(value){
        setArray(friends => friends.map(friend => friend.id === onSelect.id ? {...friend, bal: friend.bal + value} : friend))
    }
  return (
    <div className="flex flex-col md:flex-row gap-4">
        <nav className="md:w-1/2 space-y-4">
            <Firstcomp array={array} handleSelect={handleSelect} onSelect={onSelect}/>
            {openForm && <Form addFriend={addFriend} onAddFriend={setOpenFriend} />}
            <button onClick={handleOpenForm} className="px-4 py-2 border border-black rounded-md bg-gray-400 text-base w-fit font-semibold float-right">{openForm ? "Close" : "Add new Friend"}</button>
        </nav>
        <div className="md:w-1/2 p-4 m-8">
            {onSelect && <Split onSelect={onSelect} SetOnSelect={SetOnSelect} handleSplitBill={handleSplitBill}/>}
        </div>
    </div>
  )
}

export default App