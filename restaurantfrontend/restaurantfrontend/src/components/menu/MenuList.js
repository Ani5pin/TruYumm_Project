import React, { useContext, useEffect, useState } from "react";
import { deleteMenuItem, getMenuItems } from "../../services/MenuItemsService";
import { checkoutCart, AddItemIntoCart } from "../../services/CartService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa6";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";

const MenuList = ({}) => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);
  console.log("after login", userContext);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteItem, SetDeleteItem] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const items = await getMenuItems(userContext.token);
      setMenuItems(items);
    } catch (error) {
      setError(`Failed to fetch menu items: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [userContext.token]);

  const handleDelete = async () => {
    try {
      // debugger
      setShow(false);
      const result = await deleteMenuItem(
        deleteItem?.menuItemId,
        userContext.token
      );
      // debugger
      // if (result?.success) {
      fetchMenuItems();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    navigate("/menu-save/0");
  };

  const handleUpdate = (id) => {
    navigate(`/menu-save/${id}`);
  };

  //add item into cart
  const handleCart = async (item) => {
    try {
      const cart = await AddItemIntoCart(
        { ...item, quantity: 1, userId: userContext.userId },
        userContext.token
      );
      toast(`${item.name} added to cart`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-4">Menu Items</h2>
        <div>
          {userContext.role === "1" && (
            <Button onClick={handleAdd}>+ADD</Button>
          )}
          {userContext.role === "2" && (
            <Button onClick={handleViewCart}>View Cart</Button>
          )}
        </div>
      </div>
      <ToastContainer />
      {error && <p className="text-danger">{error}</p>}
      {isLoading ? (
        <p>Loading menu items...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Launch Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.launchDate}</td>
                <td>
                  {userContext.role === "1" ? (
                    <>
                      <button
                        className="btn "
                        onClick={(e) => {
                          handleUpdate(item?.menuItemId);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          SetDeleteItem(item);
                          handleShow();
                        }}
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <BiSolidTrashAlt className="text-danger" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCart(item);
                        }}
                      >
                        <FaCartShopping />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          Are You sure you wanto to delete{" "}
          <span className="text-danger">{deleteItem?.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuList;
