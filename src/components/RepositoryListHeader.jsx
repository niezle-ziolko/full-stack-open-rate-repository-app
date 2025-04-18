import { View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import theme from "../utils/theme";
import styles from "../utils/styles";

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={styles.separator}>
      <View style={[styles.container, { paddingBottom: 0 }]}>
        <TextInput
          placeholder="Search repositories..."
          placeholderTextColor={theme.colors.grey}
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          style={styles.search}
        />
      </View>
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
};

export default RepositoryListHeader;