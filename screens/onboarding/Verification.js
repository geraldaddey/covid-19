import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { BoldText, RegularText } from '../../components/Typography';
import { useMutation } from '@apollo/client';
import { validateLoginMutation } from '../../graphql/mutations';
import { showMessage } from 'react-native-flash-message';
import { saveAuthToken } from '../../utils';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Button from '../../components/FormInput/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SVGIcon from '../../components/SVGIcon';
import { backIcon } from '../../assets/icons';

function VerifyScreen({ navigation, route }) {
  StatusBar.setBarStyle('dark-content');
  const phone = route.params?.phone;
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);

  async function validateLoginMember() {
    setLoading(true);
    setTimeout(async () => {
      if (otp !== '1234') {
        alert('Invalid Pin');
        setLoading(false);
        return;
      } else {
        await saveAuthToken('mushud31242342342');
        navigation.navigate('Home');
        setLoading(false);
      }
    }, 3000);
  }

  // const [validateLoginMember, { loading }] = useMutation(validateLoginMutation, {
  //   onError: () => {
  //     console.log('An error occurred');
  //     showMessage({
  //       type: 'warning',
  //       message: 'You entered an incorrect PIN',
  //       description:
  //         'Please check the pin sent to you to verify and try again. If you have not received the pin, tap the resend option or verify your phone number to be sure its correct',
  //     });
  //   },
  //   onCompleted: async (data) => {
  //     if (!data) {
  //       showMessage({
  //         backgroundColor: Colors.tintColor,
  //         textStyle: { fontFamily: 'regular' },
  //         duration: 3000,
  //         position: 'bottom',
  //         message: 'You entered an incorrect PIN',
  //         description:
  //           'Please check the pin sent to you to verify and try again. If you have not received the pin, tap the resend option or verify your phone number to be sure its correct',
  //       });
  //       return;
  //     }
  //     // console.log('token', data.validateLoginUser.mobileToken);
  //     await saveAuthToken(data.validateLoginUser.mobileToken);
  //     navigation.navigate('InformationScreen');
  //   },
  // });
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            marginTop: 50,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SVGIcon source={backIcon} width={20} />
          <RegularText>Change phone</RegularText>
        </View>
      </TouchableOpacity>
      <View style={{ paddingTop: Layout.window.height / 4, alignItems: 'center' }}>
        <BoldText
          size="md"
          style={{
            paddingHorizontal: 50,
            textAlign: 'center',
          }}
        >
          Verification PIN
        </BoldText>
      </View>

      <View style={[{ marginTop: 20, paddingHorizontal: 50 }]}>
        <RegularText style={{ textAlign: 'center' }}>
          Enter the verification code {'\n'} we just sent you on {'\n'} {phone}
        </RegularText>

        <View style={{ marginTop: 50 }}>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.tintColor,
              textAlign: 'center',
              paddingBottom: 10,
            }}
            keyboardType="numeric"
            onChangeText={(text) => setOTP(text)}
            value={otp}
            caret="#ffffff"
            enablesReturnKeyAutomatically
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={onPressSubmit}>
            <Button
              style={{
                borderColor: Colors.tintColor,
                borderWidth: 1,
                backgroundColor: 'green',
              }}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <RegularText style={{ color: '#fff' }}>Submit code</RegularText>
              )}
            </Button>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <RegularText>Have not received your code?</RegularText>
        </View>
        <View style={{ justifyContent: 'center', marginTop: 10, flexDirection: 'row' }}>
          <RegularText>Resend Code</RegularText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );

  async function onPressSubmit() {
    await validateLoginMember();
  }
}

export default VerifyScreen;
