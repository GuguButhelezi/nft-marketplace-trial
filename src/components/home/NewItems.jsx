import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Timer from "../UI/Timer";

const NewItems = () => {

  const [loading, setLoading] = useState(true)
  const [newItems, setNewItems] = useState([])
  const options = {
    items: 1,
    loop: true,
    dots: false,
    nav: true,
    margin: 10,
    responsive: {
      1100: {
        items: 4,
      },
      768: {
        items: 3,
      },
      500: {
        items: 2,
      },
      480: {
        items: 1,
        margin: 40,
      }
    }
  }

  async function getNewItems() {
    const itemsInfo = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    setNewItems(itemsInfo.data)
    setLoading(false)
    return itemsInfo
  }

  useEffect(() => {
    getNewItems()
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ?
            <OwlCarousel {...options}>
              {newItems.map((item) => (
                <div className="nft__item" key={item.id}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate ?
                    <Timer expiryDate={item.expiryDate}/> : ''}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel> : <div className="container">
              <div className="row">
                <OwlCarousel {...options} nav>
                  {new Array(4).fill(0).map((_, index) => (
                    <div className="nft__item" key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton-box skel-pp"></div>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>


                        <div className="skeleton-box box-new"></div>
                      </div>
                      <div className="skeleton-box skel-title skel-title_new"></div>

                      <div className="skel-new">

                        <div className="skeleton-box skel-code"></div>

                        <div className="skeleton-box skel-like"></div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>

          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
