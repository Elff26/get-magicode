import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Home from './pages/HomeScreen/home';
import RegisterScreen from './pages/RegisterScreen/Register'
import Login from './pages/LoginScreen/login'
import ChooseTechnologias from './pages/ChooseTechnologiesScreen/chooseTechnologies';
import ButtonReturn from './components/Buttons/ButtonReturn';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="Home"             
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                name='Home' 
                component={Home}
            />
            <Stack.Screen 
                name='Login' 
                component={Login} 
            />
            <Stack.Screen 
                name='Register' 
                component={RegisterScreen}
            />
            <Stack.Screen name='ChooseTechnologies' component={ChooseTechnologias} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;