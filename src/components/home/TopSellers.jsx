import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [loading, setLoading] = useState(true)
  const [sellers, setSellers] = useState([])

  async function getTopSellers() {
    const sellersInfo = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    setSellers(sellersInfo.data)
    setLoading(false)
    return sellersInfo
  }

  useEffect(() => {
    getTopSellers()
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading ?
                <>
                  {sellers.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))} </> : <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton-box skel-pp"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton-box skel-title topsell"></div>
                        <div className="skeleton-box skel-price"></div>
                      </div>
                    </li>
                  ))}
                </>}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
