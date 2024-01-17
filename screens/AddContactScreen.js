import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContactScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async () => {
        const newContact = { name, surname, phone, email, address };
        const storedContacts = await AsyncStorage.getItem('@contacts');
        let contacts = [];
        if (storedContacts) {
            contacts = JSON.parse(storedContacts);
        }
        contacts.push(newContact);
        await AsyncStorage.setItem('@contacts', JSON.stringify(contacts));
        navigation.goBack();
    };

    return (
        <View>
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Apellidos"
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Dirección"
                value={address}
                onChangeText={setAddress}
            />
            <Button
                title="Guardar contacto"
                onPress={handleSubmit}
            />
        </View>
    );
};

export default AddContactScreen;