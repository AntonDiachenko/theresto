import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Item() {

    const { id } = useParams();

    const [menuitem, setMenuitem] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else {
          axios.get(`http://localhost:3001/menu/${id}`).then((response) => {
            setMenuitem(response.data);
          });
    
        };
    
      }, []);



      const deleteItem = (id)=>{
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
        axios.delete(`http://localhost:3001/menu/delete/${id}`
        , {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      ).then((response)=>{
            navigate("/itemmanage");
        });
      }
    }


    const onSubmit = (data)=>{
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
        axios.put(
            `http://localhost:3001/auctions/update/${id}`,data
         
            ,{
                headers:{accessToken: localStorage.getItem("accessToken")},
            }
            ).then((response)=>{
                navigate(0);
               
            });
            const aucid = id;
            axios.post(`http://localhost:3001/historys/`,
            {
                lastBidPrice: data.newPrice,
                lastBidderEmail: data.newBidder,
                AuctionId: aucid
            }
            ,{
                headers:{accessToken: localStorage.getItem("accessToken")},
            }
            ).then((response)=>{
                navigate(0);
            });
    };
    }


  return (
    <div>
        <div class="col-9 mx-5">
            <div className='auction1  container '>
                <h2>Info of the item:</h2> 
                <img src={menuitem.photoURL}></img>
                <div className="input-group mb-1">
                    <span class="input-group-text col-3">description:</span> 
                    <div className='form-control col'>{menuitem.description}</div>
                </div>
                <div className="input-group my-2">
                    <span class="input-group-text col-3">SellerEmail:</span> 
                    <div className="form-control col">{menuitem.price}</div>
                </div>
            
                <button className='btn btn-danger col-12 my-1' onClick={()=>{deleteItem(menuitem.id)}}>Delete</button>
            </div>
                  
        </div>   {/* <th className="col-2 flex-column">photoURL</th> */}

        {/* <div className='auction1  container ' >
            <h2>Please 竞拍:</h2> 
            <Formik initialValues={initialValues}  onSubmit={onSubmit} validationSchema={Schema} >
                    <Form >
                        <div className='row'>
                        <span className="input-group-text col-3 my-3">Bid Price:</span> 
                        
                        <Field 
                        id="inputCreateAuction" 
                        name="newPrice" 
                        placeholder='Please enter your Price.' 
                        className=' col form-control my-3' 
                        />
                        <ErrorMessage name="newPrice" component="span"/>
                        </div>
                        <div className='row'>
                        <span className="input-group-text col-3 my-3">Bidder:</span> 
                        <ErrorMessage name="newBidder" component="span"/>
                        <Field 
                        id="inputCreateAuction" 
                        name="newBidder"    
                        className='form-control col my-3' 
                        placeholder='Please enter your Email.' 
                        />
                        </div>
                        <button className="btn btn-success col-12" type='submit' >Update</button>
                    </Form>
            </Formik>
            </div> */}



    </div> 
 
    
  )
}

export default Item
