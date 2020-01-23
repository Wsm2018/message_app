import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";
import Message from "./Message";
import db from "../db.js";
import firebase from "firebase/app";
import "firebase/auth";

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  //const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    db.collection("messages").onSnapshot(querySnapshot => {
      const messages = [];
      querySnapshot.forEach(doc => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      //console.log("  Current messages: ", messages);
      setMessages([...messages]);
    });
  }, []);

  // const handleDelete = message => {
  //   db.collection("messages")
  //     .doc(message.id)
  //     .delete();
  //   //console.log(message);
  // };

  const clearAll = () => {
    setTo("");
    setText("");
    setId("");
  };

  const handleSend = () => {
    if (!id) {
      db.collection("messages").add({
        from: firebase.auth().currentUser.uid,
        to,
        text
      });
    } else {
      db.collection("messages")
        .doc(id)
        .update({ from: firebase.auth().currentUser.uid, to, text });
    }
    clearAll();
  };

  const handleEdit = message => {
    setId(message.id);
    setTo(message.to);
    setText(message.text);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Button title="SIGN OUT" onPress={logout} />

        {messages.map((message, i) => (
          <Message
            message={message}
            key={i}
            handleEdit={() => handleEdit(message)}
            //handleDelete={handleDelete}
          />
        ))}
      </ScrollView>
      {/* <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setFrom(text)}
        value={from}
        placeholder="From"
      /> */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setTo(text)}
        value={to}
        placeholder="To"
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Message"
      />
      <Button title="SEND" onPress={handleSend} />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

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
