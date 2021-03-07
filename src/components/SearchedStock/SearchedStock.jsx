import React, { Component } from "react";
import "./SearchedStock.css";
import YellowBookMarkedStock from "../../assets/yellow-star.png";
import WhiteBookMarkedStock from "../../assets/white-star.png";
import history from "../../history";

export default class SearchedStock extends Component {
  redirectToStock = () => {
    history.push(`/stock-in-india/stock/${this.props.id}`);
  };
  render() {
    const { symbol, id, handleBookMarkClick, isBookMarked } = this.props;
    return (
      <div className="searched-stock-container" key={id}>
        <div className="stock-name" onClick={() => this.redirectToStock()}>
          {symbol}
        </div>
        <img
          className="bookmark-icon"
          src={isBookMarked ? YellowBookMarkedStock : WhiteBookMarkedStock}
          alt="BookMarkedStock"
          onClick={() => handleBookMarkClick(this.props)}
        />
      </div>
    );
  }
}
