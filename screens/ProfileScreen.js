import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ProfileButton from '../components/ProfileButton';
import { colors } from '../constant/colors';
import EditProfile from '../components/EditProfile';
import PasswordModal from '../components/PasswordModal';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle();
  return (
    <ScrollView style={{ backgroundColor: color.background }}>
      <View style={styles.container}>
        <EditProfile edit={false} />
        <ProfileButton
          title={'Información Personal'}
          icon={'document-text'}
          MyRatingScreen
          onPress={() => navigation.navigate('PersonalInformationScreen')}
        />
        <ProfileButton
          title={'Mis Rastras'}
          icon={'arrow-redo'}
          onPress={() => navigation.navigate('MyRastraScreen')}
        />
        <ProfileButton
          title={'Mis Reseñas'}
          icon={'star'}
          onPress={() => navigation.navigate('MyRatingScreen')}
        />
        <ProfileButton
          title={'Mis Reservaciones'}
          icon={'file-tray'}
          onPress={() =>
            navigation.navigate('MyReservationScreen', {
              store: true,
            })
          }
        />
        <PasswordModal />
        <ProfileButton title={'Cerrar Sesión'} style={styles.logOut} />
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      padding: 10,
    },
    logOut: {
      marginVertical: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: 40,
    },
  });
};
