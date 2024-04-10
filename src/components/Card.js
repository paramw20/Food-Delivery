import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer'; 

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Half"); // Or set to "Full" if needed

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]);
  
    // Check if the item already exists in the cart
    const existingItemIndex = data.findIndex(
      (item) => item.id === props.foodItem._id && item.name === props.foodItem.name && item.size === size
    );
  
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        name: props.foodItem.name,
        size: size,
        qty: parseInt(data[existingItemIndex].qty) + parseInt(qty) // Update quantity
      });
    } else {
      // Item doesn't exist, add as new
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    }
  };
  

  return (
    <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
      <div className="card-body d-flex flex-column">
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: '120px', objectFit: 'fill' }}
        />

        <div className="card-title d-flex justify-content-between">
          <h5>{props.foodItem.name}</h5>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column align-items-end">
              <p className="mb-0">Total Bill</p>
              <div className="d-flex align-items-center">
                <select className="h-50 bg-success me-2" value={qty} onChange={(e) => setQty(e.target.value)}>
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select className="h-50 bg-success me-2" ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                  {priceOptions.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center mb-2">
            <div>
              <p className="h6">{props.options.array1}</p>
              <p className="h6">{props.options.array2}</p>
            </div>
          </div>
          <p className="mb-1">{qty * parseInt(options[size])}/-</p>
          <p>
            <button
              className={'btn btn-success justify-center ms-2'}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
