import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordEmail from './pages/ForgotPasswordScreen/ForgotPasswordEmail';
import ForgotPasswordCode from './pages/ForgotPasswordScreen/ForgotPasswordCode';
import ForgotPasswordRecovery from './pages/ForgotPasswordScreen/ForgotPasswordRecovery';
import Home from './pages/HomeScreen/Home.js';
import RegisterScreen from './pages/RegisterScreen/Register'
import Login from './pages/LoginScreen/Login'
import BottomTabComponent from './components/BottomMenu/BottomMenuComponent';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='BottomTabComponent' component={BottomTabComponent}/>
            <Stack.Screen name='ForgotPasswordRecovery' component={ForgotPasswordRecovery} />
            <Stack.Screen name='ForgotPasswordCode' component={ForgotPasswordCode} />
            <Stack.Screen name='ForgotPasswordEmail' component={ForgotPasswordEmail} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;