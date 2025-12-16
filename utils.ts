export const addChimePlaceholders = (
  device: any,
  type: any,
): any => {
  return {
    ...device,
    chimeIds: {
      appWindowDeviceId: '-1',
      appWindowGroupId: '-1',
      meetingWindowDeviceId: '-1',
      meetingWindowGroupId: '-1',
    },
    chimeDeviceKind: type,
  };
};

export const formatDuplicateVoiceSDKDeviceNames = (
  voiceSDKDevices: any[],
) => {
  for (let i = 0; i < voiceSDKDevices.length - 1; i++) {
    const currentDevice = voiceSDKDevices[i];

    const index = voiceSDKDevices.findIndex((device) =>
      currentDevice.name.includes(device.name),
    );

    if (
      index !== undefined &&
      /^-?\d+$/.test(currentDevice.name[currentDevice.name.length - 1])
    ) {
      const newName = currentDevice.name.slice(
        0,
        currentDevice.name.length - 2,
      );

      if (newName === voiceSDKDevices[index].name) {
        voiceSDKDevices[i].name = newName;
      }
    }
  }

  return voiceSDKDevices;
};

export const mergedChimeAudioDevices = (chimeAudioDeviceList: any[]) => {
  const mergedChimeAudioDeviceList: any[] = [];

  const filteredChimeAudioDeviceList = chimeAudioDeviceList.filter(
    (device) => device.deviceId !== 'communications',
  );

  const defaultDevice = filteredChimeAudioDeviceList.find(
    (device) => device.label === 'default',
  );

  if (defaultDevice) {
    mergedChimeAudioDeviceList.push(defaultDevice);
  }

  filteredChimeAudioDeviceList.map((device) => {
    const foundInMergedChimeDeviceList = mergedChimeAudioDeviceList.find(
      (audioDevice) => audioDevice.groupId === device.groupId,
    );

    if (foundInMergedChimeDeviceList) {
      return;
    }

    mergedChimeAudioDeviceList.push(device);
  });

  return mergedChimeAudioDeviceList;
};