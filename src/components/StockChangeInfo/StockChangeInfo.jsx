import React from "react";
import "./StockChangeInfo.css";
// import Graph from "../../assets/graph.png";
import DeleteGif from "../../assets/delete.gif";
import history from "../../history";

export default function StockChangeInfo(props) {
  const {
    id,
    symbol,
    percentChange,
    priceChange,
    currentPrice,
    shouldDelete,
    deleteFromWatchList,
  } = props;

  const redirectToStock = () => {
    history.push(`/stock-in-india/stock/${id}`);
  };
  return (
    <div className="stock-change-info-container" id={id}>
      <div className="stock-change-detail" onClick={redirectToStock}>
        <div>{symbol}</div>
        {/* <img className="graph-icon" src={Graph} alt="Graph" /> */}
        <div>{percentChange}%</div>
        <div>{priceChange}</div>
        <div>{currentPrice}</div>
      </div>
      {shouldDelete ? (
        <img
          className="delete-icon"
          src={DeleteGif}
          alt="DeleteButton"
          onClick={() => deleteFromWatchList(props)}
        />
      ) : (
        <div className="delete-icon"></div>
      )}
    </div>
  );
}
