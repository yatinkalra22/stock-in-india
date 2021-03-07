import React, { Component } from "react";
import "./WatchList.css";
import { connect } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { deleteStockFromWatchList } from "../../actions/Stocks";
import EditButton from "../../assets/edit.svg";
import CancelButton from "../../assets/cancel.svg";
import StockChangeInfo from "../StockChangeInfo/StockChangeInfo";

const SortableItem = SortableElement(({ stock, index1, showStock }) =>
  showStock(stock, index1)
);

// Declaring a constant for rendering a list for mapping of items -
const SortableList = SortableContainer(
  ({ watchListStock, showStock }) => {
    return (
      <ul style={{ paddingLeft: "0px", cursor: "grab" }}>
        {watchListStock
          .sort((a, b) => a.sequence_number - b.sequence_number) //sorting based on sequence number
          .map((stock, index) => (
            <>
              <SortableItem
                key={`item-${index}`}
                index={index}
                index1={index}
                stock={stock}
                showStock={showStock}
              />
            </>
          ))}
      </ul>
    );
  },
  { withRef: true }
);

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
  showStock = (stock, index) => {
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
  };

  // rearrange logic here
  reArrange = async ({ oldIndex, newIndex }) => {
    const { watchListStock } = this.props;
    console.log("Only Swapping as of now");
    const temp = watchListStock[oldIndex].sequence_number;
    watchListStock[oldIndex].sequence_number =
      watchListStock[newIndex].sequence_number;
    watchListStock[newIndex].sequence_number = temp;
  };
  createWatchList = (watchListStock) => {
    return (
      <SortableList
        id="sortableBlockList"
        showStock={this.showStock}
        watchListStock={watchListStock}
        onSortEnd={this.reArrange}
        pressDelay={250}
      />
    );
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
