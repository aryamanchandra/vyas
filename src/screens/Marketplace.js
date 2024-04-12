import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome5";

const Marketplace = () => {
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const [data, setData] = useState([
    "10% Off food",
    "12% on clothes"
  ]);
  const [monument, setMonument] = useState([
    "Food",
    "Furniture",
    "Clothes",
    "Home Stuff",
  ]);
  const [plan, setPlan] = useState([
    "10% Off food",
    "12% on clothes"
  ]);
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      console.log("No user signed in");
    }

    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("user-data");
        // cachedData = false;
        if (cachedData) {
          const parsedCachedData = JSON.parse(cachedData);
          setUser(parsedCachedData.user);
          setMonument(parsedCachedData.monuments);
        } else {
          const docRef = await doc(db, "User-Data", user.email);

          try {
            const docSnap = await getDoc(docRef);
            const querySnapshot = await getDocs(collection(db, "Something"));
            const newMonumentsData = [];
            querySnapshot.forEach((doc) => {
              newMonumentsData.push(doc.id);
            });

            if (docSnap.exists()) {
              const data = docSnap.data();
              setUser(data);
              setMonument(newMonumentsData);

              const cachedDataObject = {
                user: data,
                monuments: newMonumentsData,
              };

              await AsyncStorage.setItem(
                "user-data",
                JSON.stringify(cachedDataObject)
              );
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user]);

  const handlePlan = (element) => {
    navigation.navigate("Plan", { element });
  };

  const handlePage = (element) => {
    navigation.navigate("Monument", { element });
  };

  const handleGuide = (element) => {
    navigation.navigate("Guide", { element });
  };

  const handleNearby = (element) => {
    navigation.navigate("City", { element });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Hi, {"\n"}
          <Text style={{ textTransform: "capitalize" }}>
            {userinfo.firstname}{" "}
          </Text>
        </Text>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
        >
          {data.map((element, key) => (
            <TouchableOpacity
              style={styles.card}
              key={key}
              onPress={() => handleGuide(element)}
            >
              <Text style={styles.cardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View>
          <View style={styles.header}>
            <Text style={styles.subTitle}>Categories</Text>
            <TouchableOpacity
              style={styles.seemoreheader}
              onPress={() => handleNearby(userinfo.location)}
            >
              <Text style={styles.seemore}>See More</Text>
              <Icons name="angle-right" style={styles.icon1} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            snapToAlignment={"center"}
            style={styles.secondarycards}
            flexDirection="row"
            flex={2}
          >
            {monument.map((element, key) => (
              <TouchableOpacity
                style={styles.secondarycard}
                key={key}
                onPress={() => handlePage(element)}
              >
                <Image
                  source={require("../assets/splash.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.secondarycardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.subTitle}>New Offers</Text>

        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tertiarycards}
        >
          {plan.map((element, key) => (
            <TouchableOpacity
              style={styles.tertiarycard}
              key={key}
              onPress={() => handlePlan(element)}
            >
              <Text style={styles.tertiarycardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Marketplace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1c1c1c",
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    borderColor: "#3c3c3c",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "#fff",
  },
  herocards: {
    marginBottom: 10,
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  cardTitle: {
    color: "#1c1c1c",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 28,
  },
  subTitle: {
    color: "#00ADB5",
    fontWeight: "400",
    fontSize: 22,
    paddingLeft: 3,
  },
  seemoreheader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seemore: {
    paddingTop: 5,
    color: "#00ADB5",
  },
  icon1: {
    paddingLeft: 3,
    paddingTop: 5,
    fontSize: 20,
    color: "#00ADB5",
  },
  secondarycards: {
    marginTop: 18,
    flex: 1,
    marginBottom: 35,
  },
  secondarycard: {
    backgroundColor: "#efefef",
    // flex:1,
    // alignItems: "flex-start",
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
    // height: 100,
    width: 100,
    marginRight: 12,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  secondarycardTitle: {
    color: "#1c1c1c",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
    paddingTop: 5,
  },
  image: {
    height: 65,
    aspectRatio: 1,
    alignSelf: "center",
  },
  tertiarycards: {
    marginBottom: 35,
    marginTop: 15,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#efefef",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 175,
    marginRight: 12,
  },
  tertiarycardTitle: {
    color: "#1c1c1c",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  quaternarycards: {
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  quaternarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  quaternarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
});
