import GoogleTextInput from '@/components/GoogleTextInput';
import RideLayout from '@/components/RideLayout';
import { icons } from '@/constants';
import { useLocationStore } from '@/store';
import { Text, View } from 'react-native';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;
