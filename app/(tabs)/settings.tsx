import { Switch, StyleSheet, View, Text, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingSlider from "@/components/SettingSlider";
import { TimeSwitch } from "@/components/24HourTimeSwitch";
import { styles } from "@/constants/styles";
import {
  SettingsContext,
  defaultSettingsContext,
  useSettings,
} from "@/hooks/useSettings";
import SettingsTable, { TableItem } from "@/components/SettingsTable";

export default function SettingsScreen() {
  const { settings, loading, setSettings } =
    useContext(SettingsContext) || defaultSettingsContext;
  const [rainfall, setRainfall] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [backupMethodMultiplier, setBackupMethodMultiplier] = useState("2.0");
  const [maxWaitTime, setMaxWaitTime] = useState("60");

  const saveSettings = () => {
    setSettings({
      ...settings,
      rainfallTolerance: parseFloat(rainfall.toFixed(1)),
      temperatureTolerance: parseFloat((temperature - 10.0).toFixed(1)),
    });
  };

  const onTableSave = (newTable: TableItem[]) => {
    setSettings({
      ...settings,
      settingsTable: newTable,
    });
  };

  useEffect(() => {
    setRainfall(parseFloat(settings.rainfallTolerance.toFixed(1)));
    setTemperature(
      parseFloat((settings.temperatureTolerance + 10.0).toFixed(1))
    );
    setBackupMethodMultiplier(settings.secondaryMultiplier.toString());
    setMaxWaitTime(settings.maxWaitTime.toString());
  }, [loading]);

  if (loading) return <View></View>;

  return (
    <SafeAreaView>
      <View className="w-full flex flex-col h-full px-4 max-w-screen-2xl">
        <Text className="text-3xl mb-4">Settings</Text>

        <View className="mb-6">
          <View className="flex flex-row justify-between items-center mb-1">
            <Text>
              Lowest temperature:{" "}
              <Text className="font-bold">
                {(temperature - 10.0).toFixed(1)}°C
              </Text>
            </Text>
            <SettingSlider
              initialValue={temperature}
              step={0.1}
              setInputValue={setTemperature}
              onFinish={saveSettings}
              minInputLimit={0.1}
              maxInputLimit={50}
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-1">
            <Text>
              Highest rainfall:{" "}
              <Text className="font-bold">{rainfall.toFixed(1)}%</Text>
            </Text>
            <SettingSlider
              initialValue={rainfall}
              step={0.1}
              setInputValue={setRainfall}
              onFinish={saveSettings}
              minInputLimit={0.1}
              maxInputLimit={100}
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-2">
            <Text>24-Hour Time</Text>
            <TimeSwitch
              defaultValue={settings.use24hrTime}
              onChange={(value) =>
                setSettings({ ...settings, use24hrTime: value })
              }
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-2">
            <Text>Walk as a backup method (default bus)</Text>
            <TimeSwitch
              defaultValue={settings.secondaryMethod === "walk"}
              onChange={(value) =>
                setSettings({
                  ...settings,
                  secondaryMethod: value ? "walk" : "bus",
                })
              }
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-2">
            <Text>Backup method travel time multiplier</Text>
            <TextInput
              className="rounded-md border-2 py-1 px-2 border-gray-300 w-16 bg-white"
              value={backupMethodMultiplier.toString()}
              onChangeText={(text) => setBackupMethodMultiplier(text)}
              onEndEditing={(e) =>
                setSettings({
                  ...settings,
                  secondaryMultiplier:
                    parseFloat(backupMethodMultiplier) || 2.0,
                })
              }
              keyboardType="numeric"
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-2">
            <Text>Maximum wait time</Text>
            <TextInput
              className="rounded-md border-2 py-1 px-2 border-gray-300 w-16 bg-white"
              value={maxWaitTime.toString()}
              onChangeText={(text) => setMaxWaitTime(text)}
              onEndEditing={(e) =>
                setSettings({
                  ...settings,
                  maxWaitTime: parseFloat(maxWaitTime) || 60,
                })
              }
              keyboardType="numeric"
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-2">
            <Text>Location</Text>
            <Text className="rounded-md border-2 py-1 px-2 border-gray-400 w-32 bg-gray-300">
              Cambridge
            </Text>
          </View>
        </View>

        <View>
          <SettingsTable
            use24hrTime={settings.use24hrTime}
            startingValue={settings.settingsTable}
            onSave={onTableSave}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
