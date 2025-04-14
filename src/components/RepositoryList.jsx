import { FlatList, View, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const navigate = useNavigate();

  if (loading) return <ActivityIndicator size="large" color={theme.colors.blue} />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;