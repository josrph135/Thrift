import React, { useState } from 'react'

function Firstcomp({bill,setBill}){
  function handlebill(e){
    setBill(Number(e.target.value))
  }

  return(
    <div className='flex flex-col sm:flex-row text-lg font-semibold'>
      <p>How much was the bill?</p>
      <input 
        type="number" 
        value={bill}
        placeholder='Bill value'
        onChange={handlebill}
        className='border outline-none placeholder:text-gray-600 text-black focus:border-2 focus:border-blue-600 rounded pl-2 border-black'/>
    </div>
  )
}

function Rateone({setRate1, setRate2}){

  function handlerate1(e){
    setRate1(Number(e.target.value))
  }
  function handlerate2(e){
    setRate2(Number(e.target.value))
  }

  return(
    <div className='flex flex-col gap-2'>
      <div className='flex sm:flex-row flex-col  text-lg font-semibold'>
      <label>How did you like the service?</label>
      <select onChange={handlerate1}
        className='border outline-none focus:border-2 focus:border-blue-600 rounded pl-1 border-black'>
          <option value="0">Dissatisfied(0%)</option>  
          <option value="5">it was okay(5%)</option>  
          <option value="10">it was good(10%)</option>  
          <option value="20">Absolutely amazing(20%)</option>   
        </select>      
      </div>
      <div className='flex flex-col sm:flex-row text-lg font-semibold'>
        <label>How did your friend like the service?</label>
        <select onChange={handlerate2}
        className='border outline-none focus:border-2 focus:border-blue-600 rounded pl-1 border-black'>
          <option value="0">Dissatisfied(0%)</option>  
          <option value="5">it was okay(5%)</option>  
          <option value="10">it was good(10%)</option>  
          <option value="20">Absolutely amazing(20%)</option>  
        </select>      
      </div>
    </div>
  )
}



function Output({bill, tip, resetButtton}){
  
  return(
    <div className='flex flex-col'>
      <h2 className='py-8 font-bold text-xl'>You pay ${tip + bill} (${bill} + ${tip} tip) </h2>
      <button onClick={resetButtton} className='px-2 py-1 border drop-shadow-xl bg-white rounded w-fit'>Reset</button>
    </div>
  )
}

const Component = () => {
  const [bill, setBill] = useState("")
  const [rate1, setRate1] = useState(0)
  const [rate2, setRate2] = useState(0)

  function resetButtton(){
    setBill("")
    setRate1(0)
    setRate2(0)
  }

  const tip = bill * ((rate1 + rate2)/ 2/ 100)
  
  

  return (
    <div className='flex flex-col w-4/5 bg-slate-100 p-4 mx-auto gap-2'>
      <Firstcomp bill={bill} setBill={setBill} />
      <Rateone setRate1={setRate1} setRate2={setRate2} />
      <Output bill={bill} tip={tip} resetButtton={resetButtton} />
    </div>
  )
}

export default Component