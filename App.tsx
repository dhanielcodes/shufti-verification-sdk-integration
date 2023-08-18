/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NativeModules } from 'react-native';
const { ShuftiproReactNativeModule } = NativeModules;
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const authObject = {
    "auth_type": "basic_auth",
    "client_id": "xxxxx-xxxxx-xxxxx",
    "secret_key": "xxxxx-xxxxx-xxxxx"
  }

  const configObject = {
    "open_webview": false,
    "asyncRequest": false,
    "captureEnabled": false
  };

  const verificationObject =
  {
    reference: "uniqueReference",
    country: "GB",
    language: "EN",
    email: "johndoe@example.com",
    callback_url: "http://www.example.com",
    redirect_url: "http://www.example.com",
    show_consent: 1,
    show_results: 1,
    verification_mode: "image_only",
    show_privacy_policy: 1,
    face: { proof: "" },
    document: {
      supported_types: ["passport", "id_card", "driving_license", "credit_or_debit_card"],
      name: {
        first_name: "",
        last_name: "",
        middle_name: ""
      },
      dob: "",
      document_number: "",
      expiry_date: "",
      issue_date: "",
      fetch_enhanced_data: "",
      gender: "",
      backside_proof_required: "0",
    },
  };
  const openSDK = () => {
    ShuftiproReactNativeModule.verify(JSON.stringify(verificationObject), JSON.stringify(authObject), JSON.stringify(configObject), (res) => {

      const parsedResponse = JSON.parse(res); // Parse the JSON string into an object
      const event = parsedResponse.event; // Access the value of the "event" property
      console.log("Event:", event);
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title="Open SDK" onPress={openSDK} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
