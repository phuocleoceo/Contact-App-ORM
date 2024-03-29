import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DetailAppBar from "../components/DetailAppBar";
import useSQLite from "../hooks/useSQLite";
import { useSelector } from "react-redux";
import React, { useEffect } from 'react';

export default function DetailScreen({ navigation, route })
{
    const { id } = route.params;
    const { Get_Data_By_ID, Delete_Data, Get_Data } = useSQLite();
    const { currentContact: { name, phone, email, img } } = useSelector(state => state.contact);

    useEffect(() =>
    {
        Get_Data_By_ID(id);
    }, []);

    const handleEditContact = () =>
    {
        navigation.navigate("EditContact", { id });
    };

    const handleDeleteContact = async () =>
    {
        await Delete_Data(id);
        await Get_Data();
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <DetailAppBar
                navigation={navigation}
                onDeleteContact={handleDeleteContact}
                onEditContact={handleEditContact}
            />

            <Card>
                {img == "" &&
                    <Card.Cover style={styles.avatarImg} source={require("../assets/people.png")} />}
                {img != "" &&
                    <Card.Cover style={styles.avatarImg} source={{ uri: img }} />}

                <Title style={styles.cardTitle}>{name}</Title>

                <Card.Content style={styles.cardContent}>
                    <Icon name="phone" size={35} color="#6200ee"
                        style={{ flex: 2, top: 15 }} />
                    <View style={{ flex: 6 }}>
                        <Title>{phone}</Title>
                        <Paragraph>{email}</Paragraph>
                    </View>
                    <Icon name="comment-dots" size={35} color="#6200ee"
                        style={{ flex: 1, top: 15 }} />
                </Card.Content>
            </Card>
        </ScrollView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        height: "100%",
        width: "100%"
    },
    avatarImg: {
        flex: 1,
        marginBottom: 15,
        height: 270,
        width: 270,
        alignSelf: "center"
    },
    cardTitle: {
        flex: 1,
        fontSize: 30,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 10
    },
    cardContent: {
        flex: 1,
        flexDirection: "row"
    },
});