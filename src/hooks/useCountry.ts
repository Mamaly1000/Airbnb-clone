import countries from "world-countries";
export type SingleCountryType = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};
const formattedCountries: SingleCountryType[] = countries.map((c) => ({
  value: c.cca2,
  label: c.name.common,
  flag: c.flag,
  latlng: c.latlng,
  region: c.region,
}));
const useCountry = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((c) => c.value === value);
  };
  return { getAll, getByValue };
};

export default useCountry;
