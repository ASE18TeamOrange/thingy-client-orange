export const RECEIVE_NEW_READING = "RECEIVE_NEW_READING";
export const RECEIVE_NEW_NOTIFY_READING = "RECEIVE_NEW_NOTIFY_READING";
export const FEATURE_NOTIFICATION_STATUS = "NOTIFY_FEATURE_STATUS";
export const CHANGE_CARD_TAB = "CHANGE_CARD_TAB";
export const NOTIFY_IFTTT_TRIGGER_STATUS = "NOTIFY_IFTTT_TRIGGER_STATUS";
export const RECEIVE_IFTTT_KEY = "RECEIVE_IFTTT_KEY";
export const CLEAN_THE_SLATE = "CLEAN_THE_SLATE";
export const NOTIFY_USER = "NOTIFY_USER";
export const SET_FEATURE_HAS_EVENT_LISTENER = "SET_FEATURE_HAS_EVENT_LISTENER";

export const receiveNewReading = (feature, reading) => ({
  type: RECEIVE_NEW_READING,
  reading: {
    feature,
    reading,
  },
});

export const receiveNewNotifyReading = (feature, reading) => ({
  type: RECEIVE_NEW_NOTIFY_READING,
  reading: {
    feature,
    reading,
  },
});

export const featureNotificationStatus = (feature, status) => ({
  type: FEATURE_NOTIFICATION_STATUS,
  status: {
    feature,
    status,
  },
});

export const changeCardTab = (feature, tab) => ({
  type: CHANGE_CARD_TAB,
  feature,
  tab,
});

export const cleanTheSlate = () => ({
  type: CLEAN_THE_SLATE,
});

export const notifyUser = (message, category) => ({
  type: NOTIFY_USER,
  message,
  category,
});

export const setFeatureHasEventListener = (feature) => ({
  type: SET_FEATURE_HAS_EVENT_LISTENER,
  feature,
});

// toggle parameter: "both" - function as normal toggle, "on" - only allow sensors to become active, "off" - only allow sensors to go inactive
export const toggleFeature = (feature, toggle="both", isMicrophone=false) => {
  return async (dispatch, getState) => {
    try {
      if (feature === "gas") {
        dispatch(notifyFeatures(["tvoc", "co2"], toggle));
        return;
      }

      const state = await getState();
      const status = state.misc[feature].status;
      const hasEventListener = state.misc[feature].hasEventListener || false;

      if (toggle === "both" || (toggle === "on" && !status) || (toggle === "off" && status)) {
        const featureToUpdateStatusFor = feature;

        if (["tvoc", "co2"].includes(feature)) {
          const isNot = feature === "tvoc" ? "co2" : "tvoc";
          const isNotStatus = state.misc[isNot].status;

          if (isNotStatus) {
            dispatch(featureNotificationStatus(featureToUpdateStatusFor, !status));
            return;
          }

          feature = "gas";
        }

        let e;

        if (isMicrophone) {
          if (!status) {
            await window.thingy.mtu.write(276);
          }
          e = (data) => {
            const tempData = data.detail;
            window.thingy.microphone.play(tempData);
          };
        } else {
          e = (reading) => {
            dispatch(receiveNewNotifyReading(feature, reading));
          };
        }

        if (!status) {
          if (!hasEventListener) {
            window.thingy.addEventListener(feature, e);
            dispatch(setFeatureHasEventListener(feature));
          }
          await window.thingy[feature].start();
          dispatch(featureNotificationStatus(featureToUpdateStatusFor, true));
        } else {
          await window.thingy[feature].stop();
          dispatch(featureNotificationStatus(featureToUpdateStatusFor, false));
        }
      }
    } catch (error) {
      // These errors might occur because we try to stop several ongoing notify operations after disconnecting from Thingy, which naturally is not possible.
      // Queue the conditional under
      if (error.message !== "Cannot read property 'gattBusy' of undefined" || error.message !== "Cannot set property 'gattBusy' of undefined") {
        // should actually do something here

        // do
        // the
        // something
      }

      return;
    }
  };
};

// notifies the list of features, given that they are not already active
const notifyFeatures = (features, toggle="both") => {
  return async (dispatch) => {
    for (const f of features) {
      await dispatch(toggleFeature(f, toggle));
    }
  };
};

export const toggleEnvironment = (toggle) => {
  const environmentFeatures = ["temperature", "pressure", "humidity", "co2", "tvoc", "color"];

  return (dispatch) => {
    dispatch(notifyFeatures(environmentFeatures, toggle));
  };
};


export const readFeature = (feature) => {
  return async (dispatch) => {
    const reading = await window.thingy[feature].read();
    dispatch(receiveNewReading(feature, reading));
  };
};

export const onConnectionEvent = (state) => {
  return (dispatch) => {
    dispatch(receiveNewReading("connected", state));
  };
};

export const disconnect = () => {
  return async (dispatch) => {
    await window.thingy.disconnect();
    dispatch(cleanTheSlate());
  };
};

export const startDisconnectNotification = () => {
  return async (dispatch) => {
    const disconnectListener = async (e) => {
      await window.thingy.disconnect();
      dispatch(cleanTheSlate());
      dispatch(onConnectionEvent(false));
      dispatch(notifyUser({message: "Lost connection to your device. Please try to reconnect", category: "error"}));
    };

    window.thingy.addEventListener("disconnected", disconnectListener);
  };
};

export const startErrorNotification = () => {
  return async (dispatch, getState) => {
    const errorListener = (e) => {
      if (e.detail !== undefined) {
        const state = getState();
        if (state.misc.connected.reading) {
          dispatch(notifyUser({message: e.detail.body.message, category: "error"}));
        }
      } else {
        dispatch(notifyUser({message: String(e), category: "error"}));
      }
    };
    window.thingy.addEventListener("error", errorListener);
  };
};

export const startWriteNotification = () => {
  return async (dispatch) => {
    const writeListener = (write) => {
      const configurationTypes = [
        "name",
        "advertisingparameters",
        "connectionparameters",
        "eddystone",
        "cloudtoken",
        "environmentconfiguration",
        "motionconfiguration",
      ];
      if (write.detail) {
        if (configurationTypes.includes(write.detail.feature)) {
          dispatch(notifyUser({message: "Success", category: "success"}));
        }
      }
    };
    window.thingy.addEventListener("write", writeListener);
  };
};

export const startBatteryNotification = () => {
  return async (dispatch) => {
    const batteryListener = (reading) => {
      dispatch(receiveNewNotifyReading("battery", reading));
    };
    window.thingy.addEventListener("battery", batteryListener);
    const batteryLevel = await window.thingy.battery.read();
    dispatch(receiveNewReading("battery", batteryLevel));
    await window.thingy.battery.start();
  };
};

export const notifyError = (e) => {
  return (dispatch) => {
    dispatch(notifyUser({message: String(e), category: "error"}));
  };
};
