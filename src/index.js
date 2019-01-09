import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

export default class DateRangePicker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  state = {
    nextId: 0,
    verb: "on",
    date1: "",
    date2: "",
    validDate2: false,
    results: []
  };

  isValid = () => this.state.date1 !== "";

  renderAddButton = () => (
    <span onClick={this.handleAddDateRange}>
      {this.props.addButton ? this.props.addButton : <button>Add</button>}
    </span>
  );

  renderRemoveButton = id => (
    <span onClick={() => this.handleDeleteEntry(id)}>
      {this.props.removeButton ? (
        this.props.removeButton
      ) : (
        <button>Remove</button>
      )}
    </span>
  );

  handleSetVerb = e => this.setState({ verb: e.target.value });

  handleSetDate = e =>
    e.target.checkValidity() && this.setState({ date1: e.target.value });

  handleAddDateRange = () =>
    this.isValid()
      ? this.setState(
          {
            results: [
              ...this.state.results,
              {
                verb: this.state.verb,
                date1: this.state.date1,
                id: this.state.nextId
              }
            ],
            nextId: this.state.nextId + 1
          },
          () => this.props.onChange(this.state.results)
        )
      : alert("There is an invalid value");

  handleDeleteEntry = id =>
    this.setState(
      { results: this.state.results.filter(r => r.id !== id) },
      () => () => this.props.onChange(this.state.results)
    );

  render = () => (
    <div className={styles.DateRangePicker}>
      <div className="form">
        <select value={this.state.verb} onChange={this.handleSetVerb}>
          <option value="on">On </option>
          <option value="from">From</option>
          <option value="until">Until</option>
          <option value="between">Between</option>
        </select>
        &nbsp;
        <input
          type="date"
          value={this.state.date1}
          onChange={this.handleSetDate}
        />
        &nbsp;
        {this.renderAddButton()}
      </div>
      <ul className="list">
        {this.state.results.map(item => (
          <li className="item" key={item.id}>
            {item.verb} {item.date1}
            {this.renderRemoveButton(item.id)}
          </li>
        ))}
      </ul>
    </div>
  );
}
