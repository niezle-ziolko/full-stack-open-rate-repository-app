import { Formik } from 'formik';
import * as yup from 'yup';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  form: {
    padding: 16,
    gap: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 16
  },
  errorInput: {
    borderColor: '#d73a4a'
  },
  errorText: {
    color: '#d73a4a',
    marginTop: -8,
    marginLeft: 8
  }
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            value={values.username}
            placeholderTextColor="#ccc"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            style={[
              styles.input,
              touched.username && errors.username && styles.errorInput,
            ]}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Password"
            value={values.password}
            placeholderTextColor="#ccc"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            style={[
              styles.input,
              touched.password && errors.password && styles.errorInput,
            ]}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;