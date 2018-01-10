FrisbeeDog (both iOS and Android)
=========================

# Introduction
FrisbeeDog is a blockchain based APIs integration tool for people control exchange account automatically sell and buy tokens. From now on, you can invest and manage more tokens with your money. There are several main functions apart from other fundraising mechanisms. First, no fiat client can be directly applied as a mean of tool. Second, trading is an unregulated area and there is no regulatory limitations set on the qualification of inverstors and parameters need to trade Bitcoin, Ethereum or other cryptocurrencies to participate in exchange. Third, due to the decentralized nature of blockchain technology, trading issue can be both entity based (centralized) and non-entity (decentralize) based. Last but not least, except involved (such as investment banks, VCs, etc) enabling direct and fast distribution of the funds to the startups.

In the furture, we helps people to decrease the risk of the each token exchange initiatives seeking to be listed in our App is computed through the historical price variance.

![formula](https://github.com/silravend/FrisbeeDog-cli/blob/master/doc/formula.jpg)

The weights of the the new cryptocurrencies are inversely correlated with the distance described above, so the currencies with more distance get less weight in the script.

![graph](https://github.com/silravend/FrisbeeDog-cli/blob/master/doc/graph.jpg)

# How to build
FrisbeeDog is based on hybrid framework produced by facebook called React Native, and used bitcoinjs-lib as blockchain toolset.

```bash
git clone https://github.com/silravend/FrisbeeDog-cli.git
cd FrisbeeDog-cli
react-native run-ios/run-android
```

### iOS
1. Add `node_modules/react-native-material-kit/iOS/RCTMaterialKit.xcodeproj` to your xcode project, usually under the `Libraries` group
2. Add `libRCTMaterialKit.a` (from `Products` under `RCTMaterialKit.xcodeproj`) to build target's `Linked Frameworks and Libraries` list
3. Go to node_modules ➜ react-native-camera and add RCTCamera.xcodeproj
4. In XCode, in the project navigator, select your project. Add libRCTCamera.a to your project's Build Phases ➜ Link Binary With Libraries
5. Click RCTCamera.xcodeproj in the project navigator and go the Build Settings tab. Make sure 'All' is toggled on (instead of 'Basic'). In the Search Paths section, look for Header Search Paths and make sure it contains both $(SRCROOT)/../../react-native/React and $(SRCROOT)/../../../React - mark both as recursive.
6. Run your project (`Cmd+R`)

### Android (or you can simplly download here [https://github.com/rnpm/rnpm](https://github.com/rnpm/rnpm))
1. JDK 7+ is required
2. Add the following snippet to your `android/settings.gradle`:
  ```gradle
  include ':RNMaterialKit'
  project(':RNMaterialKit').projectDir = file('../node_modules/react-native-material-kit/android')
  ```
3. Open up `android/app/src/main/java/[...]/MainApplication.java
  - Add `import com.lwansbrough.RCTCamera.RCTCameraPackage;` to the imports at the top of the file
  - Add `new RCTCameraPackage()` to the list returned by the `getPackages()` method. Add a comma to the previous item if there's already something there.

4. Append the following lines to `android/settings.gradle`:

	```gradle
	include ':react-native-camera'
	project(':react-native-camera').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-camera/android')
	```

5. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

	```gradle
    compile project(':react-native-camera')
	```
6. Declare the permissions in your Android Manifest (required for `video recording` feature)

  ```java
  <uses-permission android:name="android.permission.RECORD_AUDIO"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ```

# Donate
![btc](https://github.com/silravend/FrisbeeDog-cli/blob/master/doc/btc_address.jpg)
