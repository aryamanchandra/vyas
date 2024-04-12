import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome6";
import { FloatingAction } from "react-native-floating-action";

const Community = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const [data, setData] = useState(["@sapnashg", "@foodus", "@handicraftshg"]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      console.log("No user signed in");
    }

    const fetchData = async () => {
      try {
        // const cachedData = await AsyncStorage.getItem("user-data");
        cachedData = false;
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Community</Text>
        <ScrollView
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((element, key) => (
            <View
              style={styles.card}
              key={key}
              onPress={() => handleGuide(element)}
            >
              <View style={{display:"flex", flexDirection:"row"}}>
                <Text style={styles.cardTitle}>{element}</Text>
                <Text style={{marginLeft:"auto"}}>11 Feb 2024</Text>
              </View>
              <Image
                  source={require("../assets/splash.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;

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
    // backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 400,
    width: "100%",
    marginRight: 12,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#1c1c1c",
    // textAlign: "center",
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
  image: {
    height: "100px",
    aspectRatio: 1,
    alignSelf: "center",
  },
});
