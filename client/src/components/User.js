import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { connect } from "react-redux";
import { getUserCre, getUserRep } from "../actions/userActions";

import Loading from "./layout/Loading";

class User extends Component {
  componentWillMount() {
    this.props.getUserCre();
    this.props.getUserRep();
  }

  componentDidUpdate() {
    console.log(this.props.userCre.repositories);
  }

  render() {
    const {
      login,
      id,
      created_at,
      url,
      avatar_url
    } = this.props.userCre.basicCrd;

    const { repositories } = this.props.userCre;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img
                src={avatar_url}
                className="img-responsive card-img-top  mr-5"
                alt="image"
                style={{ width: "100%" }}
              />
            </div>
            <h4 className="text-secondary mt-2">{login}</h4>
          </div>
          <div className="col-md-9">
            <h5>Repositories</h5>
            <div className="row">
              {repositories.map(repo => (
                <div className="col-md-6 my-2">
                  <div className="card m-2 h-100 d-flex">
                    <div className="m-3">
                      <a href={repo.html_url}>
                        <h5>{repo.full_name}</h5>
                      </a>
                      <span className="text-secondary small d-block">
                        {repo.description}
                      </span>
                    </div>
                    <smal className="text-secondary small m-3 mt-auto text-right">
                      Repository owner: {repo.owner.login}
                    </smal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userCre: state.user
});

export default connect(
  mapStateToProps,
  { getUserCre, getUserRep }
)(User);
