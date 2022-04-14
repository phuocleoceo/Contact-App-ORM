import { Appbar } from 'react-native-paper';

export default function EditContactAppBar({ navigation, onEditContact })
{
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title="Edit Contact" />

            <Appbar.Action icon="account-edit" onPress={onEditContact} />
        </Appbar.Header>
    );
}