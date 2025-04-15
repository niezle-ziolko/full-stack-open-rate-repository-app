import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, ActivityIndicator, FlatList, Text } from "react-native";

import theme from "../utils/theme";
import styles from "../utils/styles";
import ReviewItem from "./ReviewItem";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "../utils/utils";
import { GET_REPOSITORY } from "../graphql/queries";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network"
  });

  if (loading) return <ActivityIndicator style={styles.indicator} size="large" color={theme.colors.blue} />;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View style={styles.separator}>
          <RepositoryItem item={repository} showGithubButton />
        </View>
      )}
    />
  );
};

export default SingleRepository;