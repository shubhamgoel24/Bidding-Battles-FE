import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_CONFIG } from "@constants/envConstants";

const {
    fbApiKey,
    fbAuthDomain,
    fbProjectId,
    fbStorageBucket,
    fbMessagingSenderId,
    fbAppId,
    fbMeasurementId,
} = FIREBASE_CONFIG;

const firebaseConfig = {
    apiKey: fbApiKey,
    authDomain: fbAuthDomain,
    projectId: fbProjectId,
    storageBucket: fbStorageBucket,
    messagingSenderId: fbMessagingSenderId,
    appId: fbAppId,
    measurementId: fbMeasurementId,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
