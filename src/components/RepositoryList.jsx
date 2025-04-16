import { useState } from "react";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { FlatList, ActivityIndicator, Pressable, View } from "react-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "../utils/utils";
import useRepositories from "../hooks/useRepositories";

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");

  const getOrderVariables = () => {
    switch (selectedOrder) {
      case "highest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  };

  const { orderBy, orderDirection } = getOrderVariables();
  const { repositories, loading, error } = useRepositories({ orderBy, orderDirection });
  const navigate = useNavigate();

  if (loading) return <ActivityIndicator style={styles.indicator} size="large" color={theme.colors.blue} />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  const SortPicker = () => (
    <View style={styles.separator}>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(value) => setSelectedOrder(value)}
          style={styles.picker}
          dropdownIconColor={theme.colors.blue}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    </View>
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={SortPicker}
    />
  );
};

export default RepositoryList;