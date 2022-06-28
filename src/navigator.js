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
            screenOptions={{ headerShown: true }}
        >
            <Stack.Screen 
                name='Home' 
                component={Home}
                options={{title:''}} 
            />
            <Stack.Screen 
                name='Login' 
                component={Login} 
                options={(props) =>({
                    title: '',
                    headerLeft: () => 
                        <HeaderButtons HeaderButtonComponent={ButtonReturn}>
                            <Item 
                                title='Voltar'
                                iconName='chevron-back-outline'
                                onPress={() => {props.navigation.navigate('Home')}}
                            />
                        </HeaderButtons>
                })} 
            />
            <Stack.Screen 
                name='Register' 
                component={RegisterScreen}
                options={(props) =>({
                    title: '',
                    headerLeft: () => 
                        <HeaderButtons HeaderButtonComponent={ButtonReturn}>
                            <Item 
                                title='Voltar'
                                iconName='chevron-back-outline'
                                onPress={() => {props.navigation.navigate('Home')}}
                            />
                        </HeaderButtons>
                })} 
            />
            <Stack.Screen name='ChooseTechnologies' component={ChooseTechnologias} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;