import React from 'react';
import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';

import { LoginView } from './views';

function App() {
    return (
        <View>
            <Text>Open up App.js to start working on your app!</Text>
            <LoginView />
        </View>
    );
}

export default registerRootComponent(App);
