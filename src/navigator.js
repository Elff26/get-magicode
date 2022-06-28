import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/home';
import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';
import ForgotPasswordCode from './pages/ForgotPassword/ForgotPasswordCode';
import ForgotPasswordRecovery from './pages/ForgotPassword/ForgotPasswordRecovery';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName='ForgotPasswordEmail'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='ForgotPasswordRecovery' component={ForgotPasswordRecovery} />
            <Stack.Screen name='ForgotPasswordCode' component={ForgotPasswordCode} />
            <Stack.Screen name='ForgotPasswordEmail' component={ForgotPasswordEmail} />
            <Stack.Screen name='Home' component={Home}/>       
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;