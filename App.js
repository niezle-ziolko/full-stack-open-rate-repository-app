import { View, StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native";

import Main from "./components/Main";

const App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Main />
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

export default App;