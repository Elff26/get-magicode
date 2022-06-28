import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/home';
import RegisterScreen from './pages/Register/Register'

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;