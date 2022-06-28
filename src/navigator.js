import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';
import ForgotPasswordCode from './pages/ForgotPassword/ForgotPasswordCode';
import ForgotPasswordRecovery from './pages/ForgotPassword/ForgotPasswordRecovery';
import Home from './pages/HomeScreen/home';
import RegisterScreen from './pages/RegisterScreen/Register'
import Login from './pages/LoginScreen/login'
import ChooseTechnologias from './pages/ChooseTechnologiesScreen/chooseTechnologies';
import ButtonReturn from './components/Buttons/ButtonReturn';

const Stack = createNativeStackNavigator();

const Navigator = (
    <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="ForgotPasswordEmail"             
            screenOptions={{ headerShown: false }}
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
            <Stack.Screen name='ForgotPasswordRecovery' component={ForgotPasswordRecovery} />
            <Stack.Screen name='ForgotPasswordCode' component={ForgotPasswordCode} />
            <Stack.Screen name='ForgotPasswordEmail' component={ForgotPasswordEmail} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigator;