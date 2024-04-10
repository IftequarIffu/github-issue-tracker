import React from 'react'
import Pagination from './components/Pagination'

const Home = ({ searchParams }: { searchParams : { page : string }}) => {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
    // <Pagination issues={issues} issuesPerPage={10}/>
    // <h1>Abcd</h1>
  )
}

export default Home