import { useEffect, useState } from "react";
import { IUser } from "../../helpers/types";
import { getAllFollowers } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";
import { Link } from "react-router-dom";

export const Followers = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);
  useEffect(() => {
    getAllFollowers().then((response) => {
      setFollowers(response.payload);
    });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Followers</h1>
      {followers.map((follower) => (
        <div key={follower.id} className="row no-gutters mb-4 p-4 bg-dark text-white rounded">
          <div className="col-md-3 col-lg-3 d-flex align-items-center">
            <img
              className="img-fluid rounded-circle"
              src={follower.picture ? BASE + follower.picture : DEF}
              alt={`${follower.name} ${follower.surname}`}
            />
          </div>
          <div className="col-md-9 col-lg-9 d-flex flex-column justify-content-center">
            <h3 className="display-6">
              {follower.name} {follower.surname}
            </h3>
            <Link to={`/profile/${follower.id}`} className="btn btn-primary btn-sm mt-3">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
