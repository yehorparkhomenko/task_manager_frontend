import React from 'react';
import { connect } from 'react-redux'
import './App.css';

const mapStateToProps = state => ({
  username: state.username
});

function UserInfo(props) {
  return (
      <div className="username">
          {props.username}
      </div>
  )
}

export default connect(mapStateToProps, null)(UserInfo);