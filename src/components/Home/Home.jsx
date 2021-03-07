import React, { Component } from "react";
import { connect } from "react-redux";
import HamburgerMenu from "../../assets/hamburger-menu.svg";
import Search from "../../assets/search.svg";
import "./Home.css";
import TopCryptoAsset from "../TopCryptoAsset/TopCryptoAsset";
import WatchList from "../WatchList/WatchList";

export class NavBar extends Component {
  state = {
    showSearchBox: false,
    searchValue: "",
  };
  onSearchClick = () => {
    const { showSearchBox } = this.state;
    this.setState({ showSearchBox: !showSearchBox });
    if (!showSearchBox) {
      this.setState({ searchValue: "" });
    }
  };
  onHandleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { showSearchBox, searchValue } = this.state;
    return (
      <>
        <nav className="home-container">
          {showSearchBox ? (
            <input
              type="text"
              className="search-input"
              placeholder="Search Stock"
              name="searchValue"
              value={searchValue}
              onChange={this.onHandleChange}
            />
          ) : (
            <img className="icons" src={HamburgerMenu} alt="Hamburger Menu" />
          )}
          <img
            className="icons"
            src={Search}
            alt="SearchIcon"
            onClick={this.onSearchClick}
          />
        </nav>

        {showSearchBox ? (
          <TopCryptoAsset searchValue={this.state.searchValue} />
        ) : (
          <WatchList />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(NavBar);
