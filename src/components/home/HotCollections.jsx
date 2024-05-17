import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
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
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getHotCollections() {
    const info = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
    setData(info.data)
    setLoading(false)
    return info
  }
  
  useEffect(() => {
    getHotCollections();
  }, [])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ?
            <OwlCarousel {...options}>
              {data.map((item) => (
                <div className="nft_coll" key={item.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy pp-coll" src={item.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel> :
            <div className="container">
              <div className="row">
              <OwlCarousel {...options} nav>
                {new Array(4).fill(0).map((_, index) => (
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap">
                        <div className="skeleton-box" alt=""> </div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton-box skel-pp"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info skel-info">
                        <h4 className="skeleton-box skel-title"></h4>
                        <span className='skeleton-box skel-code'></span>
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

export default HotCollections;
