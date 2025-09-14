import { Images } from "@/assets/images/images";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { backarrow, search } from '../../../assets/icons/icons';
import { usePersistentTheme } from "../../hook/usePersistentTheme";
import { Colors } from "../../utils/colors";
import responsive from "../../utils/responsive";
export default function laws() {
  const { themeMode, effectiveTheme, toggleTheme, setTheme, isLoaded } = usePersistentTheme();

  const lawData = [
    { list: 'I Am [YAHWAH] Thy Power, Who Brought Thee Out Of Egypt. (Exodus 20:2)  ' },
    { list: 'Thou Shalt Have No Other Powers Before Me. (Exodus 20:3)  ' },
    { list: '[YAHWAH] Our Power Is One Master. (Deuteronomy 6:4)' },
    { list: 'Love [YAHWAH] Thy Power With All Thy Heart, Soul, And Might. (Deuteronomy 6:5) ' },
    { list: 'Fear [YAHWAH] Thy Power, Serve Him, And Cleave To Him. (Deuteronomy 10:20)  ' },
    { list: 'Be Holy, For I [YAHWAH] Am Holy. (Leviticus 22:32) ' },
    { list: 'Do Not Profane My Holy Name. (Leviticus 22:32) ' },
    { list: 'Do Not Destroy Anything Connected To My Name. (Deuteronomy 12:8)' },
    { list: 'Hearken Onto The Prophet Whom [YAHWAH] Thy Power Shall Raise Up. (Deuteronomy  18:15) ' },
    { list: 'Do Not Test [YAHWAH] Thy Power. (Deuteronomy 6:16)' },
    { list: 'Keep [YAHWAH]s Commandments And Walk In His Ways. (Deuteronomy 28:9) ' },
    { list: 'Fear [YAHWAH] And Cleave To Him. (Deuteronomy 10:20)' },
    { list: 'Love Thy Neighbor As Thyself. (Leviticus 19:18)' },
    { list: 'Love Ye Therefore The Stranger: For Ye Were Strangers In The Land Of Egypt.  (Deuteronomy 10:19)' },
    { list: 'Thou Shalt Not Hate Thy Brother In Thine Heart. (Leviticus 19:17)' },
    { list: 'Thou Shalt In Any Wise Rebuke Thy Neighbour, And Not Suffer Sin Upon Him. (Leviticus  19:17)' },
    { list: 'Thou Shalt Neither Vex A Stranger, Nor Oppress Him: For Ye Were Strangers In The Land  Of Egypt. (Exodus 22:21) ' },
    { list: 'Thou Shalt Not Go Up And Down As A Talebearer Among Thy People. (Leviticus 19:16)  ' },
    { list: 'Thou Shalt Not Avenge, Nor Bear Any Grudge Against The Children Of Thy People.  (Leviticus 19:18) ' },
    { list: 'And There Shall Cleave Nought Of The Cursed Thing To Thine Hand. (Deuteronomy  13:17) ' },
    { list: 'Stand Up In The Presence Of The Elderly, And Show Respect For The Aged. Fear Your  Power. I Am [YAHWAH]. (Leviticus 19:32)' },
    { list: 'Turn Ye Not Unto Idols, Nor Make To Yourselves Molten Powers. (Leviticus 19:4)' },
  ]

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
                Laws
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
            <Text className="text-2xl text-primary-dark dark:text-primary-light font-RobotoSemiBold pb-4">THE PURPOSE-SORAH  LAWS </Text>
            <Text className="text-lg text-primary-dark dark:text-primary-light font-RobotoSemiBold">The Thahnahk: A Compendium</Text>
            <Text className="text-lg text-secondary-light dark:text-secondary-dark font-RobotoMidium pb-4 ">Comprehensive List Of The Laws </Text>
            <View>
              {lawData.map((itm, indx) => (
                <View key={indx} className="flex-row items-center ">
                  <Text className="font-Roboto text-base text-primary-dark dark:text-primary-light">
                   {indx + 1}. {itm.list}
                  </Text>
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