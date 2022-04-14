import { Appbar } from 'react-native-paper';
import React from "react";

export default function DetailAppBar({ navigation, back })
{
    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="Detail" />
        </Appbar.Header>
    );
}