import { useState,useEffect } from "react";

function useFetch(url){

    const[data,setData]=useState(null);
    const[error,setError]=useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{

        const fetchData= async()=> {
            try{
                const response =await fetch(url);
                const result =await response.json();
                const final =result.result;
               setData(final);
            }
            catch(err){
               setError(err);
            }
            finally{
                setLoading(false);
            }
          
        }

        fetchData();
    },[url]);
  
    return{data,error,loading};
  

}


export default useFetch;