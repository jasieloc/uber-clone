import { icons } from '@/constants';
import { GoogleInputProps } from '@/types/type';
import { Image, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  console.log('Initial location:', initialLocation);
  return (
    <View
      style={{ zIndex: 50, elevation: 50 }}
      className={`flex flex-row items-center justify-center relative rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        predefinedPlaces={[]}
        fetchDetails={true}
        placeholder={initialLocation ?? 'Where do you want to go?'}
        debounce={200}
        timeout={15000}
        // enablePoweredByContainer={false}
        minLength={2}
        preProcess={(text) => {
          console.log('✅ GooglePlaces query text:', text);
          return text; // let the library keep using the value
        }}
        onNotFound={() => console.log('⚠️ GooglePlaces: no matches returned')}
        onFail={(error) => console.log('❌ GooglePlaces error:', error)}
        styles={{
          container: {
            flex: 0,
            width: '100%',
            zIndex: 99,
          },
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            position: 'relative',
            shadowColor: '#d4d4d4',
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || 'white',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
            width: '100%',
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          row: {
            backgroundColor: textInputBackgroundColor || 'white',
            padding: 15,
            minHeight: 44,
          },
          separator: {
            height: 1,
            backgroundColor: '#e0e0e0',
          },
          description: {
            fontSize: 14,
          },
        }}
        keyboardShouldPersistTaps="always"
        listUnderlayColor="#e0e0e0"
        isRowScrollable={false}
        disableScroll={false}
        onPress={(data, details = null) => {
          console.log('GooglePlaces result:', { data, details });
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon || icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: 'gray',
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
