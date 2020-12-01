import {useEffect, useState} from 'react';
import useAsync from './useAsync';
import {BleError, BleManager, Device} from 'react-native-ble-plx';

const manager = new BleManager();

const useDevice = () => {
  const [device, setDevice] = useState<Device>();
  const [error, setError] = useState<BleError>();
  const [loading, setLoading] = useState(false);

  const scan = async () => {
    try {
      // eslint-disable-next-line no-shadow
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          // Handle error (scanning will be stopped automatically)
          setError(error);
          setLoading(false);
          return;
        }

        if (device) {
          setLoading(false);
          setDevice(device);
        }

        // Check if it is a device you are looking for based on farm manufacturer data
        // or other criteria.
        if (device?.name === 'Test' || device?.name === '') {
          // Stop scanning as it's not necessary if you are scanning for one device.
          manager.stopDeviceScan();
          // Found device we are looking for!!
          // Proceed with connection. for example device.connect() which returns a Promise
          console.log(device);
        }
      });
    } catch (er) {
      console.log(er);
    }
  };

  const {execute, status, value, error2} = useAsync(scan, false);

  useEffect(() => {
    console.log(execute, status, value, error2, error, loading);
    scan();
  }, []);

  return device;
};

export default useDevice;
