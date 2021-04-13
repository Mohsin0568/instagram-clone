import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import rootReducer from './redux/reducers';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyB0f-Gh-XRwq_GDgmLAN7nBztNjrXL-NZY",
  authDomain: "intagram-demo-8bd6f.firebaseapp.com",
  projectId: "intagram-demo-8bd6f",
  storageBucket: "intagram-demo-8bd6f.appspot.com",
  messagingSenderId: "560353458339",
  appId: "1:560353458339:web:fa0da5f98868e285b8a716"
};

console.log(firebase.app.length);

// firebase.initializeApp(firebaseConfig);
if(firebase.app.length === 0){
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loaded: true,
          loggedIn: false
        })
      }
      else{
        this.setState({
          loaded: true,
          loggedIn: true
        })
      }
    })
  }

  render() {
    const {loaded, loggedIn } = this.state;
    if(!loaded){
      return(
        <View style = {{ flex: 1, justifyContent: 'center' }}> 
          <Text> App is loading ... </Text>
        </View>
      );
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Add" component={AddScreen} navigation = {this.props.navigation}/>
              <Stack.Screen name="Save" component={SaveScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}

export default App
