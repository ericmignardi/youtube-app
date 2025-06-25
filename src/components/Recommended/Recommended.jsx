import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { viewCountConvertor } from "../../util/util.js";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=45&videoCategoryId=${categoryId}&key=${
      import.meta.env.VITE_API_KEY
    }`;
    await fetch(relatedVideoUrl)
      .then((res) => res.json())
      .then((res) => setApiData(res.items))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData &&
        apiData.map((item, index) => {
          return (
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              className="sideVideoList"
              key={index}
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="vidInfo">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{viewCountConvertor(item.statistics.viewCount)} Views</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Recommended;
