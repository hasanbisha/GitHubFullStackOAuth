import React, { Component } from "react";

class Repository extends Component {
  render() {
    const { name, id, url, created_at } = this.props.repository;
    return (
      <div className="col-md-6 my-2">
        <h5>name: {name}</h5>
        <h5>id: {id}</h5>
        <h5>url: {url}</h5>
        <h5>created at: {created_at}</h5>
      </div>
    );
  }
}

export default Repository;
