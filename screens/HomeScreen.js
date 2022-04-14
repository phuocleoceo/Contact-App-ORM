import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { StyleSheet, View, Dimensions } from 'react-native';
import ContactCard from "../components/ContactCard";
import HomeAppBar from "../components/HomeAppBar";
import useSQLite from "../hooks/useSQLite";
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import React, { useEffect } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation })
{
    const { Get_Data } = useSQLite();
    const { listContact } = useSelector(state => state.contact);

    useEffect(() => Get_Data(), []);

    const handleNewContact = () => navigation.navigate("NewContact");

    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(listContact);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 70; })

    const _rowRenderer = (type, data) =>
    {
        return <ContactCard data={data} navigation={navigation} />;
    };

    return (
        <View style={styles.container}>
            <HomeAppBar />

            {
                listContact.length > 0 &&
                <RecyclerListView
                    style={{ flex: 1 }}
                    rowRenderer={_rowRenderer}
                    dataProvider={_dataProvider}
                    layoutProvider={_layoutProvider}
                />
            }
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={handleNewContact}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});