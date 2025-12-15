import CustomButton from './CustomButton';

const Payment = () => {
  const openPaymentSheet = () => {};
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
