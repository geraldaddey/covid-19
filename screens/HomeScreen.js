import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import styled from 'styled-components';
import { homeItemsList } from './data';
import TabBarIcon from '../components/TabBarIcon';
import { NotificationContext } from '../context/Notification';
import { useMutation, gql } from '@apollo/client';
import ParentScreenHeader from '../components/ParentScreenHeader';

const situationList = [
  {
    header: '',
    content: '',
  },
  {
    header: '',
    content: '',
  },
  {
    header: '',
    content: '',
  },
];

const onboardUserMutation = gql`
  mutation(
    $otherNames: String
    $lastName: String
    $lastCountriesVisited: [String]
    $arrivalDate: Date
    $age: Int
  ) {
    onboardNewUser(
      input: {
        otherNames: $otherNames
        lastName: $lastName
        lastCountriesVisited: $lastCountriesVisited
        arrivalDate: $arrivalDate
        age: $age
      }
    ) {
      otherNames
      lastName
    }
  }
`;

const HomeScreen = ({ navigation }) => {
  const { openNotificationScreen } = useContext(NotificationContext);
  const [firstLoading, setFirstLoading] = useState(true);
  const [onboardUser] = useMutation(onboardUserMutation);

  useEffect(() => {
    async function sendDetails() {
      const syncStatus = await AsyncStorage.getItem('syncStatus');
      if (syncStatus && JSON.parse(syncStatus)) {
        setFirstLoading(false);
        return;
      }

      let personalDetails = await AsyncStorage.getItem('personalDetails');
      let travellingDetails = await AsyncStorage.getItem('travellingDetails');

      personalDetails = JSON.parse(personalDetails);
      travellingDetails = JSON.parse(travellingDetails);
      console.log(personalDetails);
      console.log(travellingDetails);

      try {
        await onboardUser({
          variables: {
            age: Number(personalDetails.age),
            otherNames: personalDetails.otherNames,
            lastName: personalDetails.surname,
            lastCountriesVisited: [travellingDetails.countryOne, travellingDetails.countryTwo],
            arrivalDate: travellingDetails.arrivalDate,
          },
        });
        setFirstLoading(false);
      } catch (e) {
        setFirstLoading(false);
      }
    }

    sendDetails();
  }, []);

  if (firstLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, marginBottom: 400, backgroundColor: '#fff' }}>
      <ParentScreenHeader title="Home" />
      <View style={{ height: 230, backgroundColor: '#ffffff' }}>
        <View>
          <View
            style={{
              marginTop: 10,
              height: 210,
            }}
          >
            <FlatList
              style={{ paddingLeft: 20 }}
              data={homeItemsList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={HomeItemCard}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={{ marginTop: 20, paddingHorizontal: 20, marginBottom: 0 }}>
          <Text style={{ fontFamily: 'bold', fontSize: 22 }}>Ghana's Situation Updates</Text>
          <Text style={{ fontFamily: 'regular' }}>
            Last Updated : {new Date().toLocaleDateString()}
          </Text>
        </View>
        <ScrollView
          style={{
            marginTop: 10,
          }}
        >
          <FlatList
            data={situationList}
            showsHorizontalScrollIndicator={false}
            renderItem={SituationItemCard}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ height: '100%' }}
          />
        </ScrollView>
      </View>
    </View>
  );
  function HomeItemCard({ item }) {
    return (
      <View style={{ paddingRight: item.key === 'death' ? 20 : 0 }}>
        <HomeItemContainer>
          <ImageBackground
            source={item.bg}
            imageStyle={{ borderRadius: 10, opacity: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000000',
              borderRadius: 10,
            }}
          >
            <View style={{ alignItems: 'space-between', paddingRight: 20, paddingTop: 10 }}>
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: 'bold',
                  color: '#ffffff',
                }}
              >
                {item.content}
              </Text>
              <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>{item.title}</Text>
            </View>
          </ImageBackground>
        </HomeItemContainer>
      </View>
    );
  }

  function SituationItemCard({ item }) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <View
          style={{ alignItems: 'flex-start', borderBottomWidth: 0.5, borderBottomColor: '#e3e3e3' }}
        >
          <Text style={{ fontFamily: 'bold', fontSize: 16, paddingBottom: 10 }}>
            Confirmed Covid-19 Cases In Ghana As At 25 March 2020, 09:00 Hr
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>
            As at the morning of 25 March 2020, a total of sixty-eight (68) cases including two (2)
            deaths have been confirmed. Sixty-six (66) of these confirmed cases are being managed in
            isolation. The sudden spike in case incidence is as a result of the mandatory quarantine
            and compulsory testing for all travelers entering Ghana, as directed by the president.
            Overall, 30 of the 68 cases have been reported in the general population with the
            remaining 38 cases among persons currently under mandatory quarantine. As of 24 March,
            total of 1,030 persons are under mandatory quarantine; samples from 863 of them have
            been tested and 38 confirmed positive. Great majority of the confirmed cases are
            Ghanaians, who returned home from affected countries. Seven (7) are of other
            nationalities namely: Norway, Lebanon, China and UK. In respect of contact tracing, a
            total of 829 contacts have been identified and are being tracked. Total of 826 contacts
            have been enlisted and being tracked. Nineteen (19) people have completed the 14 days of
            mandatory follow up.
          </Text>
        </View>
      </View>
    );
  }
};

const HomeItemContainer = styled.View`
  box-shadow: 0px 12px 5px rgba(213, 213, 213, 0.5);
  background: white;
  height: 180px;
  width: 320px;
  border-radius: 10px;
  margin: 10px 20px 10px 0px;
  align-items: center;
`;

const FloatingMenu = styled.View`
  box-shadow: 0px 10px 10px rgba(213, 213, 213, 0.5);
`;

export default HomeScreen;
