import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

const AuthorItems = ({ nftCollection, AuthorImage }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {
            !loading ?
              <>
                {nftCollection?.map((item) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                    <Card
                      likes={item.likes}
                      nftId={item.nftId}
                      price={item.price}
                      title={item.title} 
                      authorImage={AuthorImage}
                      nftImage={item.nftImage} />
                  </div>
                ))}
              </> : <>{new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item_wrap expbox">
                    <div className="skeleton-box "></div>
                  </div>
                </div>
              ))}</>
          }

        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
