import React from 'react';
import Navbar from './component/Navbar';
import Filter from './component/Filter';
import Cards from './component/Cards';
import { filterData, apiUrl } from './data';
import { useState, useEffect } from 'react';
import Spinner from './component/Spinner';
import {toast} from "react-toastify";

function App() {
  const[courses, setCourses] = useState(null);
  const[loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData () {
    setLoading(true);
    try{
        let response = await fetch(apiUrl);
        let output = await response.json();
        //output-->
        setCourses(output.data);
    }
    catch{
         toast.error("network me koi to dikkat aa rhi hai bhai")
    }
    setLoading(false);
  }

   // function call isme use effect se karte hain
  useEffect( () => {
    fetchData();
  }, [])


  return (
    <div className='min-h-screen flex flex-col bg-gray-700'> 
      <div>
        <Navbar/>
        </div>
    
    <div className='bg-gray-700'>
    <div>
        <Filter
        filterData={filterData}
        category = {category}
        setCategory = {setCategory}
        />
      </div>
      <div className='w-11/12 max-w-[1200px]
      mx-auto flex flex-wrap justify-center items-centerin-h-[50vh]'>
        {
          loading ? (<Spinner/>):(<Cards courses={courses} category = {category}/>)
        }
      </div>
    </div>

    </div>
  );
}

export default App;
