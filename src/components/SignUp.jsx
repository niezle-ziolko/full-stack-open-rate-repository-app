import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { View, TextInput, TouchableOpacity } from "react-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import useSignIn from "../hooks/useSignIn";
import { CREATE_USER } from "../graphql/mutations";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(5).max(30).required(),
  password: Yup.string().min(5).max(50).required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required()
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: ""
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
    };
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <View style={styles.form}>
            <TextInput
              name="username"
              placeholder="Username"
              placeholderTextColor={theme.colors.grey}
              style={[
                styles.input,
                touched.username && errors.username && styles.errorInput
              ]}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              name="password"
              type="password"
              placeholder="Password"
              placeholderTextColor={theme.colors.grey}
              style={[
                styles.input,
                touched.password && errors.password && styles.errorInput
              ]}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              placeholderTextColor={theme.colors.grey}
              style={[
                styles.input,
                touched.passwordConfirmation && errors.passwordConfirmation && styles.errorInput
              ]}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;