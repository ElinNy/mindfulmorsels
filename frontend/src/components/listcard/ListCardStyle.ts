import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    overflow: "hidden",
    position: "relative", 
  },
  imageContainer: {
    width: "100%",
    height: 300,
    overflow: "hidden",
  },
  image: {
    width: "80%",
    height: "90%",
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#545454",
    flex: 1,
  },
  iconContainer: {
    marginLeft: 16,
  },
  shareIconContainer: {
    position: "absolute",
    top: 10, 
    right: 0, 
   
    borderRadius: 50, 
    padding: 8, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

