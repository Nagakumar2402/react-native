# React Navigation

Install the required packages in your React Native project:

```powershell
npm install @react-navigation/native
```

React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app.

## Installing dependencies

```
npm install react-native-screens react-native-safe-area-context
```

`react-native-screens` package requires one additional configuration step to properly work on Android devices. Edit `MainActivity.kt`

```Kotlin
import android.os.Bundle;
class MainActivity: ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
```

## Wrapping your app in `NavigationContainer`

Now, we need to wrap the whole app in `NavigationContainer`. Usually you'd do this in your entry file, such as `index.js` or `App.js`:

```jsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

1. First, install `react-native-gesture-handler`

```powershell
npm install react-native-gesture-handler
```

2. To finalize installation of `react-native-gesture-handler`, add the following at the **top** (make sure it's at the top and there's nothing else before it) of your entry file, such as `index.js` or `App.js`:

React Navigation's native stack navigator provides a way for your app to transition between screens and manage navigation history.
Let's start by demonstrating the most common navigator, `createNativeStackNavigator`.

## Installing the native stack navigator

```
npm install @react-navigation/native-stack
```

`createNativeStackNavigator` is a function that returns an object containing 2 properties: `Screen` and `Navigator`. Both of them are React components used for configuring the navigator. The `Navigator` should contain `Screen` elements as its children to define the configuration for routes.

```jsx
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
```

### Configuring the navigator

The initial route for the stack is the `Home` route. Try changing it to `Details` and reload the app (React Native's Fast Refresh won't update changes from `initialRouteName`, as you might expect), notice that you will now see the `Details` screen. Then change it back to `Home` and reload once more.

### Specifying options

Each screen in the navigator can specify some options for the navigator, such as the title to render in the header. These options can be passed in the `options` prop for each screen component:

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: "Overview" }}
/>
```

Sometimes we will want to specify the same options for all of the screens in the navigator. For that, we can pass a `screenOptions` prop to the navigator.

## Navigating to a new screen

```jsx
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
```

> If we call `navigation.navigate` with a route name that we haven't defined in a navigator, it'll print an error in development builds and nothing will happen in production builds. Said another way, we can only navigate to routes that have been defined on our navigator — we cannot navigate to an arbitrary component

## Navigate to a route multiple times

If you run this code, you'll notice that when you tap "Go to Details... again" that it doesn't do anything! This is because we are already on the Details route. The `navigate` function roughly means "go to this screen", and if you are already on that screen then it makes sense that it would do nothing.

```jsx
<Button
  title="Go to Details... again"
  onPress={() => navigation.navigate("Details")}
/>
```

Let's suppose that we actually _want_ to add another details screen. This is pretty common in cases where you pass in some unique data to each route . To do this, we can change `navigate` to `push`. This allows us to express the intent to add another route regardless of the existing navigation history.

```jsx
<Button
  title="Go to Details... again"
  onPress={() => navigation.push("Details")}
/>
```

Each time you call `push` we add a new route to the navigation stack. When you call `navigate` it first tries to find an existing route with that name, and only pushes a new route if there isn't yet one on the stack.

## Going back

The header provided by the native stack navigator will automatically include a back button when it is possible to go back from the active screen (if there is only one screen in the navigation stack, there is nothing that you can go back to, and so there is no back button).

Sometimes you'll want to be able to programmatically trigger this behavior, and for that you can use `navigation.goBack();`.

```jsx
<Button title="Go back" onPress={() => navigation.goBack()} />
```

On Android, React Navigation hooks in to the hardware back button and fires the `goBack()` function for you when the user presses it, so it behaves as the user would expect.
Another common requirement is to be able to go back _multiple_ screens -- for example, if you are several screens deep in a stack and want to dismiss all of them to go back to the first screen. In this case, we know that we want to go back to `Home` so we can use `navigate('Home')` (not `push`! try that out and see the difference). Another alternative would be `navigation.popToTop()`, which goes back to the first screen in the stack.

```jsx
<Button
  title="Go back to first screen in stack"
  onPress={() => navigation.popToTop()}
/>
```

Absolutely! Let's delve into each of these points and illustrate them with examples:

1. **Reading params through route.params inside a screen**:

```javascript
// DetailsScreen.js
import React from "react";
import { View, Text } from "react-native";
function DetailsScreen({ route }) {
  const { itemId } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
}
export default DetailsScreen;
```

In this example, `route.params` is used to access the parameters passed to the screen.

2. **Updating the screen's params with navigation.setParams**:

```javascript
// HomeScreen.js

import React from "react";
import { Button, View, Text } from "react-native";
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", { itemId: 123 });
          navigation.setParams({ otherParam: "Updated!" });
        }}
      />
    </View>
  );
}
export default HomeScreen;
```

Here, `navigation.setParams()` is called to update the screen's params after navigating.

3. **Initial params passed via the initialParams prop on Screen**:

```javascript
// DetailsScreen.js

import React from "react";
import { View, Text } from "react-native";

function DetailsScreen({ route }) {
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam}</Text>
    </View>
  );
}

export default DetailsScreen;
```

When defining the screen in the navigator, you can pass initialParams:

```javascript
// App.js

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 0, otherParam: "default" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
```

## Configuring the header bar

A Screen component accepts `options` prop which is either an object or a function that returns an object, that contains various configuration options. The one we use for the header title is `title`, as shown in the following example.

```jsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My home" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
```

### Using params in the title

In order to use params in the title, we need to make `options` prop for the screen a function that returns a configuration object. It might be tempting to try to use `this.props` inside of `options`, but because it is defined before the component is rendered, `this` does not refer to an instance of the component and therefore no props are available. Instead, if we make `options` a function then React Navigation will call it with an object containing `{ navigation, route }` - in this case, all we care about is `route`, which is the same object that is passed to your screen props as `route` prop. You may recall that we can get the params through `route.params`, and so we do this above to extract a param and use it as a title.

### Adjusting header styles

- `headerStyle`: a style object that will be applied to the `View` that wraps the header. If you set `backgroundColor` on it, that will be the color of your header.
- `headerTintColor`: the back button and title both use this property as their color. In the example below, we set the tint color to white (`#fff`) so the back button and the header title would be white.
- `headerTitleStyle`: if we want to customize the `fontFamily`, `fontWeight` and other `Text` style properties for the title, we can use this to do it.

```jsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "My home",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
```

### Sharing common `options` across screens

It is common to want to configure the header in a similar way across many screens. For example, your company brand color might be red and so you want the header background color to be red and tint color to be white. Conveniently, these are the colors we're using in our running example, and you'll notice that when you navigate to the `DetailsScreen` the colors go back to the defaults. Wouldn't it be awful if we had to copy the `options` header style properties from `HomeScreen` to `DetailsScreen`, and for every single screen component we use in our app? Thankfully, we do not. We can instead move the configuration up to the native stack navigator under the prop `screenOptions`.

```jsx
function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My home" }}
      />
    </Stack.Navigator>
  );
}
```

### Replacing the title with a custom component
