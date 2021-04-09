import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuidv4';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import ThreadItem from './ThreadItem';
import TypingIndicator from './TypingIndicator';
import dynamicStyles from './styles';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import SearchTerm from './SearchTerm';
import {Button, Input} from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard';
import { firebase } from '../../firebase/config';
import { useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

const channelsRef = firebase.firestore().collection('channels');


function MessageThread(props) {
  const {
    thread,
    user,
    onChatMediaPress,
    appStyles,
    onSenderProfilePicturePress,
    onMessageLongPress,
    channelItem,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const currentUser = useSelector((state) => state.auth.user);
  const [isParticipantTyping, setIsParticipantTyping] = useState(false);
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [counter, setCounter] = useState(1);
  const [topSearchTerm, setTopSearchTerm] = useState({});
  // const [search, setSearch] = useState([]);  //*this is for pearl necklaces

  //This function allows people to vote
  const vote = (term, type, termId) => {
    if(counter <= 2){
      channelsRef
      .doc(channelItem?.id)
      .collection('searchTerms')
      .doc('EQB4yyLKRBwBuEZawHUC') //NEED TO FIND THE TERM ID!!!! '5i8RvZRnoUWpFUoOhOWz' - BEDS FOR TESTROOM 3 'EQB4yyLKRBwBuEZawHUC' JANES ROOM
      .update({
        votes:
        type === 'plus'
        ? firebase.firestore.FieldValue.increment(1)
        : firebase.firestore.FieldValue.increment(-1),
      })
      .then((res) => {
        console.log('updated');
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log('error is', err);
      });
    } else {
      alert('You can only vote two times!');
    }
  } 


  //This function adds a term to our chat room collection 
  const addTerm = () => {
    channelsRef
    .doc(channelItem?.id)
    .collection('searchTerms')
    .add({
      term: searchTerm,
      votes: 0,
    })
    .then((res) => {
      setSearchTerm('');
      alert('Added');
      console.log(searchTerm);
    })
    .catch((err) => {
      setSearchTerm('');
      alert('Something went wrong')
    })
  };

  // TEST3 CHANNELID "f92b8cad-a74e-47ab-a63a-3b728b965808" ... NEED TO FIND CHANNELID!!
  // JANES ROOM CHANNELID "21e42db1-d0c8-4185-ab76-63d9a8f025a8"
  //This will render our searchTerms, and add things to the page automatically
  useEffect(() => {
    const test = firebase.firestore().collection('channels').doc("21e42db1-d0c8-4185-ab76-63d9a8f025a8").collection('searchTerms');
    return test.onSnapshot(querySnapshot => {
      const list =[];
      querySnapshot.forEach(doc => {
        const {term, votes} = doc.data();
        list.push({
          id: doc.id,
          term,
          votes,
        })
      })
      setTerms(list);
      console.log(list);
    })
  }, [])

  //This is to set the highest vote, there may be a better/efficient way to do it but this is all I got so far
  useEffect(() => {
    const test = firebase.firestore().collection('channels').doc("21e42db1-d0c8-4185-ab76-63d9a8f025a8").collection('searchTerms');
    return test.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        let highest = 0;
        const data = doc.data();
        const currentTermVotes = data.votes;
        if (currentTermVotes > highest){
          highest = currentTermVotes;
          setTopSearchTerm(data);
          console.log(data);
        }
      })
    })
  }, [])


  useEffect(() => {
    if (channelItem?.typingUsers) { 
      getUsersTyping();
    }
  }, [channelItem]);

  //PEARL NECKLACES 
  // useEffect(() => {
  //   axios.get("https://us-central1-nodeapi-a29c4.cloudfunctions.net/doSeach")
  //   .then(response => setSearch(response.data))
  //   let items = Array.apply(null,Array(60)).map((v,i)=>{
  //     return{
  //       id: i,
  //       src: 'http://placehold.it/200x200?text=' + (i + 1)
  //     }
  //   })
  // }, []);

  const getUsersTyping = () => {
    const userID = user.id || user.userID;
    const typingUsers = channelItem.typingUsers?.filter(
      (typingUser) => typingUser.isTyping && typingUser.userID !== userID,
    );

    if (typingUsers?.length > 0) {
      setIsParticipantTyping(true);
    } else {
      setIsParticipantTyping(false);
    }
  };

  const renderListHeaderComponent = () => {
    return (
      isParticipantTyping && (
        <View style={[styles.receiveItemContainer]}>
          <View style={styles.indicatorContainer}>
            <View style={styles.typingIndicatorContainer}>
              <TypingIndicator
                containerStyle={styles.indicatorDotContainer}
                dotRadius={5}
              />
            </View>
            <View style={styles.typingIndicatorContentSupport} />
            <View style={styles.typingIndicatorSupport} />
          </View>
        </View>
      )
    );
  };


  const renderTerm = ({item, index}) => {
    return <SearchTerm item={item} method = {vote} />;
  };
  const renderChatItem = ({ item, index }) => {
    const isRecentItem = 0 === index;
    return (
      <ThreadItem
        item={item}
        key={'chatitem' + item.createdAt + item.senderID}
        user={{ ...user, userID: user.id }}
        appStyles={appStyles}
        onChatMediaPress={onChatMediaPress}
        onSenderProfilePicturePress={onSenderProfilePicturePress}
        onMessageLongPress={onMessageLongPress}
        isRecentItem={isRecentItem}
      />
    );
  };

  return (
    <View>
      <View>
          <>
            <Input
              value={searchTerm}
              placeholder="Propose search term"
              onChangeText={(text) => setSearchTerm(text)}
            />
            <Button
              title="Propose"
              style={{
                width: 300,
                alignSelf: 'center'
              }}
              onPress={addTerm}
            />
          </>
      </View>
      <>
          <Text
            style={{
              marginTop: '3%',
              marginBottom: '3%',
              alignSelf: 'center',
            }}>
            Proposed terms
          </Text>
          <FlatList
            keyExtractor={(item) => item.term}
            data={terms}
            renderItem={renderTerm}
          />
          <Leaderboard data={terms} sortBy="votes" labelBy="term" />
        </>
       {/* <View style = {styles.shop}>
      <Text style = {styles.header}>Pearl Necklaces</Text>
      <FlatList
        data={search}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}>
            <Image
              style={styles.imageThumbnail}
              source={{uri:`${item.thumbnail}`}}
            />
            <Text>
            </Text>
           <Text style = {styles.itemPrice}>{item.price}</Text> 
           <Text style = {styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
      </View>  */}

    <View style = {styles.flatList}>
    <FlatList
      inverted={true}
      vertical={true}
      style={styles.messageThreadContainer}
      showsVerticalScrollIndicator={false}
      data={thread}
      renderItem={renderChatItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.messageContentThreadContainer}
      removeClippedSubviews={true}
      ListHeaderComponent={() => renderListHeaderComponent()}
      keyboardShouldPersistTaps={'never'}
    />
    </View>
    </View>
  );
}

MessageThread.propTypes = {
  thread: PropTypes.array,
  user: PropTypes.object,
  onChatMediaPress: PropTypes.func,
};

export default MessageThread;
