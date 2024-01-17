import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditContactScreen = ({ route,navigation }) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [surname, setSurname] = useState(contact.surname);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);

  const handleSave = async () => {
    try {
      const updatedContact = { name, surname, phone, email, address };
      const jsonValue = JSON.stringify(updatedContact);
      await AsyncStorage.setItem(`@contacts_${contact.name}`, jsonValue);
      navigation.navigate('Detalles del Contacto', { contact: updatedContact });
    } catch (e) {
      console.error(e);
    }
  };

  const getContact = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@contacts_${name}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <View>
      <Text>Nombre:</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nombre" />
      <Text>Apellido:</Text>
      <TextInput value={surname} onChangeText={setSurname} placeholder="Apellido" />
      <Text>Teléfono:</Text>
      <TextInput value={phone} onChangeText={setPhone} placeholder="Teléfono" />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <Text>Dirección:</Text>
      <TextInput value={address} onChangeText={setAddress} placeholder="Dirección" />
      <Button title="Actualizar" onPress={handleSave} />
    </View>
  );
};

export default EditContactScreen;