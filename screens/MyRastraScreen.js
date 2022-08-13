import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, RefreshControl } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import ImageItem from '../components/ImageItem';
import EditRastraModal from '../components/RastraModal';
import api from '../api/api';

export default function ({ navigation, route }) {
  const styles = makeStyle();
  const [rastras, setRastras] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load_rastras = () => {
    api.listData(
      'api/rastra/supplier',
      (data) => {
        setRastras(data);
        setRefreshing(false);
      },
      (error) => {
        Alert.alert(error);
        setRefreshing(false);
      }
    );
  };

  useEffect(() => {
    load_rastras();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load_rastras();
  }, []);

  return (
    <View>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.containerButton}>
          {rastras.map((value, index) => (
            <ImageItem
              key={index}
              item={value}
              onPress={() =>
                navigation.navigate(!route.params ? 'Item' : 'MyRatingScreen', {
                  supplier: true,
                  id: value.id,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      {!route.params && (
        <EditRastraModal
          title={'Agregar Rastra'}
          alertTitle={'Se guardo correctamente su Rastra.'}
          reload={(reload) => setRefreshing(reload)}
        />
      )}
    </View>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {},
    containerButton: {
      flex: 1,
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 100,
      height: heightPercentageToDP(100),
    },
  });
};
