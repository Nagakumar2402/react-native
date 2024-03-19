
# React Native form validations with Formik and Yup
***Formik*** is a simple React/React Native form library that helps with handling form state, input validation, formatting, error handling, form submission, amongst other things. Formik keeps everything simple under the hood using react state and pros making it easy to understand, integrate, debug, and test your forms.

We will also sprinkle some ***Yup*** into the mix to help with building the schema for validating and parsing the form inputs.
#### let’s add the two libraries we will be using:
```powershell
npm install formik yup
```
## Login form
Starting with the easier of the forms. This should have two inputs for email and password and a login button.

Let’s do some clean up first before we start adding our text inputs. Update App.js as seen here:

```jsx
// App.js
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native'

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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  }
})

export default App
```

1. When adding TextInputs for say email addresses, it requires us to set up state for storing the email value and a handleEmailChange function to handle text changes and update email state.

2. This can become too much especially when you’re working with a lot of inputs.

3. This is where Formik comes in to help handle all this repetitive work. So let’s see how to do it with Formik, let’s add the email input form using Formik.

We’ll start by importing the Formik library and then setting up the inputs:

```jsx
import { Formik } from 'formik'

        <View style={styles.loginContainer}>
          <Text>Login Screen</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
        </View>

const styles = StyleSheet.create({

  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
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
})
```
Currently, our onSubmit function is a `console.log` statement for the values passed. This is where our login function will come in and get those values for processing.

As you might have noticed, however, we can _submit without_ values, with a wrongly formatted email address amongst other defects. We do not want that to be the case, we want the user to only be able to log in when they enter a correctly formatted email and a password. Until then, we’d like the login button to be disabled.

This is where input validation comes in, we would like to create a validation schema that will check if the format of inputs is as expected. As mentioned we will be using ***Yup to create the validation schema*** and provide custom error messages for each check.

Let’s create the login validation schema as seen below:
```jsx
// App.js
import * as yup from 'yup'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})
```
As seen in the schema, email is supposed to be a string() of formatted email to check whether it’s the correct email format, we are also returning a corresponding error message if a check fails, we’ll display this later on.

For the password field, it is also a required string as seen, we also add another check for the minimum number of characters, min(8) to ensure the password has a minimum of 8 characters.

There are a lot more checks you can add to your inputs, check out the Yup docs for more.

Now let’s add this schema to our Formik form so that we can use it to validate our inputs. We’ll update our Form as seen below:

```jsx
// App.js

<Formik
   validationSchema={loginValidationSchema}
   initialValues={{ email: '', password: '' }}
   onSubmit={values => console.log(values)}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
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
       {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
       <TextInput
         name="password"
         placeholder="Password"
         style={styles.textInput}
         onChangeText={handleChange('password')}
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry
       />
       {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
       <Button
         onPress={handleSubmit}
         title="LOGIN"
         disabled={!isValid}
       />
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

7. We will also add a check to ensure that the login ***button is disabled*** when the inputs are invalid.

## Sign up form
In the previous section on login form, we used Formik to handle our forms but still had to pass the different functions (like `handleChange`, `handleBlur value`, etc.) to each `TextInput`, this can become a lot of work as inputs increase.

Formik provides a component `Field` that automatically hooks up inputs to Formik for us. In this section, we will explore that.

Let’s start this section by creating a `CustomInput` component that will be passed into the `Field component`, get the `Formik props`, and handle the inputs for us.

We’ll create a file named `CustomInput.js` and add the following code to it:


[refer](https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/)