import { useEffect, useState } from "react";
import { IUser } from "../../helpers/types";
import { getAllFollowings } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";
import { Link } from "react-router-dom";

export const Followings = () => {
  const [followings, setFollowings] = useState<IUser[]>([]);
  useEffect(() => {
    getAllFollowings().then((response) => {
      setFollowings(response.payload);
    });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Followings</h1>
      {followings.map((following) => (
        <div key={following.id} className="row no-gutters mb-4 p-4 bg-dark text-white rounded">
          <div className="col-md-3 col-lg-3 d-flex align-items-center">
            <img
              className="img-fluid rounded-circle"
              src={following.picture ? BASE + following.picture : DEF}
              alt={`${following.name} ${following.surname}`}
            />
          </div>
          <div className="col-md-9 col-lg-9 d-flex flex-column justify-content-center">
            <h3 className="display-6">
              {following.name} {following.surname}
            </h3>
            <Link to={`/profile/${following.id}`} className="btn btn-primary btn-sm mt-3">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
