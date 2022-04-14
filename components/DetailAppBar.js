import { Appbar } from 'react-native-paper';
import React from "react";

export default function DetailAppBar({ navigation })
{
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title="Detail" />
        </Appbar.Header>
    );
}