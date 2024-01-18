import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, AddContactScreen, ContactDetailScreen, EditContactScreen, loginScreen, RegistroScreen } from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={loginScreen} options={{ headerLeft: () => null }}/>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Agregar Contacto" component={AddContactScreen} />
        <Stack.Screen name="Detalles del Contacto" component={ContactDetailScreen} />
        <Stack.Screen name="Editar Contacto" component={EditContactScreen} />
        
        <Stack.Screen name="Registro" component={RegistroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;