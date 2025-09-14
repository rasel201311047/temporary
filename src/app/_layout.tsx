import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Fonts } from '../../assets/fonts/font';
import '../../global.css';
import { usePersistentTheme } from '../hook/usePersistentTheme';


export default function RootLayout() {
  const [fontsLoader] = useFonts(Fonts);
  const { effectiveTheme } = usePersistentTheme();

  // Set status bar style based on theme
  useEffect(() => {
  }, [effectiveTheme]);

  if (!fontsLoader) {
    return null; 
  }
  
  return (
    <>
      <StatusBar style={effectiveTheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(drawer)' options={{headerShown:false}} />
      </Stack>
    </>
  );
}