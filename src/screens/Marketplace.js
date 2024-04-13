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
import Icon from "react-native-vector-icons/Feather";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome6";
import { FloatingAction } from "react-native-floating-action";

const Marketplace = () => {
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    "10% off on food",
    "12% off on clothes",
    "15% off on furniture",
  ]);
  const [monument, setMonument] = useState([
    "Handicraft",
    "Textile",
    "Herbal Ayurveda",
    "Furniture",
    "Food",
  ]);
  const [plan, setPlan] = useState([
    "Jute Bag",
    "Papad",
    "Khadi Shirt",
    "Kurta",
    "Ayurveda Soap",
    "Handmade Paper",
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
        <Text style={styles.title}>
          Hi, {"\n"}
          <Text style={{ textTransform: "capitalize" }}>
            {userinfo.firstname}{" "}
          </Text>
        </Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={20}
            color="#d6d6d6"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#e6e6e6"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            // onSubmitEditing={handleSearch}
            // onFocus={handleSearchFocus}
            style={styles.textInput}
          />
        </View>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
          showsHorizontalScrollIndicator={false}
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
            showsHorizontalScrollIndicator={false}
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

        <Text style={styles.subTitle}>Best Sellers</Text>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatList
            data={plan}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tertiarycard}
                onPress={() => handlePlan(item)}
              >
                <Text style={styles.tertiarycardTitle}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Set number of columns to 2
            contentContainerStyle={styles.tertiarycards} // Apply styles to the container
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>

        {/* <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        /> */}
      </ScrollView>
      {/* <View style={flex= 1}>
          <FAB onPress={displayAlert} title="Add" />
        </View> */}
      <View>
        <FloatingAction
          floatingIcon={
            <Icons
              name="cart-shopping"
              style={{ fontSize: 20, color: "white" }}
            />
          }
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
    paddingBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
    borderColor: "#d6d6d6",
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
    backgroundColor: "#fff",
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
  },
  tertiarycard: {
    backgroundColor: "#efefef",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: "48%",
    marginRight: 5,
    marginBottom: 10,
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
  floatingButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
