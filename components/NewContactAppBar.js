import { Appbar, Searchbar } from 'react-native-paper';
import useSQLite from "../hooks/useSQLite";
import React, { useState } from "react";

export default function NewContactAppBar({ navigation })
{
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title="New Contact" />
        </Appbar.Header>
    );
}