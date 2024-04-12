import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc } from "firebase/firestore"; 


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) =>{
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        setDoc(doc(db, "User-Data",email), {
          firstname: firstName,
          lastname: lastName,
          email: email,
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container} behavior="padding">
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputcontainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>First Name</Text>
          </View>
          <TextInput
            placeholder="Sushma"
            placeholderTextColor={"#e6e6e6"}
            value={firstName}
            onChangeText={(text) => setfirstName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputcontainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Last Name</Text>
          </View>
          <TextInput
            placeholder="Kumar"
            placeholderTextColor={"#e6e6e6"}
            value={lastName}
            onChangeText={(text) => setlastName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputcontainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
          </View>
          <TextInput
            placeholder="sushmakumar@xyz.com"
            placeholderTextColor={"#e6e6e6"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputcontainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Password</Text>
          </View>
          <TextInput
            placeholder="•••••••••••••"
            placeholderTextColor={"#e6e6e6"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.replace("Register")}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.text}>
            Already have an account? <Text style={styles.forgot}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop:150,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1f1f1f",
    paddingBottom:50,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    marginTop: 0,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    // borderColor: "#",
    borderWidth: 1,
  },
  forgot: {
    fontStyle: "italic",
    paddingLeft: 20,
    paddingTop: 2,
    textAlign: "left",
    color: "#00ADB5",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    color: "#111",
  },
  buttonOutline: {
    backgroundColor: "#1f1f1f",
    marginTop: 5,
    // borderColor:"#1c1c1c",
    // borderWidth:2,
  },
  buttonText: {
    color: "#fff",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#fff",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    color: "#878787",
    marginTop:8,
  },
  inputcontainer: {
    height: 65,
    position: "relative",
    marginTop: 15,
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    top: -10,
    left: 25,
    padding: 5,
    zIndex: 50,
  },
  label: {
    color: "#828282",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    paddingVertical: 0,
    margin: 5,
    borderRadius: 30,
    borderColor: "#828282",
    color: "#1f1f1f",
  },
});