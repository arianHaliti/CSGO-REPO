import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Preloader from "../../layout/Preloader";
import SingleUser from "./SingleUser";
//redux
import { connect } from "react-redux";
import { getUsers } from "../../../actions/users";

const Users = ({ getUsers, users: { users, loading } }) => {
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <div className="row">
        {users.map((user) => (
          <SingleUser user={user} />
        ))}
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(Users);
