import { StyleSheet, View, Image, TextInput, ScrollView, Alert } from 'react-native';
import EditContactAppBar from "../components/EditContactAppBar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm, useController } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from 'react-native-paper';
import useSQLite from "../hooks/useSQLite";
import { useSelector } from "react-redux";

export default function EditContactScreen({ navigation, route })
{
    const { id } = route.params;
    const { Get_Data_By_ID, Update_Data, Get_Data } = useSQLite();
    const { currentContact: { name, phone, email, img } } = useSelector(state => state.contact);
    const [image, setImage] = useState(img);

    const { control, handleSubmit, formState: { errors } } = useForm();

    useEffect(() =>
    {
        Get_Data_By_ID(id);
    }, []);

    const Input = ({ name, control, placeHolder, defaultValue }) =>
    {
        const { field } = useController({
            control, defaultValue, name, rules: { require: true }
        });
        return (
            <TextInput
                style={styles.formInput}
                placeholder={placeHolder}
                onChangeText={field.onChange}
                value={field.value}
            />
        );
    };

    const handleUploadImg = async () =>
    {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false)
        {
            alert("Permission to access camera roll is required!");
            return;
        }
        const options = { base64: true };
        let pickerResult = await ImagePicker.launchImageLibraryAsync(options);
        if (!pickerResult.cancelled)
        {
            setImage('data:image/jpeg;base64,' + pickerResult.base64);
        }
    }

    const onSubmit = async (data) =>
    {
        const updateContact = { ...data, id, img: image };
        await Update_Data(updateContact);
        await Get_Data();
        // Set lai state cho Detail Screen
        await Get_Data_By_ID(id);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <EditContactAppBar navigation={navigation} onEditContact={handleSubmit(onSubmit)} />

            <View style={styles.avatarIcon}>
                {image == "" &&
                    <Image style={styles.avatarImage} source={require("../assets/people.png")} />}
                {image != "" &&
                    <Image style={styles.avatarImage} source={{ uri: image }} />}
                <IconButton
                    icon="camera"
                    color="#fff"
                    size={28}
                    onPress={handleUploadImg}
                    style={styles.addPhoto}
                />
            </View>

            <View style={styles.formControl}>
                <Icon name="id-card" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="name" control={control} defaultValue={name} placeHolder="Enter name..." />
            </View>
            {errors.name && Alert.alert("Name is required")}

            <View style={styles.formControl}>
                <Icon name="phone" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="phone" control={control} defaultValue={phone} placeHolder="Enter mobile phone..." />
            </View>

            <View style={styles.formControl}>
                <Icon name="voicemail" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="email" control={control} defaultValue={email} placeHolder="Enter email" />
            </View>
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
    avatarIcon: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        backgroundColor: "#ddd",
        position: "relative",
        marginBottom: 15
    },
    addPhoto: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    avatarImage: {
        height: 200,
        width: 200,
        alignSelf: "center"
    },
    formControl: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
    },
    formIcon: {
        flex: 1,
        padding: 5,
        width: 50,
        height: 50,
        left: 10
    },
    formInput: {
        flex: 5,
        fontSize: 20,
        padding: 10,

        borderWidth: 1,
        borderColor: "#7a7777",
        borderRadius: 10
    }
});