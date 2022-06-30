import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordEmail from './pages/ForgotPasswordScreen/ForgotPasswordEmail';
import ForgotPasswordCode from './pages/ForgotPasswordScreen/ForgotPasswordCode';
import ForgotPasswordRecovery from './pages/ForgotPasswordScreen/ForgotPasswordRecovery';
import Home from './pages/HomeScreen/home';
import RegisterScreen from './pages/RegisterScreen/Register'
import Login from './pages/LoginScreen/login'
import BottomTabComponent from './components/BottomMenu/BottomMenu';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='ChooseTechnologies' component={BottomTabComponent}/>
            <Stack.Screen name='ForgotPasswordRecovery' component={ForgotPasswordRecovery} />
            <Stack.Screen name='ForgotPasswordCode' component={ForgotPasswordCode} />
            <Stack.Screen name='ForgotPasswordEmail' component={ForgotPasswordEmail} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;