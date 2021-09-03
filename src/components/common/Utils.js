import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const Uuid = () => {
  return uuidv4();
};

export const FormatDate = (timestamp) => {
  return moment(timestamp).format("DD-MM-YYYY");
};
