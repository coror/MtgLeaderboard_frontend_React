import Parse from 'parse';

const PARSE_APPLICATION_ID = import.meta.env
  .VITE_REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = import.meta.env.VITE_REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = import.meta.env
  .VITE_REACT_APP_PARSE_JAVASCRIPT_KEY;
const parseInitialization = Parse.initialize(
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);
Parse.serverURL = PARSE_HOST_URL
const parseUrl = Parse.serverURL

export { parseInitialization, parseUrl };
