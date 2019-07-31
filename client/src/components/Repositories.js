import React, { Component } from "react";
import Repository from "./Repository";
import Loading from "./layout/Loading";

import { connect } from "react-redux";

import { getUserRep } from "../actions/userActions";

class Repositories extends Component {
  componentWillMount() {
    this.props.getUserRep();
  }

  render() {
    console.log(this.props.isLoading);
    return (
      <div className="container">
        <h1 className="mt-5">Repositories</h1>
        <div className="row">
          {!this.props.isLoading
            ? this.props.Repositories.map(repository => (
                <Repository key={repository.id} repository={repository} />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Repositories: state.user.repositories,
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  { getUserRep }
)(Repositories);
