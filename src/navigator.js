import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/home';
import ChooseTechnologias from './pages/ChooseTechnologies/chooseTechnologies';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='ChooseTechnologies' component={ChooseTechnologias} />
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;