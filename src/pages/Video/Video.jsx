import React from "react";
import "./Video.css";
import Player from "../../components/Player/Player";
import Recommended from "../../components/Recommended/Recommended";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="playContainer">
      <Player videoId={videoId} categoryId={categoryId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
