import { Entypo } from '@expo/vector-icons';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PhoneIcon from '../../assets/icons/phone.svg';
import VideocallIcon from '../../assets/icons/videocall.svg';
import ProfileImage from '../../assets/images/profile.svg';
import { COLORS } from '../../styles/colors';
import Header from '../shared/Header';
import IconButton from '../shared/IconButton';

function ChatHeader({ name, lastMessageDate }: { name: string; lastMessageDate?: Date }) {
  const router = useRouter();
  const activeNow = lastMessageDate ? differenceInMinutes(new Date(), lastMessageDate) < 5 : false;

  return (
    <Header>
      <View style={styles.containerLeft}>
        <IconButton variant="transparent" onPress={() => router.back()}>
          <Entypo name="chevron-left" size={32} />
        </IconButton>
        <ProfileImage style={styles.headerImage} />
        <View style={styles.headerText}>
          <Text style={styles.headerName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.headerActive} numberOfLines={1}>
            {lastMessageDate ? (activeNow ? 'Active now' : `Active ${formatDistanceToNow(lastMessageDate)} ago`) : ''}
          </Text>
        </View>
      </View>
      <View style={styles.headerIcons}>
        <IconButton>
          <PhoneIcon />
        </IconButton>
        <IconButton>
          <VideocallIcon />
        </IconButton>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: -12,
    flex: 1,
  },
  headerImage: {
    width: 44,
    height: 44,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  headerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.plum['500'],
  },
  headerActive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.white,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 2,
  },
});

export default ChatHeader;
