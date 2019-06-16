import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
    StyleSheet
} from 'react-native';
import { colors, storageKey } from '../../../utils'
import { Button, Input, Modal } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

const auth = firebase.auth()

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            loginError: null,
            isShowingRegister: true,
            isShowingModal: false
        }
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)

    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        // alert('Keyboard Shown');
        this.setState({ isShowingRegister: false })
    }

    _keyboardDidHide() {
        // alert('Keyboard Hidden');
        this.setState({ isShowingRegister: true })
    }

    _loginWithEmailPassword = async () => {
        const { email, password } = this.state
        try {
            const user = await auth.signInWithEmailAndPassword(email, password)
            if (user) {
                const token = await auth.currentUser.getIdToken()
                if (token) {
                    await AsyncStorage.setItem(storageKey.token, JSON.stringify(token))
                    await AsyncStorage.setItem(storageKey.userInfo, JSON.stringify(user))
                    this.props.navigation.navigate('Main')
                }
            }
        } catch (error) {
            console.log('LOGIN ERROR: ', error.code)
            this.setState({ loginError: error })
            this._onRenderErrMess()
            this._toggleModal()
        }
    }

    // Toggle Modal
    _toggleModal = () => {
        this.setState({ isShowingModal: !this.state.isShowingModal })
    }


    //Return error message
    _onRenderErrMess = () => {
        const { loginError } = this.state
        if (loginError !== null) {
            if (loginError.code === 'auth/invalid-email') {
                return 'Email should follow format example@example.com. Please try again'
            } else if (loginError.code === 'auth/user-not-found') {
                return `Oop! User doesn't exist! Poor you!`
            } else if (loginError.code === 'auth/wrong-password') {
                return 'Oop! Password you entered is not correct. Please try again'
            }

        }
    }

    //Render Modal
    _onRenderModal = () => {
        const { isShowingModal } = this.state
        if(isShowingModal){
            return (
                <Modal
                    isVisible={isShowingModal}
                    message={this._onRenderErrMess()}
                    onPress={() => this._toggleModal()}
                />
            )
        }
    }

    _onRenderInputField() {
        return (
            <View style={styles.inputWrapper}>
                <Input
                    placeholder='Email'
                    onChange={email => this.setState({ email })}
                />
                <Input
                    placeholder='Password'
                    onChange={password => this.setState({ password })}
                    customStyle={{ marginTop: 40, marginBottom: 30 }}
                    secureTextEntry={true}
                />
                <Button
                    onPress={()=>this._loginWithEmailPassword()}
                >Log In</Button>

            </View>
        )
    }

    _onRenderForgetPassword() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Reset')}
                style={styles.forgetWrapper}
            >
                <Text style={styles.forgetTxt}>Forget Password?</Text>
            </TouchableOpacity>
        )
    }

    _onRenderSuggestRegister() {
        return (
            <View style={styles.registerWrapper}>
                <Text style={styles.registerTxt}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={[styles.registerTxt, { fontWeight: '700' }]}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { isShowingRegister } = this.state
        return (
            <ImageBackground
                source={require('../../../assets/images/zen.jpeg')}
                style={styles.backgroundImg}
            >
                {/* login container */}
                <View style={styles.login_container}>
                    <KeyboardAwareScrollView
                        style={{ width: '100%' }}
                        enableOnAndroid
                        extraHeight={160}
                        innerRef={ref => this.scroll = ref}
                    >
                        {/* login wrapper */}
                        <View style={styles.login_wrapper}>
                            <Text style={styles.appName}>ZenStone</Text>
                            {/* inputField */}
                            {this._onRenderInputField()}
                            {this._onRenderForgetPassword()}
                        </View>

                    </KeyboardAwareScrollView>

                    {/* Need Register */}
                    {isShowingRegister == true ? this._onRenderSuggestRegister() : null}
                </View>
                {this._onRenderModal()}
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1
    },
    login_container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingTop: 80,
    },
    login_wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // 100% based on parent
    },
    appName: {
        textTransform: 'uppercase',
        color: colors.blueSecondary,
        fontSize: 40,
        letterSpacing: 10,
        fontWeight: '500'
    },
    inputWrapper: {
        width: '85%',
        marginTop: 150,
        justifyContent: 'center'
    },
    forgetWrapper: {
        width: '65%',
        marginTop: 10
    },
    forgetTxt: {
        color: colors.whitePrimary,
        textAlign: 'right',
        fontSize: 15
    },
    registerWrapper: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        marginBottom: 15,
        justifyContent: 'center'
    },
    registerTxt: {
        color: colors.whitePrimary,
        marginRight: 10,
    }
})