import { Images } from "@/assets/images/images";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import DoctrineData from '../../../assets/Data/DoctrineData.json';
import { backarrow, search } from '../../../assets/icons/icons';
import { usePersistentTheme } from "../../hook/usePersistentTheme";
import { Colors } from "../../utils/colors";
import responsive from "../../utils/responsive";

export default function doctrine() {
    const { themeMode, effectiveTheme, toggleTheme, setTheme, isLoaded } = usePersistentTheme();
    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-black'>
            <View className='flex-1'>
                <View className="w-full">
                    <View style={{ height: responsive.verticalScale(64), width: responsive.scale(335) }} className="mx-auto flex-row justify-between items-center" >
                        <TouchableOpacity onPress={router.back} >
                            <SvgXml xml={backarrow} width={responsive.scale(16)} height={responsive.verticalScale(16)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center gap-2">
                            <Text className="font-RobotoMidium text-2xl text-secondary-light dark:text-secondary-dark">
                                Doctrine
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity>
                            <SvgXml xml={search} width={responsive.scale(17.78)} height={responsive.verticalScale(17.78)} color={themeMode === 'light' ? Colors.primaryLight : Colors.primaryDark} />
                        </TouchableOpacity>
                    </View>


                </View>
                {/* main contain */}
                <View style={{ width: responsive.scale(330) }} className="flex-1 mx-auto">
                    <ScrollView className="py-4">
                        <Text className="text-xl text-primary-dark dark:text-primary-light font-RobotoSemiBold pb-4">THE PURPOSE-SORAH  DOCTRINE </Text>
                        <Text className="text-lg text-primary-dark dark:text-primary-light font-RobotoSemiBold">Israelite Starter Pack For Holy Living </Text>
                        <Text className="text-lg text-primary-dark dark:text-primary-light font-RobotoSemiBold">To Rise Again As One United Nation,  And To Claim Your Inheritance—The Kingdom  Of The Power: </Text>
                        <View>

                            {/* data   */}
                            {DoctrineData.map((section, i) => (
                                <View key={i} style={{ marginBottom: 20 }}>
                                    <Text className="font-RobotoMidium text-lg text-primary-dark dark:text-primary-light">
                                        {section.section}
                                    </Text>

                                    {section.items.map((item, j) => {
                                        if (typeof item === "string") {
                                            return (
                                                <View key={j} className="flex-row items-start ml-[4.2%]">
                                                    <Text className="text-primary-dark dark:text-primary-light text-2xl">{"\u2022"} </Text>
                                                    <Text className="font-RobotoMidium text-base text-primary-dark dark:text-primary-light">
                                                        {item}
                                                    </Text>
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <View key={j} className="ml-[4.2%]">
                                                    <View className="flex-row items-start ">
                                                        <Text className="text-primary-dark dark:text-primary-light text-2xl">{"\u2022"} </Text>
                                                        <Text className="font-RobotoMidium text-base text-primary-dark dark:text-primary-light">
                                                            {item.title}
                                                        </Text>
                                                    </View>


                                                    {item.subitems.map((sub, k) => (
                                                        <View key={k} className="flex-row items-start ">
                                                            <Text className="text-primary-dark dark:text-primary-light text-2xl">{"\u25E6"} </Text>
                                                            <Text className="font-Roboto text-base text-primary-dark dark:text-primary-light">
                                                                {sub}
                                                            </Text>
                                                        </View>

                                                    ))}
                                                </View>
                                            );
                                        }
                                    })}
                                </View>
                            ))}


                        </View>
                        <View className="h-28"></View>
                    </ScrollView>

                </View>

                {/* logo footer */}
                <View style={{ height: responsive.verticalScale(48) }} className="w-full flex justify-center " >
                    <Image source={effectiveTheme === 'dark' ? Images.navdark : Images.navlight} style={{ width: responsive.scale(52), height: responsive.verticalScale(40) }} className="mx-auto" />
                </View>

            </View>

        </SafeAreaView>
    )
}