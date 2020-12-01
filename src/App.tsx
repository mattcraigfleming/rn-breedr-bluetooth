import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {BleError, BleManager, Device} from 'react-native-ble-plx';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Item from './components/Item';

const manager = new BleManager();

const App = () => {
  const [deviceData, setDeviceData] = useState<Device>();
  const [deviceError, setDeviceError] = useState<BleError>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      scanAndConnect();
    };
  }, []);

  const connectDevice = async ({connect}: any) => {
    const con = await connect();
    // device connection details
    console.log(con);
    return;
  };

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        setDeviceError(error);
        setLoading(false);
        return;
      }

      if (device) {
        setLoading(false);
        setDeviceData(device);
      }

      // Check if it is a device you are looking for based on farm manufacturer data
      // or other criteria.
      if (device?.name === 'Test' || device?.name === '') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();
        // Found device we are looking for!!
        // Proceed with connection. for example device.connect() which returns a Promise
        connectDevice(device);
      }
    });
  };

  const reScan = () => {
    setLoading(true);
    scanAndConnect();
  };

  const EmptyList = () => (
    <View style={styles.item}>
      {!loading ? (
        <Text style={styles.errorTitle}>
          {deviceError ? deviceError.message : 'No Data'}
          {loading && <ActivityIndicator />}
        </Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );

  const AppButton = ({onPress, title}: any) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}: any) => <Item title={item} />;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Available Devices</Text>
        <FlatList
          data={deviceData || undefined}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyList}
        />
        <AppButton onPress={reScan} title="reScan" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 132,
    paddingHorizontal: 24,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: Colors.black,
  },
  item: {
    backgroundColor: '#e0dde2',
    padding: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
  },
  errorTitle: {
    fontSize: 22,
    color: '#949494',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#143974',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#e9dd34',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default App;
