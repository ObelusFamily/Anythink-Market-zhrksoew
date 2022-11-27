import React, { useState } from "react";
import { connect } from "react-redux";
import agent from "../../agent";
import { APPLY_SEARCH_FILTER } from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapDispatchToProps = (dispatch) => ({
  onSearch: (payload) => dispatch({ type: APPLY_SEARCH_FILTER, payload }),
});

const Banner = (props) => {
  const [value, setValue] = useState("");

  const handleChange = async (e) => {
    const title = e.target.value;
    setValue(title);
    if (title.length >= 3) {
      const payload = await agent.Items.all(0, title);
      console.log(payload);
      props.onSearch(payload);
    }
    if (!title.length) {
      const payload = await agent.Items.all();
      props.onSearch(payload);
    }
    props.handler(title);
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to get</span>
          <input
            type="text"
            placeholder="What is that you truly desire"
            id="search-box"
            value={value}
            onChange={handleChange}
          />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Banner);
