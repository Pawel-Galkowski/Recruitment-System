import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExp = ({
  experience: { title, company, from, to, location, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    <p>
      <strong>Location: </strong>
      {location}
    </p>
    {description === "" ? null : (
      <p>
        <strong>Description: </strong> {description}
      </p>
    )}
  </div>
);

ProfileExp.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExp;
