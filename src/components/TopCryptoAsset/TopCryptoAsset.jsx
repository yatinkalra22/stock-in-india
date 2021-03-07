import React, { Component } from "react";
import "./TopCryptoAsset.css";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import {
  getAllStocks,
  addStockToWatchList,
  deleteStockFromWatchList,
  getStockDetail,
} from "../../actions/Stocks";
import SearchedStock from "../SearchedStock/SearchedStock";

export class TopCryptoAsset extends Component {
  async componentDidMount() {
    await this.props.getAllStocks();
  }
  state = {
    isAlreadyBookmarked: false,
  };

  handleBookMarkClick = async (props) => {
    const { id, name, symbol } = props;
    const { watchListStock, stock } = this.props;
    await this.props.getStockDetail(id);
    const stockObject = {
      name,
      id,
      symbol,
      priceChange: stock.market_data
        ? stock.market_data.price_change_24h
          ? stock.market_data.price_change_24h
          : 0
        : 0,
      percentChange: stock.market_data
        ? stock.market_data.price_change_percentage_24h
          ? stock.market_data.price_change_percentage_24h
          : 0
        : 0,
      currentPrice: stock.market_data
        ? stock.market_data.current_price.inr
          ? stock.market_data.current_price.inr
          : 0
        : 0,
      sequence_number: watchListStock.length + 1,
    };
    // checking if stock is already bookmarked
    if (watchListStock.some((watchStock) => watchStock.id === id)) {
      this.props.deleteStockFromWatchList(stockObject);
      this.setState({ isAlreadyBookmarked: true });
    } else {
      this.props.addStockToWatchList(stockObject);
      this.setState({ isAlreadyBookmarked: false });
    }
  };

  createStockList = (stockList, watchListStock) => {
    let isBookMarked = false;
    stockList = stockList.slice(0, 100);
    return stockList.map((stock, index) => {
      isBookMarked = false;
      if (watchListStock.some((watchStock) => watchStock.id === stock.id)) {
        isBookMarked = true;
      }
      return (
        <SearchedStock
          name={stock.name}
          symbol={stock.symbol}
          key={index}
          id={stock.id}
          handleBookMarkClick={this.handleBookMarkClick}
          isBookMarked={isBookMarked}
        />
      );
    });
  };
  render() {
    let { stockList, isLoading, searchValue, watchListStock } = this.props;
    if (searchValue) {
      stockList = stockList.filter((stock) => {
        return stock.symbol === null
          ? null
          : stock.symbol.toLowerCase().indexOf(searchValue.toLowerCase()) !==
              -1;
      });
      this.createStockList(stockList, watchListStock);
    }
    return (
      <div className="top-crypto-asset-container">
        <div className="title">Top Crypto Assets</div>
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
          <div className="top-crypto-list">
            {stockList.length > 0 ? (
              this.createStockList(stockList, watchListStock)
            ) : (
              <div className="no-stock-found">Stock Not Found!!</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stockList: state.stockReducer.stockList,
  isLoading: state.loadingReducer.isLoading,
  watchListStock: state.stockReducer.watchListStock,
  stock: state.stockReducer.stock,
});

export default connect(mapStateToProps, {
  getAllStocks,
  addStockToWatchList,
  deleteStockFromWatchList,
  getStockDetail,
})(TopCryptoAsset);
