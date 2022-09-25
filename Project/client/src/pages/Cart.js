import React, { useState, useEffect } from "react";

export const Cart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayloader] = useState({});
  const [hasError, setError] = useState(false);
  async function fetchCart() {
    const res = await fetch("http://localhost:3001/cart");
    res
      .json()
      .then((res) => {
        console.log(res.data.items);
        setCarts(res.data.items);
        setPayloader(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }
  async function increaseQty(id) {
    try {
      const res = await fetch("http://localhost:3001/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(res);
      fetchCart();
      alert("Item Increamented");
    } catch (err) {
      console.log(err);
    }
  }
  // async function emptyCart() {
  //   try {
  //     const res = await fetch("http://localhost:3001/cart/empty-cart", {
  //       method: "DELETE",
  //     });
  //     await res.json();
  //     fetchCart();
  //     props.history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <main>
      <section>
        <div className="banner-innerpage">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 align-self-center text-center">
                <h1 className="title">Cart Listing</h1>
                <h6 className="subtitle op-8">
                  You're so close you can taste it
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="spacer">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-9">
                <div className="row shop-listing">
                  <table className="table shop-table">
                    <thead>
                      <tr>
                        <th className="b-0">Name</th>
                        <th className="b-0">Price</th>
                        <th className="b-0">Quantity</th>
                        <th className="b-0 text-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, i) => (
                        <tr>
                          <td>{item.productId.name}</td>
                          <td>{item.productId.price}</td>
                          <td>
                            <button
                              onClick={(e) => increaseQty(item.productId._id)}
                              className="btn btn-primary btn-sm"
                            >
                              +
                            </button>
                            {item.quantity}
                            <button className="btn btn-primary btn-sm">
                              -
                            </button>
                          </td>
                          <td className="text-right">
                            <h5 className="font-medium m-b-30">{item.total}</h5>
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td colspan="3" align="right">
                          Subtotal :{payload.subTotal}
                        </td>
                        <td colspan="4" align="right">
                          {/* <button
                          className="btn btn-danger"
                          onClick={(e) => emptyCart()}
                        >
                          Empty cart
                        </button> */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
