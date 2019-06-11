import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import { storageKey } from '../../utils'

class AuthLoading extends Component {

    async componentDidMount() {
        const { navigation } = this.props
        // get item token in utils/storageKey file
        const tokenStorage = await AsyncStorage.getItem(storageKey.token)
        //check if the tokenStorage exist and valuable
        if (tokenStorage && tokenStorage !== null) {
            // If existed ==> Main
            navigation.navigate('Main')
        } else {
            // If not existed ==> Auth
            navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View>
                <Text>AuthLoading</Text>
            </View>
        );
    }
}

export default AuthLoading