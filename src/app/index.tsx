import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import Genesis from '../../assets/Data/Genesis.json';
import { book, bookmark, daynight, doctrine, downarrow, highlight, law, menu, notes, plan, search, setting } from '../../assets/icons/icons';
import { Images } from '../../assets/images/images';
import AudioPlayer from "../components/AudioPlayer";
import Book from "../components/Book";
import { usePersistentTheme } from '../hook/usePersistentTheme';
import { Colors } from "../utils/colors";
import responsive from "../utils/responsive";

//audio

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const slideNavber = useRef(new Animated.Value(-responsive.scale(290))).current;
  const { themeMode, effectiveTheme, toggleTheme, setTheme, isLoaded } = usePersistentTheme();
  const [isDarkMode, setIsDarkMode] = useState(themeMode === 'dark');
  const [audioVisible, setAudioVisible] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const opendownSlideAudioBar = (verseIndex) => {
    setCurrentVerseIndex(verseIndex);
    setAudioVisible(true);
  };

  const closedownSlideAudioBar = () => {
    setAudioVisible(false);
  };

  //--------------dower
  const openDowerNav = () => {
    setIsOpen(true);
    Animated.timing(slideNavber, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  const closeDowerNav = () => {
    Animated.timing(slideNavber, {
      toValue: -responsive.scale(290),
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsOpen(false));
  };

  const handleThemeChange = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      setTheme(newMode ? 'dark' : 'light');
      closeDowerNav();
      return newMode;
    })

  };

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <Text className="text-gray-800 dark:text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 relative">
        {/* header */}
        <View className="w-full">
          <View style={{ height: responsive.verticalScale(64), width: responsive.scale(335) }} className="mx-auto flex-row justify-between items-center" >
            <TouchableOpacity onPress={openDowerNav}>
              <SvgXml xml={menu} width={responsive.scale(24)} height={responsive.verticalScale(24)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push('/searchchapter')} className="flex-row items-center gap-2">
              <Text className="font-RobotoMidium text-2xl text-secondary-light dark:text-secondary-dark">
                Genesis 1
              </Text>
              <SvgXml xml={downarrow} width={responsive.scale(13.31)} height={responsive.verticalScale(7.67)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push('/searchbuttonwork')}>
              <SvgXml xml={search} width={responsive.scale(17.78)} height={responsive.verticalScale(17.78)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
            </TouchableOpacity>
          </View>
        </View>

        {/* main content */}
        <View style={{ width: responsive.scale(330) }} className="flex-1 mx-auto">
          <Book themeMode={themeMode} onPlayAudio={opendownSlideAudioBar} />
        </View>

        {/* logo footer */}
        <View style={{ height: responsive.verticalScale(48) }} className="w-full flex justify-center " >
          <Image source={effectiveTheme === 'dark' ? Images.navdark : Images.navlight} style={{ width: responsive.scale(52), height: responsive.verticalScale(40) }} className="mx-auto" />
        </View>
        {audioVisible && (
          <AudioPlayer verses={Genesis.verses}
            themeMode={themeMode}
            initialVerseIndex={currentVerseIndex}
            onClose={closedownSlideAudioBar}
          />
        )}
        {/* Overlay */}
        {isOpen && (
          <TouchableOpacity activeOpacity={1} onPress={closeDowerNav} className="absolute inset-0 bg-black/30" />
        )}

        {/* Drawer */}
        <Animated.View style={{ width: responsive.scale(290), transform: [{ translateX: slideNavber }], }} className="absolute top-0 bottom-0 left-0 bg-primary-light dark:bg-primary-dark shadow-lg " >
          <ScrollView>
            <View style={{ width: responsive.scale(290), height: responsive.verticalScale(151) }}>
              <Image source={themeMode === 'light' ? Images.lightlogo : Images.darklogo} className="h-full w-full" resizeMode="contain" />

            </View>

            {/* Light Theme Option */}
            <TouchableOpacity className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={book} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Bible</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { router.push('/doctrine'); closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={doctrine} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Doctrine</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { router.push('/laws'); closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={law} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Laws</Text>
            </TouchableOpacity>

            <TouchableOpacity className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={plan} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Reading Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{router.push('/bookmarks'); closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={bookmark} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Bookmarks</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{router.push('/notes'), closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={notes} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{router.push('/highlights'); closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={highlight} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Highlights</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{router.push('/settings'); closeDowerNav() }} className=" flex-row items-center gap-[4.26%] border-b border-secondary-light dark:border-secondary-dark px-[4%] py-4 ">
              <SvgXml xml={setting} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Settings/Backup</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleThemeChange} className=" flex-row items-center gap-[4.26%] px-[4%] py-4 ">
              <SvgXml xml={daynight} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
              <Text className="font-RobotoMidium text-secondary-light dark:text-secondary-dark text-lg">Day/Night</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}