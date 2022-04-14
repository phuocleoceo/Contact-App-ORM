import { StyleSheet, View, Text, Image, Linking } from 'react-native';
import ContactEntity from "../models/ContactEntity"
import { IconButton } from 'react-native-paper';
import React from 'react';

export default function ContactCard({ data, navigation })
{
    const contact = new ContactEntity(data);

    const handleViewDetail = (id) => navigation.navigate("Detail", { id });

    const handlePhoneCall = (phone) =>
    {
        const url = `tel://${phone}`;
        Linking.openURL(url);
    }

    return (
        <View key={contact.id} style={styles.listItem} elevation={5} >
            {contact.img == "" &&
                <Image style={styles.image} source={require("../assets/people.png")} />}
            {contact.img != "" &&
                <Image style={styles.image} source={{ uri: contact.img }} />}
            <View style={styles.body}>
                <Text style={styles.name} onPress={() => handleViewDetail(contact.id)}>
                    {contact.name}
                </Text>
                <IconButton
                    style={styles.phoneBtn}
                    icon="phone-in-talk"
                    size={20}
                    onPress={() => handlePhoneCall(contact.phone)}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#e3e1dc",
        borderRadius: 10
    },
    image: {
        flex: 1,
        height: 50,
        width: 50,
    },
    body: {
        flex: 6,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 5,
    },
    name: {
        flex: 5,
        fontSize: 22,
        fontWeight: 'bold',
        padding: 3
    },
    phoneBtn: {
        flex: 1
    }
});