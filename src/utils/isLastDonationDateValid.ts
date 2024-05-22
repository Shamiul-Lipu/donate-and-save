export const isLastDonationDateValid = (value: any) => {
  const today = new Date();
  const lastDonation = new Date(value);
  return lastDonation < today;
};
