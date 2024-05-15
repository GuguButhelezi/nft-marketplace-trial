import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true)
  const [explore, setExplore] = useState([])
  const [clicked, setClicked] = useState(8)

  async function getExplore() {
    const exploreInfo = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore')
    setExplore(exploreInfo.data)
    setLoading(false)
    return exploreInfo
  }

  useEffect(() => {
    getExplore()
  }, [])

  function loadMore() {
    setClicked(clicked + 4)
    if (clicked === 16) {
      return
    }
  }

  function handleFilter(value) {
    if (value === 'price_low_to_high'){
      setExplore(explore.slice().sort((a, b) => (a.price - b.price)))
    }
    else if (value === 'price_high_to_low'){
      setExplore(explore.slice().sort((a, b) => (b.price - a.price)))
    }
    else if (value === 'likes_high_to_low'){
      setExplore(explore.slice().sort((a, b) => (b.likes - a.likes)))
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => handleFilter(event.target.value)}>
          <option value="" disabled>Default</option>
          <option value="price_low_to_high" >Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading ? <>
        {explore.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Card authorId={item.authorId} authorImage={item.authorImage} nftId={item.nftId} nftImage={item.nftImage} title={item.title} price={item.price} likes={item.likes} expiryDate={item.expiryDate} />
          </div>
        )).slice(0, clicked)}</> :
        <>
          {new Array(12).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item_wrap expbox">
                <div className="skeleton-box "></div>
              </div>
            </div>
          ))}
          </>
      }
      {clicked < 16 &&
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
            Load more
          </Link>
        </div>}
    </>
  );
};

export default ExploreItems;