import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams()
  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(author.followers)

  async function getAuthor() {
    const authorInfo = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setAuthor(authorInfo.data)
    setFollowerCount(authorInfo.data.followers)
    setLoading(false)
    return authorInfo
  }

  function handleFollow() {
    if (following) {
      setFollowing(false)
      setFollowerCount(followerCount - 1)
    }
    else {
      setFollowing(true)
      setFollowerCount(followerCount + 1)
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getAuthor()
  }, [])


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        >
        </section>
        {!loading ? <> <section aria-label="section">
          <div className="container" >
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followerCount} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollow}>
                        {following ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={author.nftCollection} AuthorImage={author.authorImage} />
                </div>
              </div>
            </div>
          </div>
        </section>
        </> : <> <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">

                    <div className="skeleton-box" style={{height: 150, width: 150, borderRadius: 75}}></div>

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                        <div className="skeleton-box skel-title"></div>
                          <span className="profile_username"><div className="skeleton-box skel-title"></div></span>
                          <span id="wallet" className="profile_wallet">
                            <div className="skeleton-box skel-code"></div>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower"><div className="skeleton-box skel-title"></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple" style={{display: "flex", flexWrap: "wrap"}}>
                {new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item_wrap expbox">
                    <div className="skeleton-box "></div>
                  </div>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        </>}

      </div>
    </div>
  );
};

export default Author;
