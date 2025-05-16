// hooks/useNetworkListener.ts
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setOffline } from "../../store/network/networkSlice";
import { RootState } from '../../store/global/store';

export const useNetworkListener = () => {
  const dispatch = useDispatch();
  const isManual = useSelector((state: RootState) => state.offline.isManual);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const realConnected = !!state.isConnected;
      dispatch(setOffline(isManual || !realConnected));
    });

    return () => unsubscribe();
  }, [dispatch, isManual]);
};