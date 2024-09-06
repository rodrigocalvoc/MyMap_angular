import { CountryInput } from "src/app/dashboard/pages/models/countriesInput.model";


export interface User {
  _id:      string;
  email:    string;
  name:     string;
  isActive: boolean;
  roles:    string[];
  countries: CountryInput[];
}
