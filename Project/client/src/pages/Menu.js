import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Menu() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:3001/Categories",
    { headers: { accessToken: localStorage.getItem("accessToken") } 
    }).then((response) => {
      setCategoryList(response.data);
    });

    axios.get("http://localhost:3001/Menu",
    { headers: { accessToken: localStorage.getItem("accessToken") } 
    }).then((response) => {
      setMenuList(response.data);
    });

    // axios.get("http://localhost:3001/Categories/menujoin").then((response) => {
    //   setMenuList(response.data);
    // });
  }, []);


  const [userObject, setUserObject] = useState();
  const [buttonText, setButtonText] = useState();


  const addorcancel= (id)=>{

    axios
    .get(`http://localhost:3001/fav/byId/${id}`,
    { headers: { accessToken: localStorage.getItem("accessToken") } 
    })
    .then((response) => {
      setUserObject(response.data);
    });
    
    if (userObject.MenuitemId==id){
      setButtonText('cancel'); 
    }else{
      setButtonText('add to favorite'); 
    }

  }

  const favpost = (id) => {
    axios
      .post(
        "http://localhost:3001/fav",
        { MenuitemId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )}

      // async function addToCart(id, quantity) {
      //   try {
      //     const response = await fetch("http://localhost:3001/cart", {
      //       method: "POST",
      //       body: JSON.stringify({
      //         productId: id,
      //         quantity: quantity,
      //       }),
      //       headers: {
      //         "Content-type": "application/json; charset=UTF-8",
      //       },
      //     });
      //     let data = await response.json();
      //     alert("Item Added To Cart");
      //     console.log(data);
      //   } catch (err) {
      //     alert("Something Went Wrong");
      //     console.log(err);
      //   }
      // }


      const addToCart = (quantity, itemname, price) => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else {
          axios
            .post(
              "http://localhost:3001/cart",
              {
        
                quantity: quantity,
                itemname: itemname,
                price: price,
             
              },
              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              }
            )
            .then((response) => {
              if (response.data.error) {
                console.log(response.data.error);
              } else {
                alert("Item Added To Cart");
              }
            });
        }
      };




  return (
    <div className="d-flex  container col-12 mb-5">
      <div className="col-3 mx-2">
        <table className="table table-hover" name="categories">
          <thead>
          <tr>
              <th className="flex-column col-1" onClick={() => {
                        axios.get(`http://localhost:3001/menu`,
                        { headers: { accessToken: localStorage.getItem("accessToken") } 
                        }).then((response) => {
                          setMenuList(response.data);
                        });
                  
                        }}>All Categories</th>
            </tr>

            {categoryList.map((value, key) => {
              return (
                <tr>
                  <td
                    className="col-6"
                    onClick={() => {
                      axios
                        .get(`http://localhost:3001/menu/byId/${value.id}`,
                        { headers: { accessToken: localStorage.getItem("accessToken") } 
                        })
                        .then((response) => {
                          setMenuList(response.data);
                        });
                    }}
                  >
                    <a>{value.name}</a>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>

      <div className="col-10 mx-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {menuList.map((value, key) => {
            return (
              <div className="col">
                <div className="card h-100 ">
                  <img src="https://projectgofishing.blob.core.windows.net/gofishing/download.jpg?sv=2021-04-10&ss=bf&srt=co&se=2022-09-27T00%3A58%3A44Z&sp=rwl&sig=s32CK%2FSg5g3Lp25i%2F8B00SRuLu9xxtyf1YjEuI8u4ew%3D
" className="card-img-top" alt="..." />
                  <div className="card-body ">
                    <h5
                      className="card-title"
                     
                    >
                      {value.itemname}
                    </h5>

                    <p className="card-text">{value.description}</p>
                  </div>
                  
                  <div className="row card-footer">
                  <div className="col-6">
                    <p className="text-muted ">${value.price}</p>
                    
                    <div className="row">
                      <button onClick={()=>{
                        setCount(count+1);
                      }} className="col">+</button>
                      <div  className="col">{count}</div>
                      <button onClick={()=>{
                        setCount(count-1);
                      }}  className="col mx-1">-</button>
                    </div>

                  </div>
                      {/* <BookmarkAddIcon onClick={ ()=>{
                          favpost(value.id);
                        } }/> */}
                    <button  className="btn btn-sm  btn-outline-danger  col-3 "
                        onClick={ ()=>{
                          favpost(value.id);
                          
                          // addorcancel(value.id);
                        }
                        // {buttonText}
                        }
                        >fav
                    </button>
                    <button
                      onClick={(e) =>
                        addToCart( count, value.itemname, value.price)
                      }
                      className="btn btn-success btn-sm col-3"
                    >
                      Add to cart
                    </button>
                  </div>
                  
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                </div>
              </div>
            );
          })}
         
        </div>

       
      </div>
    </div>
  );
}

export default Menu;
