import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/HomeScreen/home';
import RegisterScreen from './pages/RegisterScreen/Register'
import Login from './pages/LoginScreen/login'
import ChooseTechnologias from './pages/ChooseTechnologiesScreen/chooseTechnologies';
import BottomTabComponent from './components/BottomMenu/BottomMenu';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="Home"             
            screenOptions={{ headerShown: false }}>
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
            <Stack.Screen name='ChooseTechnologies' component={BottomTabComponent} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;