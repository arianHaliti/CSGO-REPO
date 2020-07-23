import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { removeAlert } from "../../actions/alert";
const Alert = ({ alerts, removeAlert }) => {
  return (
    alerts !== null &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        {alert.closable && (
          <button
            type="button"
            className="close-alert-button"
            onClick={() => removeAlert(alert.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps, { removeAlert })(Alert);
