export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genders = ['male', 'female'];
export const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

export const gendersOptions = genders.map((item) => ({
  value: item,
  label: item,
}));
export const bloodGroupsOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));
