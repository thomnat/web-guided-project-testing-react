import React from "react";

const MissionsList = (props) => {
  return (
    <section className="missions-list">
      {props.error ? (
        <div className="error">{props.error}</div>
      ) : (
        //added this data-testid that way we can select this in our test
        <div data-testid="mission-list">
          {props.missions.map((mission) => (
            <div
              className="mission"
              data-testid="mission"//will use this data testid in our test because we want to make sure that every individual mission is being rendered properly
              key={mission.mission_id}
            >
              {mission.mission_name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MissionsList;
