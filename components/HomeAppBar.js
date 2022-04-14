import { Appbar, Searchbar } from 'react-native-paper';
import useSQLite from "../hooks/useSQLite";
import React, { useState } from "react";

export default function HomeAppBar()
{
    const { Get_Data, Search_Data } = useSQLite();
    const [searchShow, setSearchShow] = useState(false);

    const handleShow = () =>
    {
        // Khi thoat Search, tra lai full list contact
        if (searchShow) handleSearch("");
        setSearchShow(!searchShow)
    };

    const handleSearch = (query) =>
    {
        if (query.length == 0)
            Get_Data();
        else
            Search_Data(query);
    };

    return (
        <Appbar.Header>
            {
                searchShow ?
                    <Searchbar
                        placeholder="Search"
                        style={{ width: "90%" }}
                        onChangeText={handleSearch}
                    /> :
                    <Appbar.Content title="Contact App" />
            }
            <Appbar.Action icon="account-search" onPress={handleShow} />
        </Appbar.Header>
    );
}