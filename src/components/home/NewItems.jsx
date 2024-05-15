import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Card from "../UI/Card";

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
                <Card key={item.id} authorId={item.authorId} authorImage={item.authorImage} nftId={item.nftId} nftImage={item.nftImage} title={item.title} price={item.price} likes={item.likes} expiryDate={item.expiryDate}/>
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
