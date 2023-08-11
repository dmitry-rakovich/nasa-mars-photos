import { useFonts } from 'expo-font';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Select from './components/Select';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Dosis-Regular': require('./assets/fonts/Dosis-Regular.ttf'),
    'Dosis-SemiBold': require('./assets/fonts/Dosis-SemiBold.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Select />
      <ImageBackground source={require('./assets/mars-rover.png')} style={{ flex: 0.5, transform: [{ scale: 1.2 }, { rotate: '-3deg' }, { translateX: -30 }] }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
    backgroundColor: 'rgba(220, 206, 190, 1)',
  },
});
