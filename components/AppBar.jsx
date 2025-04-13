import { Link } from "react-router-native";
import { View, StyleSheet, ScrollView } from "react-native";

import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight + 15,
    backgroundColor: "#24292e",
    flexDirection: "row"
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true}>
        <Link to="/" style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.tab}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;