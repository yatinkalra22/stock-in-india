import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./StockDetail.css";
import { getStockNews } from "../../actions/News";
import {
  getStockDetail,
  getStockGraph,
  deleteStockFromWatchList,
  addStockToWatchList,
} from "../../actions/Stocks";
// import BookMarkedStock from "../../assets/yellow-star.png";
import NotBookMarkedStock from "../../assets/white-star.png";
import News from "../News/News";
import Graph from "../Graph/Graph";
export class StockDetail extends Component {
  state = {
    graphDate: ["1D", "1W", "2W", "1M", "MAX"],
    selectedDate: "1D",
  };

  async componentDidMount() {
    await this.props.getStockNews();
    await this.props.getStockDetail(this.props.match.params.id);
    await this.props.getStockGraph(this.props.match.params.id, 1);
  }

  dateValue = (duration) => {
    if (duration === "1W") {
      duration = 7;
    } else if (duration === "2W") {
      duration = 14;
    } else if (duration === "1M") {
      duration = 30;
    } else if (duration === "MAX") {
      duration = "max";
    } else {
      duration = 1;
    }
    return duration;
  };

  handleDateChange = async (duration) => {
    const durationNumber = this.dateValue(duration);
    const { selectedDate } = this.state;
    if (selectedDate !== duration) {
      await this.props.getStockGraph(
        this.props.match.params.id,
        durationNumber
      );
      this.setState({ selectedDate: duration });
    }
  };
  createNewsList = (stockNews) => {
    return stockNews.map((news, index) => {
      return <News news={news} key={index} />;
    });
  };
  render() {
    const { graphDate, selectedDate } = this.state;
    const { stockNews, stock, stockGraph, isLoading } = this.props;
    console.log("this.props: ", this.props);
    return (
      <div className="stock-detail-container">
        {/* showing loader when fetching the stock list */}
        {isLoading ? (
          <div className="loader-position">
            <Loader
              type="BallTriangle"
              color="#5b83c3"
              height="50"
              width="70"
            />
          </div>
        ) : (
          <>
            <div className="info-record">
              <div className="name-detail">
                <div className="name">{stock.name}</div>
                <img
                  className="bookmark-icons"
                  src={NotBookMarkedStock}
                  alt="BookMarkedStock"
                  onClick={this.handleBookMarkClick}
                />
              </div>
              <div className="price-detail">
                <div className="price">
                  ₹{" "}
                  {stock.market_data ? stock.market_data.current_price.inr : 0}
                </div>
                <div>
                  {stock.market_data
                    ? stock.market_data.price_change_24h
                      ? stock.market_data.price_change_24h
                      : 0
                    : 0}{" "}
                  (
                  {stock.market_data
                    ? stock.market_data.price_change_percentage_24h
                      ? stock.market_data.price_change_percentage_24h.toFixed(2)
                      : 0
                    : 0}
                  %) today
                </div>
              </div>
            </div>
            <div className="graph">
              {!Object.keys(stockGraph).length == 0 ? (
                <Graph stockGraph={stockGraph} />
              ) : (
                <></>
              )}
            </div>
            <div className="graph-input">
              {graphDate.map((duration, index) => {
                return (
                  <div
                    className={
                      selectedDate === duration
                        ? "duration-selected"
                        : "duration-not-selected "
                    }
                    key={index}
                    onClick={() => this.handleDateChange(duration)}
                  >
                    {duration}
                  </div>
                );
              })}
            </div>
            <div className="news-section">
              <div className="title">News</div>
              <div className="news-list">
                {stockNews.length > 0 ? (
                  this.createNewsList(stockNews)
                ) : (
                  <div className="no-news-found">No News Available!</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stockNews: state.newsReducer.stockNews,
  stock: state.stockReducer.stock,
  isLoading: state.loadingReducer.isLoading,
  stockGraph: state.stockReducer.stockGraph,
  watchListStock: state.stockReducer.watchListStock,
});

export default connect(mapStateToProps, {
  getStockNews,
  getStockDetail,
  getStockGraph,
  deleteStockFromWatchList,
  addStockToWatchList,
})(StockDetail);
