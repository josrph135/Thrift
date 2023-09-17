

export default function B0tton({children, onClick}){
    return(
        <button onClick={onClick} className='text-sm px-2 py-1 rounded-lg bg-yellow-200 hover:bg-inherit hover:border-yellow border border-yellow-300 hover:text-yellow-300 duration-500'>{children}</button>
    )
}
