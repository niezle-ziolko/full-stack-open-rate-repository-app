import Constants from "expo-constants";
import { Link } from "react-router-native";
import { View, StyleSheet, ScrollView } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight + 15,
    backgroundColor: theme.colors.primary,
    flexDirection: theme.flexDirection.row
  },
  scrollContainer: {
    flexDirection: theme.flexDirection.row,
    alignItems: theme.align.center
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold
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