import Client from "node-rest-client";

/*
import AdvertisingParametersService from "./AdvertisingParametersService.js";
import MicrophoneSensor from "./MicrophoneSensor.js";
import MTUService from "./MTUService.js";
import NameService from "./NameService.js";
import TemperatureSensor from "./TemperatureSensor.js";
import PressureSensor from "./PressureSensor.js";
import LEDService from "./LEDService.js";
import TapSensor from "./TapSensor.js";
import AbsoluteOrientationSensor from "./AbsoluteOrientationSensor.js";
import QuaternionOrientationSensor from "./QuaternionOrientationSensor.js";
import ButtonSensor from "./ButtonSensor.js";
import CloudTokenService from "./CloudTokenService.js";
import ColorSensor from "./ColorSensor.js";
import ConnectionParametersService from "./ConnectionParametersService.js";
import FirmwareService from "./FirmwareService.js";
import GasSensor from "./GasSensor.js";
import GravityVectorSensor from "./GravityVectorSensor.js";
import HumiditySensor from "./HumiditySensor.js";
import StepCounterSensor from "./StepCounterSensor.js";
import RawDataSensor from "./RawDataSensor.js";
import EulerOrientationSensor from "./EulerOrientationSensor.js";
import RotationMatrixOrientationSensor from "./RotationMatrixOrientationSensor.js";
import HeadingSensor from "./HeadingSensor.js";
import EddystoneUrlService from "./EddystoneUrlService.js";
import EnvironmentConfigurationService from "./EnvironmentConfigurationService.js";
import MotionConfigurationService from "./MotionConfigurationService.js";
import SoundConfigurationService from "./SoundConfigurationService.js";
import SpeakerDataService from "./SpeakerDataService.js";
import SpeakerStatusService from "./SpeakerStatusService.js";
import BatteryService from "./BatteryService.js";


import ThingyController from "./ThingyController.js";
import Utilities from "./Utilities.js";
import EventTarget from "./EventTarget.js";
import {Component} from "react";
import React from "react";

let Thingy = / ** @class * /   (function (_super) {
  __extends(Thingy, _super);
  function Thingy(options) {
    if (options === void 0) { options = { logEnabled: true }; }
    var _this = _super.call(this) || this;
    _this.connect = function () {  };

    _this.getConnected = function () {
      return _this.connected;
    };
    _this.setConnected = function (bool) {
      _this.connected = bool;
    };
    _this.resetDeviceProperties = function () {
      _this.setConnected(false);
      _this.thingyController.terminate();
    };
    _this.onDisconnected = function (_a) {
      var target = _a.target;
      if (!_this.getConnected()) {
        if (_this.logEnabled) {
          console.log("Disconnected from device named " + target.name);
        }
      }
      else {
        _this.resetDeviceProperties();
        _this.utilities.processEvent("disconnected", "thingy");
      }
    };
    _this.disconnect = function () { return __awaiter(_this, void 0, void 0, function () {
      var error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            this.resetDeviceProperties();
            return [4 / *yield* /, this.device.gatt.disconnect()];
          case 1:
            _a.sent();
            return [2 / *return* /, true];
          case 2:
            error_3 = _a.sent();
            this.utilities.processEvent("error", "thingy", error_3);
            return [2 / *return* /, false];
          case 3: return [2 / *return* /];
        }
      });
    }); };

    _this.logEnabled = options.logEnabled;
    _this.connected = false;
    if (_this.logEnabled) {
      console.log("I am alive!");
    }
    // TCS = Thingy Configuration Service
    _this.TCS_UUID = "ef680100-9b35-4933-9b10-52ffa9740042";
    _this.TCS_NAME_UUID = "ef680101-9b35-4933-9b10-52ffa9740042";
    _this.TCS_ADV_PARAMS_UUID = "ef680102-9b35-4933-9b10-52ffa9740042";
    _this.TCS_CONN_PARAMS_UUID = "ef680104-9b35-4933-9b10-52ffa9740042";
    _this.TCS_EDDYSTONE_UUID = "ef680105-9b35-4933-9b10-52ffa9740042";
    _this.TCS_CLOUD_TOKEN_UUID = "ef680106-9b35-4933-9b10-52ffa9740042";
    _this.TCS_FW_VER_UUID = "ef680107-9b35-4933-9b10-52ffa9740042";
    _this.TCS_MTU_REQUEST_UUID = "ef680108-9b35-4933-9b10-52ffa9740042";
    // TES = Thingy Environment Service
    _this.TES_UUID = "ef680200-9b35-4933-9b10-52ffa9740042";
    _this.TES_TEMP_UUID = "ef680201-9b35-4933-9b10-52ffa9740042";
    _this.TES_PRESSURE_UUID = "ef680202-9b35-4933-9b10-52ffa9740042";
    _this.TES_HUMIDITY_UUID = "ef680203-9b35-4933-9b10-52ffa9740042";
    _this.TES_GAS_UUID = "ef680204-9b35-4933-9b10-52ffa9740042";
    _this.TES_COLOR_UUID = "ef680205-9b35-4933-9b10-52ffa9740042";
    _this.TES_CONFIG_UUID = "ef680206-9b35-4933-9b10-52ffa9740042";
    // TUIS = Thingy User Interface Service
    _this.TUIS_UUID = "ef680300-9b35-4933-9b10-52ffa9740042";
    _this.TUIS_LED_UUID = "ef680301-9b35-4933-9b10-52ffa9740042";
    _this.TUIS_BTN_UUID = "ef680302-9b35-4933-9b10-52ffa9740042";
    _this.TUIS_PIN_UUID = "ef680303-9b35-4933-9b10-52ffa9740042";
    // TMS = Thingy Motion Service
    _this.TMS_UUID = "ef680400-9b35-4933-9b10-52ffa9740042";
    _this.TMS_CONFIG_UUID = "ef680401-9b35-4933-9b10-52ffa9740042";
    _this.TMS_TAP_UUID = "ef680402-9b35-4933-9b10-52ffa9740042";
    _this.TMS_ORIENTATION_UUID = "ef680403-9b35-4933-9b10-52ffa9740042";
    _this.TMS_QUATERNION_UUID = "ef680404-9b35-4933-9b10-52ffa9740042";
    _this.TMS_STEP_UUID = "ef680405-9b35-4933-9b10-52ffa9740042";
    _this.TMS_RAW_UUID = "ef680406-9b35-4933-9b10-52ffa9740042";
    _this.TMS_EULER_UUID = "ef680407-9b35-4933-9b10-52ffa9740042";
    _this.TMS_ROT_MATRIX_UUID = "ef680408-9b35-4933-9b10-52ffa9740042";
    _this.TMS_HEADING_UUID = "ef680409-9b35-4933-9b10-52ffa9740042";
    _this.TMS_GRAVITY_UUID = "ef68040a-9b35-4933-9b10-52ffa9740042";
    // TSS = Thingy Sound Service
    _this.TSS_UUID = "ef680500-9b35-4933-9b10-52ffa9740042";
    _this.TSS_CONFIG_UUID = "ef680501-9b35-4933-9b10-52ffa9740042";
    _this.TSS_SPEAKER_DATA_UUID = "ef680502-9b35-4933-9b10-52ffa9740042";
    _this.TSS_SPEAKER_STAT_UUID = "ef680503-9b35-4933-9b10-52ffa9740042";
    _this.TSS_MIC_UUID = "ef680504-9b35-4933-9b10-52ffa9740042";
    _this.serviceUUIDs = [
      "battery_service",
      _this.TCS_UUID,
      _this.TES_UUID,
      _this.TUIS_UUID,
      _this.TMS_UUID,
      _this.TSS_UUID,
    ];

    _this.addEventListener("gattavailable", function () { return _this.executeQueuedOperations(); });
    _this.addEventListener("operationqueued", function () { return _this.executeQueuedOperations(); });
    _this.advertisingparameters = new AdvertisingParametersService(_this);
    _this.microphone = new MicrophoneSensor(_this);
    _this.mtu = new MTUService(_this);
    _this.name = new NameService(_this);
    _this.temperature = new TemperatureSensor(_this);
    _this.pressure = new PressureSensor(_this);
    _this.led = new LEDService(_this);
    _this.tap = new TapSensor(_this);
    _this.absoluteorientation = new AbsoluteOrientationSensor(_this);
    _this.quaternionorientation = new QuaternionOrientationSensor(_this);
    _this.button = new ButtonSensor(_this);
    _this.cloudtoken = new CloudTokenService(_this);
    _this.color = new ColorSensor(_this);
    _this.connectionparameters = new ConnectionParametersService(_this);
    _this.eddystone = new EddystoneUrlService(_this);
    _this.firmware = new FirmwareService(_this);
    _this.gas = new GasSensor(_this);
    _this.gravityvector = new GravityVectorSensor(_this);
    _this.humidity = new HumiditySensor(_this);
    _this.stepcounter = new StepCounterSensor(_this);
    _this.rawdata = new RawDataSensor(_this);
    _this.eulerorientation = new EulerOrientationSensor(_this);
    _this.rotationmatrixorientation = new RotationMatrixOrientationSensor(_this);
    _this.heading = new HeadingSensor(_this);
    _this.environmentconfiguration = new EnvironmentConfigurationService(_this);
    _this.motionconfiguration = new MotionConfigurationService(_this);
    _this.soundconfiguration = new SoundConfigurationService(_this);
    _this.speakerdata = new SpeakerDataService(_this);
    _this.speakerstatus = new SpeakerStatusService(_this);
    _this.battery = new BatteryService(_this);
    return _this;
  }
  return Thingy;
}(EventTarget));
*/


class ThingyAPI {
  constructor() {
    this.client = new Client();
    this.registerMethods();
  }

  registerMethods() {
    // registering remote methods
    this.client.registerMethod("getTemperature", "http://remote.site/rest/json/method", "GET");

    this.client.methods.getTemperature(function(data, response) {
      // parsed response body as js object
      console.log(data);
      // raw response
      console.log(response);
    });
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening,
    }, this.handleListen);
  }
}

export default ThingyAPI;
