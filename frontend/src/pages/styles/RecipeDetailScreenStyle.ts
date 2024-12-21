import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#FF6F61",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#737373",
    lineHeight: 24,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#737373",
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "#FF6F61",
    fontFamily: "Poppins-Regular",
  },
  sectionPortions:{
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#3DA510"
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color:"#545454",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
