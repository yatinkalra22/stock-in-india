import React, { Component } from "react";
import "./WatchList.css";
import { connect } from "react-redux";
import { deleteStockFromWatchList } from "../../actions/Stocks";
import EditButton from "../../assets/edit.svg";
import CancelButton from "../../assets/cancel.svg";
import StockChangeInfo from "../StockChangeInfo/StockChangeInfo";

export class WatchList extends Component {
  state = {
    shouldEdit: false,
  };
  handleEditClick = () => {
    const { shouldEdit } = this.state;
    this.setState({ shouldEdit: !shouldEdit });
  };
  deleteFromWatchList = (props) => {
    const { id, name, symbol } = props;
    const stock = { name, id, symbol };
    this.props.deleteStockFromWatchList(stock);
  };
  createWatchList = (markedStocks) => {
    return markedStocks.map((stock, index) => {
      return (
        <StockChangeInfo
          id={stock.id}
          symbol={stock.symbol}
          key={index}
          shouldDelete={this.state.shouldEdit}
          deleteFromWatchList={this.deleteFromWatchList}
          percentChange={stock.percentChange}
          priceChange={stock.priceChange}
          currentPrice={stock.currentPrice}
        />
      );
    });
  };
  render() {
    const { shouldEdit } = this.state;
    const { watchListStock } = this.props;
    return (
      <div className="watch-list-container">
        <div className="title">
          <div>WatchList</div>
          {watchListStock.length > 0 ? (
            <img
              className="icons"
              src={shouldEdit ? CancelButton : EditButton}
              alt="EditButton"
              onClick={this.handleEditClick}
            />
          ) : (
            <></>
          )}
        </div>
        {watchListStock.length > 0 ? (
          <div className="stock-change-info-container">
            <div className="stock-change-detail">
              <div className="watch-list-label">Name</div>
              {/* <img className="graph-icon" src={Graph} alt="Graph" /> */}
              <div className="watch-list-label">%Change</div>
              <div className="watch-list-label">Day Change</div>
              <div className="watch-list-label">Price</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="watch-list-stock">
          {watchListStock.length > 0 ? (
            this.createWatchList(watchListStock)
          ) : (
            <div className="no-stock-found">Stock Not Found!!</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  watchListStock: state.stockReducer.watchListStock,
});

export default connect(mapStateToProps, { deleteStockFromWatchList })(
  WatchList
);
