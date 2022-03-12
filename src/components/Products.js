import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {Link} from'react-router-dom'

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);

  const [loading, setLoading] = useState(false);
  let componenMouted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componenMouted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componenMouted = false;
      };
    };
    getProducts()
  }, [])
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height="350" />
        </div>
        <div className="col-md-3">
          <Skeleton height="350" />
        </div>

        <div className="col-md-3">
          <Skeleton height="350" />
        </div>
      </>
    );
  }
  const fiterProduct = (cat) =>{
    const updateList = data.filter((x) => x.category === cat);
    setFilter(updateList)
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5">
          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter(data)}
          >
            ALL
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => fiterProduct("men's clothing")}
          >
            Men's cothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => fiterProduct("women's clothing")}
          >
            Women's cothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => fiterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => fiterProduct("electronics")}
          >
            Electronic{" "}
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4 ">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    height="300px"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-outline-dark">
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row mb-5">
          <h1 className="display-6 fw-bolder text-center">last product</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading/> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
