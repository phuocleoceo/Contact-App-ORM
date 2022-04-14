import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavigationBar from './components/CustomNavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import useSQLite from "./hooks/useSQLite";
import React, { useEffect } from 'react';

import EditContactScreen from './screens/EditContactScreen';
import NewContactScreen from './screens/NewContactScreen';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function Navigation()
{
    const { Create_Table, Drop_Table, Clear_Table } = useSQLite();

    useEffect(() => Create_Table(), []);

    // useEffect(() => Drop_Table(), []);

    // useEffect(() => Clear_Table(), []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                header: CustomNavigationBar,
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="NewContact" component={NewContactScreen} />
                <Stack.Screen name="EditContact" component={EditContactScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
