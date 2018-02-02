import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const EventProgress = ({ startTime, timeRemaining, eventName }) => {
  const timeToStart = moment.duration(moment(startTime).diff(moment()));
  const days = Math.floor(timeToStart.asDays());
  const hours = timeToStart.hours();
  const minutes = timeToStart.minutes();
  if (Date.parse(startTime) > Date.now()) {
    return (
      <span>
        {eventName} begins in {days && `${days} days,`}{" "}
        {hours > 0 && `${hours} hours`}{" "}
        {minutes > 0 && ` and ${minutes} minutes`}!
      </span>
    );
  }
  if (timeRemaining > 0) {
    return (
      <span>
        {timeRemaining.days()} days {timeRemaining.hours()} hours{" "}
        {timeRemaining.minutes()} minutes remaining
      </span>
    );
  }
  return <span>{eventName} has finished. See you next time!</span>;
};

EventProgress.propTypes = {
  startTime: PropTypes.string.isRequired,
  timeRemaining: PropTypes.shape().isRequired,
  eventName: PropTypes.string,
};

EventProgress.defaultProps = {
  startTime: moment().format(),
  timeRemaining: moment.duration(),
  eventName: "",
};

export default EventProgress;
