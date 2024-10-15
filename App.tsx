import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-redux';
import Footer from './src/components/Footer';
import Header from './src/components/Header';
import Main from './src/components/Main'
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <Main />
        <Footer />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
