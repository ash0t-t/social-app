import { useEffect, useState } from "react";
import {
  acceptRequest,
  declineRequest,
  getAllRequests,
} from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";
import { Link } from "react-router-dom";

export const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    getAllRequests().then((response) => {
      setRequests(response.payload);
    });
  }, []);

  const accept = (id: number) => {
    acceptRequest(id).then((response) => {
      console.log(response);
      setRequests((requests) =>
        requests.filter((request) => request.id !== id)
      );
    });
  };
  const decline = (id: number) => {
    declineRequest(id).then(() => {
      setRequests((requests) =>
        requests.filter((request) => request.id !== id)
      );
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Requests</h1>
      {requests.map((request) => (
        <div key={request.id} className="row no-gutters mb-4 p-4 bg-dark text-white rounded">
          <div className="col-md-3 col-lg-3 d-flex align-items-center">
            <img
              className="img-fluid rounded-circle"
              src={request.user.picture ? BASE + request.user.picture : DEF}
              alt={`${request.user.name} ${request.user.surname}`}
            />
          </div>
          <div className="col-md-9 col-lg-9 d-flex flex-column justify-content-center">
            <h3 className="display-6">
              {request.user.name} {request.user.surname}
            </h3>
            <Link to={`/profile/${request.user.id}`} className="btn btn-primary btn-sm mt-3">
              View Profile
            </Link>
            <div className="mt-3">
              <button onClick={() => accept(request.id)} className="btn btn-success btn-sm me-2">
                Accept
              </button>
              <button onClick={() => decline(request.id)} className="btn btn-danger btn-sm">
                Decline
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
