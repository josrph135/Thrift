
export default function MemberSection({children}){
    return(
        <div className='flex flex-col rounded h-[500px] overflow-scroll divide-y-2 divide-dotted divide-black text-black'>
            <div className='font-semibold text-center bg-teal-800/70 py-2 text-lg bg-teal-950 text-yellow-400'>Members👬</div>
                {children}
        </div>
    )
}