import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
} from 'react-native';
import {BleError, BleManager, Device} from 'react-native-ble-plx';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Item from './components/Item';

const manager = new BleManager();

const App = () => {
  const [deviceData, setDeviceData] = useState<Device>();
  const [deviceError, setDeviceError] = useState<BleError>();

  useEffect(() => {
    return () => {
      scanAndConnect();
    };
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);
        setDeviceError(error);
        return;
      }

      if (device) {
        setDeviceData(device);
      }

      // Check if it is a device you are looking for based on farm manufacturer data
      // or other criteria.
      if (device?.name === 'Test' || device?.name === '') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Found device we are looking for!!
        // Proceed with connection. for example device.connect() which returns a Promise
      }
    });
  };

  const reScan = () => {
    console.log('rescan');
    scanAndConnect();
  };

  const EmptyList = () => (
    <View style={styles.item}>
      <Text style={styles.errorTitle}>
        {deviceError ? deviceError.message : 'No Data'}
      </Text>
    </View>
  );

  const renderItem = ({item}: any) => <Item title={item} />;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Available Devices</Text>
        <FlatList
          data={deviceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyList}
        />
        <Button onPress={reScan} title="reScan" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 132,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: Colors.black,
  },
  item: {
    backgroundColor: '#e0dde2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
  errorTitle: {
    fontSize: 22,
    color: '#949494',
  },
});

export default App;
