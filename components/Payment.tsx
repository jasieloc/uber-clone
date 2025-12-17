import { fetchAPI } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { PaymentProps } from '@/types/type';
import { useAuth } from '@clerk/clerk-expo';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import CustomButton from './CustomButton';

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { userId } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationAddress,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();

  /**
   * Validates that all required fields for ride creation are present.
   * Returns an error message if validation fails, or null if all fields are valid.
   */
  const validateRideRequirements = (): string | null => {
    if (!userId) {
      return 'User is not authenticated. Please sign in to continue.';
    }
    if (!userAddress || userLatitude == null || userLongitude == null) {
      return 'Pickup location is missing. Please select a valid pickup address.';
    }
    if (
      !destinationAddress ||
      destinationLatitude == null ||
      destinationLongitude == null
    ) {
      return 'Destination is missing. Please select a valid destination address.';
    }
    return null;
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: async (paymentMethod, intentCreationCallback) => {
          // Re-validate before API call to protect against race conditions
          const validationError = validateRideRequirements();
          if (validationError) {
            Alert.alert('Ride Error', validationError);
            // Abort the confirm flow by not calling intentCreationCallback
            return;
          }

          const { paymentIntent, customer } = await fetchAPI(
            '/(api)/(stripe)/create',
            {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                name: fullName || email.split('@')[0],
                email: email,
                amount: amount,
                paymentMethodId: paymentMethod.id,
              }),
            }
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI('/(api)/(stripe)/pay', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
              }),
            });
            if (result.client_secret) {
              await fetchAPI('/(api)/ride/create', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  origin_address: userAddress,
                  origin_longitude: userLongitude,
                  origin_latitude: userLatitude,
                  destination_address: destinationAddress,
                  destination_longitude: destinationLongitude,
                  destination_latitude: destinationLatitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: Number.parseInt(amount) * 100,
                  payment_status: 'paid',
                  driver_id: driverId,
                  user_id: userId,
                }),
              });
              intentCreationCallback({
                clientSecret: result.client_secret,
              });
            }
          }
        },
      },
      returnURL: 'uberclone://book-ride',
    });

    if (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    // Validate required fields before initializing payment
    const validationError = validateRideRequirements();
    if (validationError) {
      Alert.alert('Cannot Proceed', validationError);
      return;
    }

    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
