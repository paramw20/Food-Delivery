import React from 'react';

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const handleAddToCart = () => {};

  return (
    <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
      <div className="card-body d-flex flex-column">
        <img
          src={props.imgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: '120px', objectFit: 'fill' }}
        />

        <div className="card-title d-flex justify-content-between">
          <h5>{props.foodName}</h5>
          <div className="d-flex align-items-center">
            {/* Combined total bill and dropdowns into one container */}
            <div className="d-flex flex-column align-items-end">
              <p className="mb-0">Total Bill</p>
              <div className="d-flex align-items-center">
                <select className="h-50 bg-success me-2">
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select className="h-50 bg-success me-2">
                  {priceOptions.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                <select className="h-50 bg-success">
                  <option value="half">Half</option>
                  <option value="full">Full</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-start">
          {/* Added container for array items and adjusted styles */}
          <div className="d-flex align-items-center mb-2">
            {/* <p className="mb-0 me-2">Array 1-2:</p> */}
            <div>
              <p className="h6">{props.options.array1}</p>
              <p className="h6">{props.options.array2}</p>
            </div>
          </div>
          <p>
          <button
            className={'btn btn-success justify-center ms-2'}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </p>
          {/* <p className="card-text mb-3">Some quick example text</p> */}
        </div>
        
      </div>
    </div>
  );
}
