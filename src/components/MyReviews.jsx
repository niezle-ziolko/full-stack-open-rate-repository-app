import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { FlatList, View, Text, ActivityIndicator } from "react-native";

import styles from "../utils/styles";
import theme from "../utils/theme";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network"
  });

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={theme.colors.blue}
      />
    );
  };

  if (error) {
    return (
      <Text style={styles.errorFetch}>Error: {error.message}</Text>
    );
  };

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.separator}>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.username}>{item.repository.fullName}</Text>
                <Text style={styles.date}>{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;