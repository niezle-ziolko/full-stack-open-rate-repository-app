import { useQuery } from '@apollo/client';
import { Link } from "react-router-native";
import { View, ScrollView } from "react-native";

import Text from "./Text";
import styles from "../utils/styles";
import SignOutTab from "./SignOutTab";
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data?.me;

  return (
    <View style={styles.header}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true}>
        <Link to="/" style={styles.tab}>
          <Text style={styles.headerText}>Repositories</Text>
        </Link>

        {authorizedUser ? (
          <SignOutTab styles={styles} />
        ) : (
          <Link to="/signin" style={styles.tab}>
            <Text style={styles.headerText}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;