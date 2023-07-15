export const calculateAge =  birthdate => {
  const birthYear = new Date(birthdate).getFullYear();
  const now = new Date();
  const currentYear = now.getFullYear();
  const age = currentYear - birthYear;
  const birthdateThisYear = new Date(currentYear, now.getMonth(), now.getDate()) >= new Date(birthdate);
  return birthdateThisYear ? age : age - 1;
}