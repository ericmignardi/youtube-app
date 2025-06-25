import React, { useEffect, useState } from "react";
import "./Player.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { viewCountConvertor } from "../../util/util.js";
import moment from "moment";
import { useParams } from "react-router-dom";

const Player = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
      import.meta.env.VITE_API_KEY
    }`;
    await fetch(videoDetailsUrl)
      .then((res) => res.json())
      .then((res) => setApiData(res.items[0]))
      .catch((err) => console.error(err));
  };

  const fetchOtherData = async () => {
    const channelDetailsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
      apiData.snippet.channelId
    }&key=${import.meta.env.VITE_API_KEY}`;
    await fetch(channelDetailsUrl)
      .then((res) => res.json())
      .then((res) => setChannelData(res.items[0]))
      .catch((err) => console.error(err));

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${
      import.meta.env.VITE_API_KEY
    }`;
    await fetch(commentUrl)
      .then((res) => res.json())
      .then((res) => setCommentData(res.items))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="playVideo">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : ""}</h3>
      <div className="playVideoInfo">
        <p>
          {apiData ? viewCountConvertor(apiData.statistics.viewCount) : ""}{" "}
          Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? viewCountConvertor(apiData.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apiData ? viewCountConvertor(apiData.statistics.dislikeCount) : ""}
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? viewCountConvertor(channelData.statistics.subscriberCount)
              : ""}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vidDescription">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : ""}</p>
        <hr />
        <h4>
          {apiData ? viewCountConvertor(apiData.statistics.commentCount) : ""}{" "}
          Comments
        </h4>
        {commentData &&
          commentData.map((item, index) => {
            return (
              <div className="comment" key={index}>
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span>
                      {moment(
                        item.snippet.topLevelComment.snippet.publishedAt
                      ).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="commentAction">
                    <img src={like} alt="" />
                    <span>
                      {viewCountConvertor(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Player;
