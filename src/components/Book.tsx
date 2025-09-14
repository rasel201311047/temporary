// components/Book.tsx
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Genesis from '../../assets/Data/Genesis.json';
import { plusicon, soundicon } from '../../assets/icons/icons';
import { useVerseActions } from '../hook/useVerseActions';
import { Colors } from '../utils/colors';
import responsive from '../utils/responsive';
import VerseActionsModal from './VerseActionsModal';

type BookProps = {
  themeMode: string;
  onPlayAudio: (verseIndex: number) => void;
};

export default function Book({ themeMode, onPlayAudio }: BookProps) {
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const { getHighlightColor, highlights } = useVerseActions();
  const [localHighlights, setLocalHighlights] = useState<Record<string, string>>({});
const [activeVerse, setActiveVerse] = useState<number | null>(null);

const soundplusfn = (verseId: number) => {
  setActiveVerse(verseId);
};

  const verses = Genesis.verses;
  const book = "Genesis";
  const chapter = 1;

  // Update local highlights when the global highlights change
  useEffect(() => {
    const highlightsMap: Record<string, string> = {};
    highlights.forEach(highlight => {
      highlightsMap[highlight.id] = highlight.color;
    });
    setLocalHighlights(highlightsMap);
  }, [highlights]);

  const togglePopup = (verse: any) => {
    setSelectedVerse(verse);
    setShowActionsModal(true);
  };

  const handlePlayAudio = (verseIndex: number) => {
    onPlayAudio(verseIndex);
    setSelectedVerse(null);
  };

  const handleCloseModal = () => {
    setShowActionsModal(false);
    setSelectedVerse(null);
  };

  return (
    <View className='flex-1'>
      <ScrollView className="flex-1 p-4 bg-primary-light dark:bg-primary-dark">
        {verses.map((item, index) => {
          const highlightId = `${book}-${chapter}-${item.verse}`;
          const highlightColor = localHighlights[highlightId] || getHighlightColor(highlightId);
          const verseStyle = highlightColor ? { backgroundColor: highlightColor + '40' } : {};

          return (
            <View key={item.verse} className="flex-row mb-4">
              {index === 0 ? (
                // First verse
                <>
                  <Text className="text-6xl font-RobotoMidium text-tertiary-light dark:text-tertiary-dark leading-none ">
                    {item.verse}
                  </Text>
                  <Pressable onPress={() => soundplusfn(item.verse)}  className="flex-1">
                    <Text style={verseStyle} className="text-justify text-lg text-primary-dark dark:text-primary-light font-RobotoMidium leading-relaxed p-1 rounded" >
                      {item.text}
                    </Text>
                    <View className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 flex-row justify-between ${ activeVerse === item.verse ? "" : "hidden" }`}>
                      <Pressable onPress={() => togglePopup(item)} style={{ width: responsive.scale(16), height: responsive.verticalScale(16) }} className='flex-row items-center justify-center dark:bg-primary-light bg-primary-dark rounded-full' >
                        <SvgXml xml={plusicon} width={responsive.scale(9.33)} height={responsive.verticalScale(9.33)} color={themeMode === 'light' ? Colors.white : Colors.black} />
                      </Pressable>
                      <Pressable onPress={() => handlePlayAudio(index)} style={{ width: responsive.scale(16), height: responsive.verticalScale(16) }} className='flex-row items-center justify-center dark:bg-primary-light bg-primary-dark rounded-full' >
                        <SvgXml xml={soundicon} width={responsive.scale(11.84)} height={responsive.verticalScale(9.33)} color={themeMode === 'light' ? Colors.white : Colors.black} />
                      </Pressable>
                    </View>
                  </Pressable>
                </>
              ) : (
                // Other verses
                <Pressable onPress={() => soundplusfn(item.verse)}  className='relative flex-1'>
                  <Text style={verseStyle} className="text-justify text-lg text-primary-dark dark:text-primary-light font-RobotoMidium leading-relaxed p-1 rounded" >
                    <Text className="font-RobotoBold text-tertiary-light dark:text-tertiary-dark ">{`${item.verse} `}</Text>
                    {item.text}
                  </Text>
                  <View className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 flex-row justify-between ${ activeVerse === item.verse ? "" : "hidden" }`}>
                    <Pressable onPress={() => togglePopup(item)} style={{ width: responsive.scale(16), height: responsive.verticalScale(16) }} className='flex-row items-center justify-center dark:bg-primary-light bg-primary-dark rounded-full' >
                      <SvgXml xml={plusicon} width={responsive.scale(9.33)} height={responsive.verticalScale(9.33)} color={themeMode === 'light' ? Colors.white : Colors.black} />
                    </Pressable>
                    <Pressable onPress={() => handlePlayAudio(index)} style={{ width: responsive.scale(16), height: responsive.verticalScale(16) }} className='flex-row items-center justify-center dark:bg-primary-light bg-primary-dark rounded-full' >
                      <SvgXml xml={soundicon} width={responsive.scale(11.84)} height={responsive.verticalScale(9.33)} color={themeMode === 'light' ? Colors.white : Colors.black} />
                    </Pressable>
                  </View>
                </Pressable>
              )}
            </View>
          );
        })}
        <View className='h-32'></View>
      </ScrollView>
      {/* modal highlight */}

      {selectedVerse && (
        <VerseActionsModal
          visible={showActionsModal}
          onClose={handleCloseModal}
          themeMode={themeMode}
          verse={selectedVerse}
          book={book}
          chapter={chapter}
        />
      )}
    </View>
  );
}