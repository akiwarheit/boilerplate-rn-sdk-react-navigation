/**
 * Boilerplate React Native App For Atomic SDK
 */

import {
  Session as AtomicSession,
  StreamContainer,
} from '@atomic.io/react-native-atomic-sdk';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';

const ATOMIC_API_HOST = '';
const ATOMIC_API_KEY = '';
const ATOMIC_ENVIRONMENT_ID = '';
const ATOMIC_STREAM_CONTAINER_ID = '';
const ATOMIC_REQUEST_TOKEN_STRING = '';

const onAuthTokenRequested = async () => {
  // This function will called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  return ATOMIC_REQUEST_TOKEN_STRING;
};

AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.setSessionDelegate(onAuthTokenRequested);

const ContainerScreen = () => {
  const {goBack} = useNavigation();
  return (
    <View>
      <StreamContainer
        style={{width: '100%', height: '100%'}}
        containerId={ATOMIC_STREAM_CONTAINER_ID}
        configuration={{}}
      />
      <Button onPress={goBack} title="Back" />
    </View>
  );
};

const NoContainerScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hello</Text>
      <Button
        onPress={() => {
          // @ts-ignore
          navigation.navigate('SecondPage');
        }}
        title="Go To Container"
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NoContainerScreen} />
        <Stack.Screen name="SecondPage" component={ContainerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
