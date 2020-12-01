import React from 'react';
import AppContext from '.';
import useDevice from '../hooks/useDevice';

const BluetoothProvider = ({children}: any) => {
  const [device, setDevice] = useDevice();

  const context = {
    device,
    setDevice,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export default BluetoothProvider;
