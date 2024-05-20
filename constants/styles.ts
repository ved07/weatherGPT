import { TextStyle, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
  },
  settingsSection: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666666",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#333333",
    paddingVertical: 15,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  sliderContainer: {
    paddingVertical: 15,
  },
  tableSection: {
    paddingTop: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: "#333333",
  },
  sectionBackground: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Very light grey background
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
});
