import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Login'
import RegisterScreen from './Register'
import ResetScreen from './Reset'

const AuthNavigation = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Reset: ResetScreen
}, {
    initialRouteName: 'Login',
    headerMode: 'none' // for design by myself instead of using default
})

export default createAppContainer(AuthNavigation)