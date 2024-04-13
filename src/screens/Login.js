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
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (role === "shg" || role === "company") {
        navigation.replace("MainCompany");
      } else if (role === "shopper") {
        navigation.replace("Main");
      } else {
        console.log("Invalid role:", role);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);

      const fetchUserRole = async () => {
        try {
          const data = await getDoc(doc(db, "User-Data", email));
          if (data.exists()) {
            setRole(data.data().role);
            if (role === "shg" || role === "company") {
              navigation.replace("MainCompany");
            } else if (role === "shopper") {
              navigation.replace("Main");
            } else {
              console.log("Invalid role:", role);
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      await fetchUserRole();
    } catch (error) {
      alert(error.message);
    }
  };

  const changePassword = () => {
    sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        alert("Password reset email sent.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // const handleDebug = ()=> {
  //   navigation.replace("Main");
  // }

  return (
    <SafeAreaView style={styles.container} behavior="padding">
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputcontainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
          </View>
          <TextInput
            label="Email"
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
        <TouchableOpacity onPress={changePassword}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.replace("Register")}
          onPress={() => navigation.replace("SignUp")}
        >
          <Text style={styles.text}>
            Don't have an account? <Text style={styles.forgot}>SignUp</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 150,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1f1f1f",
    paddingBottom: 50,
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
    marginTop: 8,
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
