import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { serverhost } from '../host'
import { AiOutlineStar } from 'react-icons/ai';

const Count = () => {
  const [data, setAlldata] = useState();
  const [id, setId] = useState();
  const[rate, setrate] = useState();

  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const changeValue = (v) => {
      setValue(v)
    }
    return {
      value,
      onChange: handleChange,
      onSet: changeValue
    };
  };

  const count = useInput("");

  const getallProduct = () => {
    fetch(`${serverhost}/items`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setAlldata(json);
      });
  }

  const handleOpen = (not, i) => {
    count.onSet(not.count);
    setId(i?._id)
    setrate(i?.rating.rate);
    document.getElementById("myModal").style.display = "block";
  }

  function handleClose() {
    document.getElementById("myModal").style.display = "none";
  }

  const updateCount = async () => {
    const da = await fetch(`${serverhost}/updatecountAdmin/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rate, count })
    });
    const res = await da.json();
    console.log(res)
    if(res.status === 200){
      handleClose(); 
    }
  }

  useEffect(() => {
    getallProduct();
  }, [])

  return (
    <>
      <Navbar />
      <div className='container align-item-center'>
        <div>
          {
            data?.map((item, index) => {
              return (
                <>
                  <div className=' upcount d-flex justify-content-between'>
                    <div key={index} className=' det d-flex  align-item-center '>
                      <div className='details' >
                        <img src={item?.image} alt='img' />
                      </div>

                      <div>
                        <div className='my-1' >
                          <small href="#">{item?.title}</small><br />
                        </div>

                        <div className='my-2' >
                          <small href="#" className='rating' >{item?.rating.rate} <AiOutlineStar /> </small>
                        </div>

                        <div className='my-1' >
                          <small href="#" className='price' >₹  {item?.price}</small><br />
                        </div>

                      </div>
                    </div>

                    <div className='my-4' >
                      <button onClick={() => { handleOpen(item.rating, item) }} className='btn-user' exact >Update Count</button>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>

      {/* edit   */}

      <div id="myModal" class="modal">
        <div class="modal-content mx-auto text-center ">
          <h2>
            Count
          </h2>
          <div className='inputs col-9 mx-auto '>
            <input type="title" className="form-control" id="title" value={count.value} onChange={count.onChange}
              name="title" aria-describedby="emailHelp" placeholder="Title" />
          </div>
          <div className="text-center my-4 " >
            <button type="submit" className="submit btn-user mx-4 " onClick={handleClose} >Close</button>
            <button type="submit" className="submit btn-user " onClick={updateCount} >Submit</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Count
