import qs from "qs";
import axios from "axios";

const baseURL = "https://content.jsenyitko.tech"; // CHANGE

const cmsClient = axios.create({
  baseURL,
});

// Take the url and return the full path
export const getStrapiUrl = (path: string = "") => `${baseURL}${path}`;

// Take a subdirectory and return the full path
export const getStrapiMediaUrl = (file: File) => getStrapiUrl(file.data.attributes.url);

// Fetch data from Strapi
export const fetchStrapiAPI = async (path: string, urlParams: any = {}, options: any = {}) => {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const queryString = qs.stringify(urlParams);
  const url = `${getStrapiUrl(`/api${path}`)}${queryString ? `?${queryString}` : ""}`;

  return cmsClient.get(url, mergedOptions);
};

/*
  GET /api/terms-of-service

  Response Body:
    - data:
      - id: string
      - attributes:
        - title: string
        - content: string
        - createdAt: string
        - updatedAt: string
*/
const getTermsOfService = async (): Promise<TermsOfServiceCMSResponse> => {
  return fetchStrapiAPI("/terms-of-service");
};

/*
  GET /api/privacy-policy

  Response Body:
    - data:
      - id: string
      - attributes:
        - title: string
        - content: string
        - createdAt: string
        - updatedAt: string
*/
const getPrivacyPolicy = async (): Promise<PrivacyPolicyCMSResponse> => {
  return fetchStrapiAPI("/privacy-policy");
};

/*
  GET /api/about

  Response Body:
    - data:
      - id: string
      - attributes:
        - title: string
        - content: string
        - createdAt: string
        - updatedAt: string
*/
const getAbout = async (): Promise<AboutCMSResponse> => {
  return fetchStrapiAPI("/about");
};

export default {
  getTermsOfService,
  getPrivacyPolicy,
  getAbout,
};
