import React, { useContext, useEffect, useState } from "react";
import {
  getCartItems,
  removeCartItem,
  checkoutCart,
  AddItemIntoCart,
  RemoveItemFromCart,
} from "../../services/CartService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { BiSolidTrashAlt } from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";

const Cart = () => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const items = await getCartItems(userContext.token);
      setCartItems(items);
      // console.log(items);
    } catch (error) {
      setError(`Failed to load cart items: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userContext.token]);

  const handleRemove = async (itemId) => {
    try {
      const result = await removeCartItem(itemId, userContext.token);
      if (result?.success) {
        toast("Item Removed successfully.");
        fetchCartItems();
      } else {
        toast("something went wrong.");
      }
    } catch (error) {
      toast("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart(userContext.token);
      setCartItems([]);
      alert("Checkout successful");
    } catch (error) {
      alert("Checkout failed");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleIncreaseQty = async (item) => {
    try {
      const cart = await AddItemIntoCart(
        { ...item, quantity: 1, userId: userContext.userId},
        userContext.token
      );
      fetchCartItems();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDecreaseQty = async (item) => {
    try {
      const cart = await RemoveItemFromCart(
        {
          ...item,
          quantity:  1,
          userId: userContext.userId
        },
        userContext.token
      );
      fetchCartItems();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-4">Cart</h2>
        <div>
          <Button onClick={handleBack}>Back</Button>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading ? (
        <p>Loading cart items...</p>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cartItemId}>
                    <td>{item.menuItemName}</td>
                    <td>{item.menuItemPrice}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDecreaseQty(item);
                          }}
                        >
                          -
                        </Button>
                        <span>{item.quantity} </span>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleIncreaseQty(item);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn "
                        onClick={() => handleRemove(item.cartItemId)}
                      >
                        <BiSolidTrashAlt className="text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {cartItems.length > 0 && (
            <button
              className="btn btn-success w-100 mt-4"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
