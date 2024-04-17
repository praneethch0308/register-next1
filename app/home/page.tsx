import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async  () => {

    const session = await getServerSession(authOptions);
  return (
    <div className='text-center'>
      Hey there ! {session?.user.firstName}<br></br>
      {session?.user.email}
    </div>
  )
}

export default page
