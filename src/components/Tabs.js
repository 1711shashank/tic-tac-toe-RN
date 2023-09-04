import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Game from '../screens/Game';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';




const Tabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#00A884',
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                    backgroundColor: '#1F2C33',
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontSize: 25,
                    color: 'lightgray',
                },
                tabBarStyle: {
                    backgroundColor: '#1F2C33',
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen name={'Chat'} options={{ tabBarIcon: ({ focused }) => <Ionicons name="game-controller-outline" size={25} color={focused ? '#00A884' : 'gray'} /> }}>
                {() => <Chat />}
            </Tab.Screen>

            <Tab.Screen name={'Game'} options={{ tabBarIcon: ({ focused }) => <Ionicons name="game-controller-outline" size={25} color={focused ? '#00A884' : 'gray'} /> }}>
                {() => <Game />}
            </Tab.Screen>

            <Tab.Screen name={'Profile'} options={{ tabBarIcon: ({ focused }) => <Feather name="user" size={25} color={focused ? '#00A884' : 'gray'} /> }}>
                {() => <Profile />}
            </Tab.Screen>

        </Tab.Navigator>


    )
}

export default Tabs;