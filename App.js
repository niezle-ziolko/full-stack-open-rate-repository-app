import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import theme from "./src/theme";
import Main from "./src/components/Main";

const client = new ApolloClient({
  uri: Constants.expoConfig.extra.apolloUri,
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <View style={styles.container}>
          <Main />
        </View>
      </NativeRouter>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background
  }
});

export default App;