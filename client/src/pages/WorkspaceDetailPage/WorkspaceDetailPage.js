import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../Api";

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`)
      .then((res) => setWorkspace(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <div>
      <h1>{workspace?.name}</h1>
      <p>Here is a workspace with all boards. ._.</p>
    </div>
  );
};

export default WorkspaceDetailPage;
