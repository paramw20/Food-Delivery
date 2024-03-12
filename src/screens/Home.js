import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
// import Carousel from '../components/Carousel';

export default function Home() {
  const [FoodItems, setFoodItems] = useState([]);
  const [FoodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/new/fooddata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: 'contain !important' }}
        >
          <div className="carousel-indicators">
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt=""
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt=""
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt=""
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {FoodCat && FoodCat.length > 0 ? (
          FoodCat.map((data, index) => (
            <div className="row mb-3" key={index}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {FoodItems !== [] &&
                FoodItems.filter(
                  (item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLocaleLowerCase())
                ).map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodName={filterItems.name}
                      options={filterItems.options[0]}
                      imgSrc={filterItems.img}
                    ></Card>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
