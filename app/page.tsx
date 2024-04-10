import React from 'react'
import Pagination from './components/Pagination'

const page = () => {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={2}/>
    // <Pagination issues={issues} issuesPerPage={10}/>
    // <h1>Abcd</h1>
  )
}

export default page