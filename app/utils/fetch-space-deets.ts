import {
  AuroraAlertResponse,
  KIndexResponse,
  DstIndexResponse,
  MagneticFieldDataResponse,
} from "~/types/spaceDeets";
import getAndParseEnvironmentVariable from "./environment-vars";
import { fetchWrapper } from "./fetchWrapper";

const baseURL = getAndParseEnvironmentVariable(process.env.BASE_SWAUS_URL!);
const kIndexUrl = `${baseURL}/get-k-index`;
const dstIndexUrl = `${baseURL}/get-dst-index`;
const auroraAlertUrl = `${baseURL}/get-aurora-alert`;
const bzUrl = getAndParseEnvironmentVariable(process.env.BZ_URL!);

const requestBody = {
  api_key: getAndParseEnvironmentVariable(process.env.SWAUS_API_KEY!),
  options: {
    location: "Australian region",
  },
};

const alertRequestBody = {
  api_key: getAndParseEnvironmentVariable(process.env.SWAUS_API_KEY!),
};

const fetchSpaceDeets = async () => {
  try {
    const [kpIndex, dstIndex, auroraAlert, magneticFieldData]: [
      KIndexResponse,
      DstIndexResponse,
      AuroraAlertResponse,
      MagneticFieldDataResponse
    ] = await Promise.all([
      fetchWrapper.post(kIndexUrl, requestBody),
      fetchWrapper.post(dstIndexUrl, requestBody),
      fetchWrapper.post(auroraAlertUrl, alertRequestBody),
      fetchWrapper.get(bzUrl),
    ]);

    const someObject = {
      KP_INDEX: kpIndex.data[0].index,
      KP_TIME: kpIndex.data[0].analysis_time,
      BZ_INDEX: magneticFieldData[0].bz_gsm,
      DST_INDEX: dstIndex.data[0][0].index,
      DST_TIME: dstIndex.data[0][0].valid_time,
      AURORA_ALERT: auroraAlert.data.length ? true : false,
    };

    console.log(magneticFieldData[0].bz_gsm);

    return someObject;
  } catch (error) {
    console.error("Error fetching space deets:", error);
    throw Error("There was an error retrieving space deets");
  }
};

export default fetchSpaceDeets;
