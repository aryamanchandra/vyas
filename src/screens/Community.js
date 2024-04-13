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
import Post from "../components/Post";

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
      userProfilePicture: "https://vajiramandravi.s3.us-east-1.amazonaws.com/media/2020/3/9/9/33/26/women_SHGs.jpg",
      username: "user1",
      imageUrl: "https://www.villagesquare.in/wp-content/uploads/2023/09/Glossary-itme-2.jpeg",
      caption: "Meet our new joinees.",
      date:"11 Feb 2024",
    },
    {
      userProfilePicture: "https://i0.wp.com/compass.rauias.com/wp-content/uploads/2023/05/image-440.png?resize=413%2C273&ssl=1",
      username: "user2",
      imageUrl: "https://arunachaltimes.in/wp-content/uploads/2022/01/Loans-provided-to-66-SHGs.jpg",
      caption: "Building towards  a better future.",
      date:"11 Feb 2024",
    },
    {
      userProfilePicture: "https://qph.cf2.quoracdn.net/main-qimg-19f2f176ceb0e9d0cebea858a8db1b9f.webp",
      username: "user1",
      imageUrl: "https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/ravivar-vichar/media/media_files/5WqDoU5RzGIKUlrnZpns.jpg",
      caption: "Together we rise.",
      date:"11 Feb 2024",
    },
    {
      userProfilePicture: "https://vajiramandravi.s3.us-east-1.amazonaws.com/media/2020/3/9/9/33/26/women_SHGs.jpg",
      username: "user2",
      imageUrl: "https://svpss.in/wp-content/uploads/2019/09/shg.png",
      caption: "Taking the oath  to protect Mother Earth.",
      date:"11 Feb 2024",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Community</Text>
        {/* <ScrollView
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
        </ScrollView> */}
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
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
