import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/home';
import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='ForgotPasswordEmail' component={ForgotPasswordEmail} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;