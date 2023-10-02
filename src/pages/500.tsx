import Image from 'next/image'
import React from 'react'
export default function Custom500() {
    return (
        <div className='min-h-screen p-5 flex items-center justify-center '>
            <Image src={"/500Error.gif"} width={120} height={120} className='w-[30vw] rounded-xl' loading='lazy' alt='Error 404' />
        </div>
    )
}
