import { useParams } from 'react-router-native';
import { View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <RepositoryItem item={data.repository} showGithubButton />
    </View>
  );
};

export default SingleRepository;