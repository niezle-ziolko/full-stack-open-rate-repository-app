import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
  });

  if (error) {
    console.error("Error fetching repositories:", error.message);
    return { repositories: [], loading: false, error };
  };

  const repositories = data?.repositories?.edges?.map(edge => edge.node) ?? [];

  return { repositories, loading, error: null };
};

export default useRepositories;