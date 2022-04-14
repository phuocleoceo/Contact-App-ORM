import { Appbar } from 'react-native-paper';

export default function NewContactAppBar({ navigation, onAddContact })
{
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title="New Contact" />

            <Appbar.Action icon="account-plus" onPress={onAddContact} />
        </Appbar.Header>
    );
}