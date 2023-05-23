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

import { addDoc, collection, deleteDoc, doc,  onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from './firebase.js';
import { getDownloadURL } from './storage';

const RECEIPTS_COLLECTION = "receipts";

export function addReceipt(uid:string, date:Date, locationName:string, address:string, items:any, amount:number, imageBucket:string){
    addDoc(collection(db, RECEIPTS_COLLECTION), {
        uid,
        date,
        locationName,
        address,
        items,
        amount,
        imageBucket
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export async function getReceipts(uid:string, setReceipts:any,setIsLoadingReceipts:any){
    const q = query(collection(db, RECEIPTS_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
    // const querySnapshot = await getDocs(q);

    return onSnapshot(q, (querySnapshot) => {
        const allReceipts:any[] = [];
        for (const documentSnapshot of querySnapshot.docs){
            const receipt = documentSnapshot.data();
            allReceipts.push({
                ...receipt,
                date: receipt['date'].toDate(),
                id: documentSnapshot.id,
                imageUrl:  getDownloadURL(receipt['imageBucket']),
            })
        }
        setReceipts(allReceipts);
        setIsLoadingReceipts(false);
    });
}

export function updateReceipt(docId:string,uid:string, date:Date, locationName:string, address:string, items:any, amount:number, imageBucket:string){
    setDoc(doc(db, RECEIPTS_COLLECTION, docId), {
        uid,
        date,
        locationName,
        address,
        items,
        amount,
        imageBucket,
    }, {merge: true}).then(() => {
        console.log(`Document ${uid} successfully written!`);
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

export function deleteReceipt(docId:string){
    deleteDoc(doc(db, RECEIPTS_COLLECTION, docId)).then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
}