FrisbeeDog (both iOS and Android)
=========================

# Introduction
FrisbeeDog is a blockchain based APIs integration tool for people control exchange account automatically sell and buy tokens. There are several main functions apart from other fundraising mechanisms. First, no fiat client can be directly applied as a mean of tool. Second, trading is an unregulated area and there is no regulatory limitations set on the qualification of inverstors and parameters need to trade Bitcoin, Ethereum or other cryptocurrencies to participate in exchange. Third, due to the decentralized nature of blockchain technology, trading issue can be both entity based (centralized) and non-entity (decentralize) based. Last but not least, except involved (such as investment banks, VCs, etc) enabling direct and fast distribution of the funds to the startups.

The risk of the each token exchange initiatives seeking to be listed in our App is computed through the historical price variance.

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

##iOS
1. Add `node_modules/react-native-material-kit/iOS/RCTMaterialKit.xcodeproj` to your xcode project, usually under the `Libraries` group
2. Add `libRCTMaterialKit.a` (from `Products` under `RCTMaterialKit.xcodeproj`) to build target's `Linked Frameworks and Libraries` list
	compile project(':react-native-code-push')
    compile project(':react-native-camera')
    compile project(':react-native-device-info')
    compile project(':react-native-material-kit')
    compile project(':react-native-orientation')
    compile project(':lottie-react-native')

##Android (or you can simplly download [here](https://github.com/rnpm/rnpm)
1. JDK 7+ is required
2. Add the following snippet to your `android/settings.gradle`:
  ```gradle
  include ':RNMaterialKit'
  project(':RNMaterialKit').projectDir = file('../node_modules/react-native-material-kit/android')

