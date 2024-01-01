import React from 'react'

function ErrorPage() {
  return (
    <div className='bg-white w-full flex flex-col h-screen justify-center items-center'>
      <h1 className='text-primary font-black text-7xl  text-center'>404</h1>
      <h2 className='text-primary font-black text-3xl w-1/4 text-center mt-4'>Oops... Não conseguimos encontrar essa página :(</h2>
    </div>
  )
}

export default ErrorPage
