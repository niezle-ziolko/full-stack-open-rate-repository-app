import { FlatList, ActivityIndicator, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "../utils/utils";
import useRepositories from "../hooks/useRepositories";

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const navigate = useNavigate();

  if (loading) return <ActivityIndicator style={styles.indicator} size="large" color={theme.colors.blue} />;
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