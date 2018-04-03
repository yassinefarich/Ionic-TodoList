// Firebase settings

// AF2 Settings
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDCVtCiTEb2wB-hkzbe9ofisTypLIbz7m0",
  authDomain: "todolist-6374b.firebaseapp.com",
  databaseURL: "https://todolist-6374b.firebaseio.com",
  projectId: "todolist-6374b",
  storageBucket: "todolist-6374b.appspot.com",
  messagingSenderId: "143451751699"
};

export const NATIVE_AUTH_OPTION = {
  'webClientId': '143451751699-i0l7oqlottrluaaol7cdqudbcb531m12.apps.googleusercontent.com',
  'offline': false
};

//Google geocoding API
export const GOOGLE_GEOCODING_API_URL: string = 'https://maps.googleapis.com/maps/api/geocode/json?' +
  'latlng={latitude},{longitude}&key={api_key}';

export const GOOGLE_MAP_IMAGE_API_URL : string ='https://maps.googleapis.com/maps/api/staticmap?' +
  'center={latitude},{longitude}&zoom=15&size=400x400&markers=color:red%7Clabel:MaPosition%7C{latitude},{longitude}&key={api_key}'

export const GOOGLE_GEOCODING_API_KEY: string = 'AIzaSyBSu61z8TeJ6PQHbZM1aMyHVdBYGSc1Dg4';
