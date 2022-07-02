import React from 'react';
import { List } from 'react-native-paper';
import { Alert, View } from 'react-native';

export default function ({ navigation }) {
    return (
        <View styles={{ flex: 1 }}>
            <View style={{ marginTop: 500 }} />
            <List.Accordion
                title="Drawer Navigation"
                left={(props) => <List.Icon {...props} icon="folder" />}>
                <List.Item title="Animatable Tab1" onPress={() => Alert.alert('hala')} />
                <List.Item title="Animatable Tab2" />
                <List.Item title="Animatable Tab3" />
            </List.Accordion>
        </View>
    );
}
