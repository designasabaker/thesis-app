/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// safe to share the config to clients
const firebaseConfig = {
    apiKey: "AIzaSyB8xCaJhFyDHaLYf0UphBtiv00Oaw2SyVQ",
    authDomain: "expense-tracker-babdb.firebaseapp.com",
    projectId: "expense-tracker-babdb",
    storageBucket: "expense-tracker-babdb.appspot.com",
    messagingSenderId: "172186855265",
    appId: "1:172186855265:web:50fbc182c3cf57f91e0720",
    measurementId: "G-J505T9SBVZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
// const analytics = getAnalytics(app);