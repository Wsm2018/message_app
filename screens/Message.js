import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";
import db from "../db.js";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default ({ message, handleEdit }) => {
  const [user, setUser] = useState(null);
  //console.log(message.from);

  const handleUser = () => {
    const user = db
      .collection("users")
      .doc(message.from)
      .onSnapshot(docSnapShot => {
        console.log("message comp handleUser snapshot", docSnapShot.data());
        setUser(docSnapShot.data());
      });
    // console.log("user from messages", user.data());
    // setUser(user.data());
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
    //console.log(message);
  };

  return (
    user && (
      <View
        style={(styles.getStartedText, { flexDirection: "row", margin: 10 })}
      >
        <View>
          <Image
            source={{ url: user.photoURL }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Text>From: {user.displayName}</Text>
          <Text>To: {message.to}</Text>
          <Text>Message: {message.text}</Text>
          <Button title="EDIT" onPress={handleEdit} />
          <Button title="DELETE" onPress={() => handleDelete(message)} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10
    // justifyContent:"center",
    // alignItems: "center"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
