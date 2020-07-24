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
  console.log(updatePrices);
  let diff = 0;
  let diff_end = 0;
  let current_server_time = Date.now();
  if (invetoryStatus.price_status === "processing") {
    let current_server_time = moment(Date.now());
    let prices_start = moment(invetoryStatus.price_update_start_time);
    let price_end = moment(invetoryStatus.price_update_end_time);
    diff = current_server_time.diff(prices_start, "seconds");
    diff_end = price_end.diff(current_server_time, "seconds");
  }
  console.log(diff, diff_end);
  return (
    <div className="items-above-section row">
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
                    intervalDelay={3000}
                    precision={3}
                    date={Date.now() + diff_end * 1000}
                    renderer={(props) => (
                      <span>
                        {Math.round(
                          (invetoryStatus.total_items * 3 -
                            Math.round(props.total / 1000)) /
                            3
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
                className="btn-large waves-effect waves-light  red lighten-2"
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
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updatePrices })(UpdatePrices);
