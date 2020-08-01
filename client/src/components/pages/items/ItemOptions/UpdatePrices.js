import React, { Fragment } from "react";
import moment from "moment";
import Moment from "react-moment";
import PreloaderCircle from "../../../layout/PreloaderCricle";
import Countdown from "react-countdown";

import { connect } from "react-redux";
import { updatePrices } from "../../../../actions/items";

const UpdatePrices = ({ invetoryStatus, updatePrices }) => {
  if (invetoryStatus.length === 0) {
    return <PreloaderCircle />;
  }
  let diff_end = 0;
  let timeout = 3;
  let current_server_time = Date.now();
  if (invetoryStatus.price_status === "processing") {
    let current_server_time = moment(Date.now());
    let price_end = moment(invetoryStatus.price_update_end_time);
    diff_end = price_end.diff(current_server_time, "seconds");
  }

  return (
    <div className=" row  col s4">
      <div className="items-update-prices">
        {invetoryStatus.price_status === "processing" ? (
          <div>
            <h5>Pirces are still processing</h5>
            <p>
              {" "}
              Start time at:{" "}
              <Moment format="MMMM Do YYYY, h:mm:ss a">
                {invetoryStatus.price_update_start_time}
              </Moment>{" "}
            </p>
            <p>
              {" "}
              End time aprox at:{" "}
              <Moment format="MMMM Do YYYY, h:mm:ss a">
                {invetoryStatus.price_update_end_time}
              </Moment>
            </p>

            <p>
              Total Items scanned aprox:{" "}
              <strong className="red-color-text">
                <Countdown
                  intervalDelay={timeout * 1000}
                  precision={timeout}
                  date={Date.now() + diff_end * 1000}
                  renderer={(props) => (
                    <span>
                      {Math.round(
                        (invetoryStatus.total_items * timeout -
                          Math.round(props.total / 1000)) /
                          timeout
                      )}
                    </span>
                  )}
                />
              </strong>
            </p>
            <p>
              EST:{" "}
              <strong className="red-color-text">
                {" "}
                <Countdown date={diff_end * 1000 + current_server_time}>
                  <span>You are good to go!</span>
                </Countdown>
              </strong>
            </p>
          </div>
        ) : (
          <Fragment>
            <h6>Update the item prices</h6>
            <button
              className="btn-large waves-effect waves-light  red lighten-1"
              onClick={updatePrices}
            >
              <b>
                Update
                <i className="material-icons right">update</i>
              </b>
            </button>
            <br></br>
            <small>
              {" "}
              Last update at:{" "}
              <Moment format="MMMM Do YYYY, h:mm:ss a">
                {invetoryStatus.price_update_end_time}
              </Moment>
            </small>
            <br></br>
            <small>
              {" "}
              Next Update ETA:{" "}
              {moment("1900-01-01 00:00:00")
                .add(timeout * invetoryStatus.total_items, "seconds")
                .format("HH:mm:ss")}
            </small>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default connect(null, { updatePrices })(UpdatePrices);
