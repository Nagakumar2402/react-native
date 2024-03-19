# React Native form validations with Formik and Yup

**_Formik_** is a simple React/React Native form library that helps with handling form state, input validation, formatting, error handling, form submission, amongst other things. Formik keeps everything simple under the hood using react state and pros making it easy to understand, integrate, debug, and test your forms.

We will also sprinkle some **_Yup_** into the mix to help with building the schema for validating and parsing the form inputs.

#### let’s add the two libraries we will be using:

```powershell
npm install formik yup
```

## Login form

Starting with the easier of the forms. This should have two inputs for email and password and a login button.

Let’s do some clean up first before we start adding our text inputs. Update App.js as seen here:

```jsx
// App.js
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Text>Login Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  },
});

export default App;
```

1. When adding TextInputs for say email addresses, it requires us to set up state for storing the email value and a handleEmailChange function to handle text changes and update email state.

2. This can become too much especially when you’re working with a lot of inputs.

3. This is where Formik comes in to help handle all this repetitive work. So let’s see how to do it with Formik, let’s add the email input form using Formik.

We’ll start by importing the Formik library and then setting up the inputs:

```jsx
import {Formik} from 'formik';

<View style={styles.loginContainer}>
  <Text>Login Screen</Text>
  <Formik
    initialValues={{email: '', password: ''}}
    onSubmit={values => console.log(values)}>
    {({handleChange, handleBlur, handleSubmit, values}) => (
      <>
        <TextInput
          name="email"
          placeholder="Email Address"
          style={styles.textInput}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address"
        />
        <TextInput
          name="password"
          placeholder="Password"
          style={styles.textInput}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
        />
        <Button onPress={handleSubmit} title="Submit" />
      </>
    )}
  </Formik>
</View>;

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
```

Currently, our onSubmit function is a `console.log` statement for the values passed. This is where our login function will come in and get those values for processing.

As you might have noticed, however, we can _submit without_ values, with a wrongly formatted email address amongst other defects. We do not want that to be the case, we want the user to only be able to log in when they enter a correctly formatted email and a password. Until then, we’d like the login button to be disabled.

This is where input validation comes in, we would like to create a validation schema that will check if the format of inputs is as expected. As mentioned we will be using **_Yup to create the validation schema_** and provide custom error messages for each check.

Let’s create the login validation schema as seen below:

```jsx
// App.js
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
```

As seen in the schema, email is supposed to be a string() of formatted email to check whether it’s the correct email format, we are also returning a corresponding error message if a check fails, we’ll display this later on.

For the password field, it is also a required string as seen, we also add another check for the minimum number of characters, min(8) to ensure the password has a minimum of 8 characters.

There are a lot more checks you can add to your inputs, check out the Yup docs for more.

Now let’s add this schema to our Formik form so that we can use it to validate our inputs. We’ll update our Form as seen below:

```jsx
// App.js

<Formik
  validationSchema={loginValidationSchema}
  initialValues={{email: '', password: ''}}
  onSubmit={values => console.log(values)}>
  {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
    <>
      <TextInput
        name="email"
        placeholder="Email Address"
        style={styles.textInput}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        keyboardType="email-address"
      />
      {errors.email && (
        <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
      )}
      <TextInput
        name="password"
        placeholder="Password"
        style={styles.textInput}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        secureTextEntry
      />
      {errors.password && (
        <Text style={{fontSize: 10, color: 'red'}}>{errors.password}</Text>
      )}
      <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid} />
    </>
  )}
</Formik>
```

![alt text](Withouttouchedcheck.gif)

1. We added our `validationSchema` as seen above, all our inputs are validated against the schema after every change to ensure they match the expected format.

2. If they don’t `errors` are generated for each input depending on the current input.

3. To display the `errors` we destructure them from the Formik props as shown above and display them below the corresponding text inputs.

4. We also access the` isValid` state which is a boolean value that is used to check if the inputs are valid or not, we’ll use this to set the `disabled` state of the login button.

5. Due to the fact that all inputs are checked after every change, we will have errors getting displayed even when a user hasn’t started interacting with that input.

6. We do not want that to be the case so we will add a check to ensure errors are shown only after the user touches an input.

7. We will also add a check to ensure that the login **_button is disabled_** when the inputs are invalid.

## Sign up form

In the previous section on login form, we used Formik to handle our forms but still had to pass the different functions (like `handleChange`, `handleBlur value`, etc.) to each `TextInput`, this can become a lot of work as inputs increase.

Formik provides a component `Field` that automatically hooks up inputs to Formik for us. In this section, we will explore that.

Let’s start this section by creating a `CustomInput` component that will be passed into the `Field component`, get the `Formik props`, and handle the inputs for us.

We’ll create a file named `CustomInput.js` and add the following code to it:

[refer](https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/)

```jsx
import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
```

As you can see, this CustomInput takes care of a lot of the things we were doing in the login form TextInputs, from handling the input, styling, checking for and rendering errors, etc.

Now let’s create a new file **_SignUp.js_** that will house our sign up form.

```jsx
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const SignUp = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Sign Up Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
});
export default SignUp;
```

Now let’s import the CustomInput we created and get started with our SignUp form using the Field component

```jsx
import CustomInput from './CustomInput'

...
          <Text>Sign Up Screen</Text>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => console.log(values)}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomInput}
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="SIGN UP"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
```

![alt text](Withoutvalidation.gif)
D:\New folder\formik\formikExample\Withoutvalidation.gif
As you may notice, since Field automatically hooks up the input to Formik, we are destructuring way fewer props from Formik since they get passed directly to CustomInput. This creates cleaner and easier to read code.

We also added a few more inputs, full name, phone number, password, and confirm password.

Finally, for our sign up form, let’s add the validationSchema. We will also take this opportunity to flex some yup validation muscle. One of the key benefits of yup is that we can use its vast extensible API to validate different input formats.

We will use the validation schema to:

1. Check if required values are present
2. Use regex to check whether formats are as expected for full name and phone
3. Use regex to ensure password strength for our users
4. Check if our password and confirm password match
   Alright, let’s add the validation schema:

```jsx
const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phoneNumber: yup
    .string()
    .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});
```

![alt text](fullsignupform.gif)
D:\New folder\formik\formikExample\fullsignupform.gif
Then pass it to our Formik form `validationSchema={signUpValidationSchema}`.

For the full name above, we use regex to ensure that the users enter at least two names. We also use regex to check the phone number format, in this case checking if the number is in the format 01xxxxxxxx.

Then finally for the password, we use regex to ensure the user creates a password with at least one small letter, one capital letter, one number, one special character, and at least 8 characters.

We also use Yup to ensure that confirm password matches the password.

And that wraps it up for the signup form.
