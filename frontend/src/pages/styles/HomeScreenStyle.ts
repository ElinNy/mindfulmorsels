import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  textContainer: {
    alignSelf: "flex-start",
    fontFamily: "Poppins",
    marginTop: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginBottom: 20,
    color: "#737373",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#fff", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});
