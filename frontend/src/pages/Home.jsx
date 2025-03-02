import React,{useEffect,useState} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom' 
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'
const Home = () => {
  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showType,setShowType] = useState('table');
   async function getBooks(){
    const response = await fetch("http://localhost:5000/books");
    const data = await response.json();
    return data
  }
 

  useEffect(()=>{
    setLoading(true);
    const result = getBooks()
    result.then((result)=>{
      setBooks(result.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  },[])

  console.log(books)

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center  gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>{setShowType('table')}}>Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>{setShowType('card')}}>Card</button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'></MdOutlineAddBox>
        </Link>
      </div>
      {loading?(
        <Spinner/>
      ):(
         showType=="table"?(<BooksTable books={books}/>):(<BooksCard books={books} />)
      )}
    </div>
  )
}

export default Home


