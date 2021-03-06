import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { BoldText, RegularText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';

const MultiSelectQuestion = ({ navigation }) => {
  StatusBar.setBarStyle('dark-content');
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingBottom: 50 }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f1f1f1',
          paddingBottom: 10,
        }}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <BoldText size="lg">Self Assessment</BoldText>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1, paddingBottom: 50, paddingTop: 20}}>
        <ImageBackground
          source={require("../../assets/images/assessmentBackground.png")}
          imageStyle={{ borderRadius: 10, opacity: 0.8 }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: "red",
            borderRadius: 10,
          }}
        >
          <View>
            <BoldText size="md">Getting Started!</BoldText>
            <RegularText>
              This tool is intended to help you understand what to do next about COVID-19.
              You’ll answer a few questions about your  symptoms, travel, and contact you’ve had with others.
            </RegularText>
          </View>
          <View style={{ marginTop: 20}}>
            <BoldText size="md">Note</BoldText>
            <RegularText>
              Recommendations provided by this tool do not constitute medical advice and
              should not be used to diagnose or treat medical conditions.
            </RegularText>
            <RegularText style={{ marginTop: 5}}>
              Let’s all look out for each other by knowing our status, trying not to infect others,
              and reserving care for those in need.
            </RegularText>
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Button>
            <RegularText style={{ color: '#fff' }}> Start Assessment . . .</RegularText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MultiSelectQuestion;
