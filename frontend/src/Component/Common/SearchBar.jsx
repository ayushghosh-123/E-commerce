import React, { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

function SearchBar() {

    const [searchThem, setSearchTerm] = useState(" ")
    const [isOpen, setIsOpen] = useState(false)

    const handleSearchToggle = () =>{
        setIsOpen(!isOpen)
    }

  return (
    <div>
        {isOpen? (
        <form className='relative flex items-center justify-center w-full'>
        <div className='relative w-1/2'>
            <input type="text" placeholder='search' value={searchThem} className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 text-black' />
        </div>
        </form>): (
            <button onClick={handleSearchToggle}>
            <HiMagnifyingGlass  className='h-6 w-6 '/>
        </button>)}
    </div>
  )
}

export default SearchBar