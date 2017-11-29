import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Progress from "libs/components/Progress";

import DisplayEvent from "./DisplayEvent";

const CurrentEventCard = ({
  currentEvent,
  nextEvent,
  className,
  competitionStart,
  competitionEnd,
}) => {
  const duration = moment.duration(moment(competitionEnd).diff(moment()));
  const fullDuration = moment.duration(
    moment(competitionEnd).diff(moment(competitionStart)),
  );
  const progress = 100 - duration * 100 / fullDuration;
  return (
    <div className={className}>
      <div className="card-body">
        <section className="card-section">
          <div>
            <h2>What{"'"}s On</h2>
            {Object.keys(currentEvent).length > 0 ? (
              <DisplayEvent
                id={currentEvent.id}
                name={currentEvent.name}
                startTime={currentEvent.start_time}
                endTime={currentEvent.end_time}
              />
            ) : (
              <h3>No events current happening.</h3>
            )}
          </div>
        </section>
        <section className="card-section">
          <h2>Coming Up Next</h2>
          {Object.keys(nextEvent).length > 0 ? (
            <DisplayEvent
              id={nextEvent.id}
              name={nextEvent.name}
              startTime={nextEvent.start_time}
              endTime={nextEvent.end_time}
            />
          ) : (
            <h3>No events coming up.</h3>
          )}
        </section>
      </div>
      <div className="card-footer">
        <p>Hackathon Progress</p>
        <Progress value={progress} max={100} />
        {<p>About {Math.floor(duration.asHours())} hours remaining</p>}
      </div>
    </div>
  );
};

CurrentEventCard.propTypes = {
  currentEvent: PropTypes.shape(),
  nextEvent: PropTypes.shape(),
  className: PropTypes.string,
  competitionStart: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  competitionEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

CurrentEventCard.defaultProps = {
  currentEvent: {},
  nextEvent: {},
  className: "",
  competitionStart: moment(),
  competitionEnd: moment(),
};

export default CurrentEventCard;
