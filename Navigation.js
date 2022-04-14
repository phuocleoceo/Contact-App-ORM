import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NewContact" component={NewContactScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditContact" component={EditContactScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
