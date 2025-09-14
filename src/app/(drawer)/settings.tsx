import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { backarrow, dropdownicon, world } from '../../../assets/icons/icons';
import { usePersistentTheme } from "../../hook/usePersistentTheme";
import { Colors } from "../../utils/colors";
import responsive from "../../utils/responsive";
const settings = () => {
    const { themeMode } = usePersistentTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Language');
    const [fontSize, setFontSize] = useState(16);

    const customLanguages = [
        'Dutch', 'German', 'Bengali', 'Swahili', 'Mandarin Chinese',
        'English', 'Spanish', 'Hindi', 'Arabic', 'French',
        'Portuguese', 'Japanese', 'Russian'
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectLanguage = (language) => {
        setSelectedLanguage(language);
        setIsDropdownOpen(false);
    };


    //font renger
    const CustomMarker = () => (
        <View className="w-4 h-4 bg-[#606060] dark:bg-[#F5F5F5] rounded-full shadow-md" />
    );

    const handleFontChange = (values) => {
        setFontSize(values[0]);
    };

    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-black'>
            <View className="w-full">
                <View style={{ height: responsive.verticalScale(64), width: responsive.scale(335) }} className="mx-auto flex-row justify-between items-center" >
                    <TouchableOpacity onPress={router.back} >
                        <SvgXml xml={backarrow} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-2">
                        <Text className="font-RobotoMidium text-2xl text-secondary-light dark:text-secondary-dark">
                            Setting
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>

                {/* contain of setting */}
                <View style={{ width: responsive.scale(335) }} className="mx-auto">
                    {/* Language Selector Button */}
                    <Pressable style={{ width: responsive.scale(220), height: responsive.verticalScale(48) }} className="flex-row items-center justify-center gap-2 border border-primary-dark dark:border-primary-light rounded-lg relative"
                        onPress={toggleDropdown} >
                        <SvgXml xml={world} width={responsive.scale(20)} height={responsive.verticalScale(20)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
                        <Text className="text-lg font-Roboto text-primary-dark dark:text-primary-light">
                            {selectedLanguage}
                        </Text>
                        <SvgXml xml={dropdownicon} width={responsive.scale(13.31)} height={responsive.verticalScale(7.67)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} style={{ transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] }} />
                    </Pressable>

                    <View className="flex-row justify-between  items-center py-8">
                        <Text className="font-Roboto text-lg text-primary-dark dark:text-primary-light">Font </Text>
                        <Text className="font-Roboto text-lg text-primary-dark dark:text-primary-light">sans</Text>
                    </View>

                    <View className="flex-row justify-between  items-center pb-4">
                        <Text className="font-Roboto text-lg text-primary-dark dark:text-primary-light">Font </Text>
                        <Text className="font-Roboto text-lg text-primary-dark dark:text-primary-light">{fontSize}</Text>
                    </View>

                    {/* Font renger */}
                    <View className='flex-row  items-center mx-auto'>
                        <MultiSlider
                            values={[fontSize]}
                            sliderLength={responsive.scale(268)}
                            onValuesChange={handleFontChange}
                            min={8}
                            max={54}
                            step={1}
                            allowOverlap={false}
                            snapped
                            customMarker={CustomMarker}
                            selectedStyle={{
                                backgroundColor: themeMode === 'light' ? '#ACACAC' : '#D9D9D9'
                            }}
                            unselectedStyle={{
                                backgroundColor: themeMode === 'light' ? '#D9D9D9' : '#ACACAC'
                            }}
                            trackStyle={{ height: 3, width: "100%" }}
                        />
                    </View>



                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <View style={{ width: responsive.scale(220), maxHeight: responsive.verticalScale(200), marginTop: responsive.verticalScale(5) }} className="absolute top-[40%] z-10" >
                            <ScrollView className="flex-1 " showsVerticalScrollIndicator={true} >
                                {customLanguages.map((language, index) => (
                                    <Pressable key={index} onPress={() => selectLanguage(language)}
                                        style={{ width: responsive.scale(220), height: responsive.verticalScale(48) }} className="flex-row items-center justify-center gap-2 border border-primary-dark dark:border-primary-light rounded-lg mb-2">
                                        <SvgXml xml={world} width={responsive.scale(20)} height={responsive.verticalScale(20)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
                                        <Text className={`text-lg font-Roboto text-primary-dark dark:text-primary-light`} >
                                            {language}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

            </View>

        </SafeAreaView>
    )
}

export default settings