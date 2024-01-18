import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

class ContactDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contact: this.props.route.params.contact,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.fetchContact);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.fetchContact);
  }

  fetchContact = async () => {
    const contact = await this.getContact(this.state.contact.name);
    if (contact !== null) {
      this.setState({ contact });
    }
  }

  getContact = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@contacts_${name}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error(e);
    }
  }

  updateContact = async () => {
    const storedContacts = await AsyncStorage.getItem('contacts');
    const contacts = JSON.parse(storedContacts);
    const updatedContact = contacts.find(c => c.id === this.state.contact.id);
    this.setState({ contact: updatedContact });
  }

  handleEdit = () => {
    this.props.navigation.navigate('Editar Contacto', { 
      contact: this.state.contact, 
      updateContact: this.updateContact 
    });
  }

  handleDelete = async () => {
    const contact = this.props.route.params.contact;
    const storedContacts = await AsyncStorage.getItem('contacts');
    let contacts = JSON.parse(storedContacts);
    contacts = contacts.filter(c => String(c.id) !== String(contact.id));
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    this.props.navigation.goBack();
  }

  render() {
    const contact = this.state.contact;

    return (
      <View style={{ flex: 0.5, justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20 }}>Nombre: {contact.name}</Text>
        <Text style={{ fontSize: 20 }}>Apellido: {contact.surname}</Text>
        <Text style={{ fontSize: 20 }}>Teléfono: {contact.phone}</Text>
        <Text style={{ fontSize: 20 }}>Email: {contact.email}</Text>
        <Text style={{ fontSize: 20 }}>Dirección: {contact.address}</Text>
        <Button title="Editar" onPress={this.handleEdit} />
        <TouchableOpacity onPress={this.handleDelete}>
        <Icon name="trash-outline" size={30} color="#900" />
      </TouchableOpacity>
      </View>
    );
  }
}

export default ContactDetailScreen;