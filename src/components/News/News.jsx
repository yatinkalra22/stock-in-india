import React from "react";
import "./News.css";

export default function News(props) {
  const { news } = props;
  return (
    <div className="news-detail">
      <div>
        <div className="headline">{news.title}</div>
        {/* removed character count from news content  */}
        <div className="content">{news.content.split("[")[0]}</div>
      </div>
      <img className="news-icons" src={news.urlToImage} alt="News" />
    </div>
  );
}
