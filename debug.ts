import { formatDuplicateVoiceSDKDeviceNames, mergedChimeAudioDevices } from "./utils"

const sdkMicsRaw = [{
    "friendlyName": "Microphone Array (Realtek(R) Audio)",
    "hid": "INTELAUDIO\\FUNC_01&VEN_10EC&DEV_0236&SUBSYS_10280B0F&REV_1000\\5&1f1ef02e&0&0001",
    "id": 3186183976,
    "role": 0,
    "deviceType": 1,
    "inadvisable": false,
    "defaultSystemDevice": false,
    "defaultSystemCommDevice": false
  },
  {
    "friendlyName": "Microphone (Jabra Evolve2 40)",
    "hid": "INTELAUDIO\\CTLR_DEV_51C8&LINKTYPE_06&DEVTYPE_06&VEN_8086&DEV_AE50&SUBSYS_0B0F1028&REV_0001\\0602",
    "id": 848368231,
    "role": 0,
    "deviceType": 1,
    "inadvisable": false,
    "defaultSystemDevice": true,
    "defaultSystemCommDevice": false
  },
  {
    "friendlyName": "Headset Microphone (Jabra Evolve2 30)",
    "hid": "INTELAUDIO\\CTLR_DEV_51C8&LINKTYPE_06&DEVTYPE_06&VEN_8086&DEV_AE50&SUBSYS_0B0F1028&REV_0001\\0602",
    "id": 338417251,
    "role": 1,
    "deviceType": 1,
    "inadvisable": false,
    "defaultSystemDevice": false,
    "defaultSystemCommDevice": true
  }
]

const sdkMicsDevice = sdkMicsRaw.map((item) => {
    const device = {
    id: item.id,
    name: item.friendlyName,
    type: item.deviceType,
    defaultSystemDevice: item.defaultSystemDevice,
    };

    return device
});

const chimeMics = [
  {
    "deviceId": "default",
    "kind": "audioinput",
    "label": "Default - Microphone (Jabra Evolve2 40)",
    "groupId": "a18583072cbf9ba0240f8b480622dd937ad069ac505d36ed25fb9feead605323"
  },
  {
    "deviceId": "communications",
    "kind": "audioinput",
    "label": "Communications - Headset Microphone (Jabra Evolve2 30)",
    "groupId": "a18583072cbf9ba0240f8b480622dd937ad069ac505d36ed25fb9feead605323"
  },
  {
    "deviceId": "7ed4e500792e8b051fde4b768a977bf3c2b6057dba8623e822073a736f29b8cf",
    "kind": "audioinput",
    "label": "Microphone Array (Realtek(R) Audio)",
    "groupId": "717b2a59a036487ebeb8e9f1dd7300b0a4f04e3bc88a1fc9d2be6aa5588d247e"
  },
  {
    "deviceId": "a818f5ae2f8ec78558550edf269406feded00c320834f7390afcebe708384cdc",
    "kind": "audioinput",
    "label": "Microphone (Jabra Evolve2 40)",
    "groupId": "a18583072cbf9ba0240f8b480622dd937ad069ac505d36ed25fb9feead605323"
  },
  {
    "deviceId": "27031c90156c6cb73fb135b51b813b583c5e965375d175a59e62026dd2ec51dc",
    "kind": "audioinput",
    "label": "Headset Microphone (Jabra Evolve2 30)",
    "groupId": "a18583072cbf9ba0240f8b480622dd937ad069ac505d36ed25fb9feead605323"
  }
]

const sdkFormatted = formatDuplicateVoiceSDKDeviceNames(sdkMicsDevice)
const chimeMicsMerged = mergedChimeAudioDevices(chimeMics)

console.log(chimeMicsMerged)