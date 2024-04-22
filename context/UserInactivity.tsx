import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useAppStateStore } from "../store/appStateStore";

const storage = new MMKV({
  id: "inactivity-storage",
});

type UserInactivityProviderProps = {
  children: any;
};

export const UserInactivityProvider = ({
  children,
}: UserInactivityProviderProps) => {
  const appState = useRef(AppState.currentState);

  const { isSignedIn } = useAppStateStore();

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsedTime = Date.now() - (storage.getNumber("startTime") || 0);
      console.log("50:", isSignedIn);

      if (elapsedTime > 3000 && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};
