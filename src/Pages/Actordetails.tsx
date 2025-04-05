import * as React from "react";
import { useParams } from "react-router-dom";

const Actordetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="text-white">
      <h1>Actor Details Page</h1>
      <p>Actor ID: {id}</p>
    </div>
  );
};

export default Actordetails;
