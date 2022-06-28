import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import ChooseTechnologies from '../../pages/ChooseTechnologiesScreen/chooseTechnologies';
import Colors from '../ColorPallete/Colors';

const Tab = createBottomTabNavigator();

export default function BottomTabComponent() {
    return (
        <Tab.Navigator initialRouteName="Home"             
            screenOptions={{ 
                headerShown: false,
                tabBarStyle: { 
                    backgroundColor: Colors.FOOTER_BACKGROUND_COLOR,
                    elevation: 0,
                    shadowOffset: {
                        width: 0, 
                        height: 0
                    },
                    border: 'none'
                }
            }}>
            <Tab.Screen 
                name='Profile' 
                component={ChooseTechnologies}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => (
                        <Feather name="user" size={size} color={focused ? Colors.PRIMARY_COLOR : Colors.TEXT_COLOR} />
                    ),
                }}
            />
            <Tab.Screen 
                name='Home' 
                component={ChooseTechnologies} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => (
                        <Feather name="home" size={size} color={focused ? Colors.PRIMARY_COLOR : Colors.TEXT_COLOR} />
                    ),
                }}
            />
            <Tab.Screen 
                name='Ranking' 
                component={ChooseTechnologies} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => (
                        <Feather name="trending-up" size={size} color={focused ? Colors.PRIMARY_COLOR : Colors.TEXT_COLOR} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}