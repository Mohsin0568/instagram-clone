import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';

export class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.onLoginIn = this.onLoginIn.bind(this);
    }

    onLoginIn() {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput
                    placeholder="email"
                    onChangeText = {(email) => this.setState({email})}/>

                <TextInput
                    placeholder="password"
                    secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})}/>

                <Button onPress = {() => this.onLoginIn()} title = "Log In"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Login
