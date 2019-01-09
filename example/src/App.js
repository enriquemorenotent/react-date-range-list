import React, { Component } from "react";

import DateRangePicker from "react-date-range-list";

export default class App extends Component {
  render = () => (
    <div className="test">
      <DateRangePicker onChange={console.log} />
      <DateRangePicker addButton={<span>Add a new entry</span>} />
      <DateRangePicker removeButton={<span>Remove this entry</span>} />
    </div>
  );
}
