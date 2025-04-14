import PropTypes from "prop-types";
import { Pressable } from "react-native";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import AuthStorage from "../utils/authStorage";

const SignOutTab = ({ styles }) => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = new AuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <Pressable style={styles.tab} onPress={handleSignOut}>
      <Text style={styles.text}>Sign out</Text>
    </Pressable>
  );
};

SignOutTab.propTypes = {
  styles: PropTypes.shape({
    tab: PropTypes.any,
    text: PropTypes.any,
  }).isRequired,
};

export default SignOutTab;