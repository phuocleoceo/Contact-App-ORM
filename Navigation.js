import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import useSQLite from "./hooks/useSQLite";
import React, { useEffect } from 'react';

import EditContactScreen from './screens/EditContactScreen';
import NewContactScreen from './screens/NewContactScreen';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';

import EditContactAppBar from "./components/EditContactAppBar";
import NewContactAppBar from "./components/NewContactAppBar";
import DetailAppBar from "./components/DetailAppBar";
import HomeAppBar from "./components/HomeAppBar";

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
                <Stack.Screen name="Home" component={HomeScreen} options={{ header: HomeAppBar }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ header: DetailAppBar }} />
                <Stack.Screen name="NewContact" component={NewContactScreen} options={{ header: NewContactAppBar }} />
                <Stack.Screen name="EditContact" component={EditContactScreen} options={{ header: EditContactAppBar }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
