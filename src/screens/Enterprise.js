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
import Icon from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FloatingAction } from "react-native-floating-action";
import Post from "../components/Post";

const Enterprise = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const contracts = ["Contract 1", "Contract 2", "Contract 3", "Contract 4"];
  const learning = ["Learning 1", "Learning 2", "Learning 3", "Learning 4"];
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

  const posts = [
    {
      userProfilePicture:
        "https://vajiramandravi.s3.us-east-1.amazonaws.com/media/2020/3/9/9/33/26/women_SHGs.jpg",
      username: "user1",
      imageUrl:
        "https://www.villagesquare.in/wp-content/uploads/2023/09/Glossary-itme-2.jpeg",
      caption: "Meet our new joinees.",
      date: "11 Feb 2024",
    },
    {
      userProfilePicture:
        "https://i0.wp.com/compass.rauias.com/wp-content/uploads/2023/05/image-440.png?resize=413%2C273&ssl=1",
      username: "user2",
      imageUrl:
        "https://arunachaltimes.in/wp-content/uploads/2022/01/Loans-provided-to-66-SHGs.jpg",
      caption: "Building towards  a better future.",
      date: "11 Feb 2024",
    },
    {
      userProfilePicture:
        "https://qph.cf2.quoracdn.net/main-qimg-19f2f176ceb0e9d0cebea858a8db1b9f.webp",
      username: "user1",
      imageUrl:
        "https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/ravivar-vichar/media/media_files/5WqDoU5RzGIKUlrnZpns.jpg",
      caption: "Together we rise.",
      date: "11 Feb 2024",
    },
    {
      userProfilePicture:
        "https://vajiramandravi.s3.us-east-1.amazonaws.com/media/2020/3/9/9/33/26/women_SHGs.jpg",
      username: "user2",
      imageUrl: "https://svpss.in/wp-content/uploads/2019/09/shg.png",
      caption: "Taking the oath  to protect Mother Earth.",
      date: "11 Feb 2024",
    },
  ];

  const actions = [
    {
      text: "Accessibility",
      icon: require("../assets/splash.png"),
      name: "bt_accessibility",
      position: 2,
    },
    {
      text: "Language",
      icon: require("../assets/splash.png"),
      name: "bt_language",
      position: 1,
    },
    {
      text: "Location",
      icon: require("../assets/splash.png"),
      name: "bt_room",
      position: 3,
    },
    {
      text: "Video",
      icon: require("../assets/splash.png"),
      name: "bt_videocam",
      position: 4,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Enterprise</Text>
        <View>
          <View style={styles.socialiconsContainer}>
            <View style={styles.socialiconContainer}>
              <Icon name="line-graph" size={24} />
              <Text style={styles.socialiconText}>Growth</Text>
              <Text style={styles.socialiconNumbers}>20%↑</Text>
            </View>
            <View style={styles.socialiconContainer}>
              <Ionicon name="people" size={24} />
              <Text style={styles.socialiconText}>Reach</Text>
              <Text style={styles.socialiconNumbers}>2.5K↑</Text>
            </View>
            <View style={styles.socialiconContainer}>
              <MaterialIcons name="ads-click" size={24} />
              <Text style={styles.socialiconText}>Impressions</Text>
              <Text style={styles.socialiconNumbers}>13%↑</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Product Posting</Text>
          <View>
            <Text style={styles.subheading}>Top Posting</Text>
            <ScrollView
              horizontal
              style={{ paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              {contracts.map((element, key) => (
                <TouchableOpacity
                  style={styles.cardOffer}
                  key={key}
                  // onPress={() => handleGuide(element.city)}
                >
                  <Text style={styles.cardTitleOffer}>{element}</Text>
                  {/* <Text style={{ marginLeft: "auto",color:"#828282" }}>11 Feb 2024</Text> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.subheading}>Recommendation</Text>
            <ScrollView
              horizontal
              style={{ paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              {contracts.map((element, key) => (
                <TouchableOpacity
                  style={styles.cardOffer}
                  key={key}
                  // onPress={() => handleGuide(element.city)}
                >
                  <Text style={styles.cardTitleOffer}>{element}</Text>
                  {/* <Text style={{ marginLeft: "auto",color:"#828282" }}>11 Feb 2024</Text> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Contracts</Text>
          <View>
            <Text style={styles.subheading}>Ongoing</Text>
            <ScrollView
              style={{ paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              {contracts.map((element, key) => (
                <TouchableOpacity
                  style={styles.card}
                  key={key}
                  // onPress={() => handleGuide(element.city)}
                >
                  <Text style={styles.cardTitle}>{element}</Text>
                  <Text style={{ marginLeft: "auto", color: "#828282" }}>
                    11 Feb 2024
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.subheading}>Contract Offers</Text>
            <ScrollView
              horizontal
              style={{ paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              {contracts.map((element, key) => (
                <TouchableOpacity
                  style={styles.cardOffer}
                  key={key}
                  // onPress={() => handleGuide(element.city)}
                >
                  <Text style={styles.cardTitleOffer}>{element}</Text>
                  {/* <Text style={{ marginLeft: "auto",color:"#828282" }}>11 Feb 2024</Text> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Learning</Text>
          <ScrollView
            horizontal
            style={{ paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {learning.map((element, key) => (
              <TouchableOpacity
                style={styles.cardlearning}
                key={key}
                // onPress={() => handleGuide(element.city)}
              >
                <Text style={styles.cardTitlelearning}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View>
        <FloatingAction
          // floatingIcon={
          //   <Icons
          //     name="cart-shopping"
          //     style={{ fontSize: 20, color: "white" }}
          //   />
          // }
          distanceToEdge={{ horizontal: 0, vertical: 80 }}
          actions={actions}
          style={{
            position: "absolute",
            paddingBottom: 40,
          }}
          buttonSize={60}
          color={"#00ADB5"}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Enterprise;

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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    width: "100%",
    marginRight: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  cardTitle: {
    color: "#828282", // textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
  cardOffer: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 125,
    width: "100%",
    marginRight: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  cardTitleOffer: {
    color: "#828282",
    // textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
  cardlearning: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 125,
    width: 250,
    marginRight: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  cardTitlelearning: {
    color: "#828282",
    // textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
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
    // paddingLeft: 3,
  },
  subheading: {
    fontSize: 17,
    paddingBottom: 10,
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

  socialsubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  socialiconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#efefef",
    borderRadius: 10,
  },
  socialiconContainer: {
    alignItems: "center",
  },
  socialiconText: {
    fontSize: 12,
    marginTop: 5,
  },
  socialiconNumbers: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  socialuploadButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  socialuploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
