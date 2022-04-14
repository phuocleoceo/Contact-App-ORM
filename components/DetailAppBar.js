import { Appbar } from 'react-native-paper';
import React from "react";

export default function DetailAppBar({ navigation, onDeleteContact, onEditContact })
{
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title="Detail" />

            <Appbar.Action icon="delete-forever" onPress={onDeleteContact} />
            <Appbar.Action icon="account-edit" onPress={onEditContact} />
        </Appbar.Header>
    );
}