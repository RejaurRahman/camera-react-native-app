# Getting Started with React Native App

A feature-rich Camera App that harnesses the power of the React Native Vision Camera library to capture photos, record videos and even scan QR codes seamlessly.

Project Features:
- Animated splash screen
- Implementing Photo Capture Functionality
- Photo Preview and Customization Options
- Storing and Displaying Captured Photos
- Adding Video Recording Features
- Integrating QR Code Scanning
- Customizing Camera UI and Controls
- Integrate analytics using Vexo.co

## Expo Setup

The project is run through [Expo](https://github.com/expo/expo).

```
npx create-expo-app@latest reactnativedemo -t
```

When choosing the template choose -> Blank (TypeScript)

To start the project run:

```
npm start OR npm start -- --clear OR npm start -- --reset-cache
```

Scan the QR Code on the Expo Go app. You may not click on the retry icon if there is an issue.

## EAS Setup

[https://expo.dev/login](https://expo.dev/login)

Add the credentials. Avoid clicking on the Login button.

Install EAS Cli and run login command with credentials for EAS Expo Dev account:

```
npm install -g eas-cli
npx eas login
```

Install development buold on an Android emulator with .apk:

```
npx eas build --profile development --platform android
```

It will then give you instructions:

- Do you want EAS CLI to install expo-dev-client for you? - yes
- Would you like to automatically create an EAS project for {@USER/PROJECT NAME}? - yes
- What would you like your Android application id to be? - com.{USER}.{PROJECT NAME}
- Generate a new Android Keystore? - yes

After 5 - 10 minutes it will create an .apk file in the Expo.dev account.

When the build completes and it will give you a download button which will allow you to download the .apk and install on your mobile.

Start local development server with:

```
npx expo start --dev-client
```

## New Deployment

Once a new commit is released on Github.

You need to run the following command in the terminal:

```
npx expo start --dev-client
```

Go on [https://expo.dev/](https://expo.dev/) select the project and then click on the build link card.

Click on the install blue button. It will ask you scan the QR Code which you need to scan on Expo Go App on your phone.

It will ask you install build artifact on your phone. You will need to download the file. Once downloaded it will ask you install your application on the phone.

Enter the Metro link in the terminal manually:

```
exp+camera-react-native://expo-development-client/?url={LOCALHOST IP ADDRESS}
```

## Useful Links

[Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)
[Expo Router Manual Installation](https://docs.expo.dev/router/installation/#manual-installation)
[Fonts](https://docs.expo.dev/develop/user-interface/fonts/)
[Reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
[Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
[Vexo Analytics](https://docs.vexo.co/)
[Vision Camera](https://react-native-vision-camera.com/docs/guides)
