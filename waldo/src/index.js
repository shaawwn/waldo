import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RouteSwitch from './RouteSwitch'



// firebase
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-D4EF6PxogSmqvxZd1KnzTojry7ca3E0",
  authDomain: "where-s-waldo-5a7ec.firebaseapp.com",
  projectId: "where-s-waldo-5a7ec",
  storageBucket: "where-s-waldo-5a7ec.appspot.com",
  messagingSenderId: "932560901255",
  appId: "1:932560901255:web:25f3461dea2b9a56ff9422"
};

async function addObject(gameObject, title) {
  // console.log(gameObject, title.toString())
  const gameTitle = title.toString()
  const gameObjects = collection(db, "gameObjects")
  await setDoc(doc(gameObjects, gameTitle), {
    title: gameTitle,
    image: gameObject.image,
    characters: gameObject.characters,
    topScores: gameObject.topScores
  })
}

async function updateDoc(title, field, data) {
  // data - data to be updated in doc
  // title = title of data object to update
  // field in object to update
  // const objectToUpdate = getObject(title)
  const objectToUpdate = doc(db, "gameObjects", title)
  await updateDoc(objectToUpdate, {
    field: data
  })
}

async function getData() {
  // get game objects from firestoreDB
  // const q = query(collection(db, "gameObjects"));
  const gameData = {}
  const querySnapshot = await getDocs(collection(db, "gameObjects"))
  querySnapshot.forEach((doc) => {
    // console.log(doc.data(), doc.data()['title'])
    gameData[doc.data()['title']] = doc.data()
  })
  // console.log(gameData)
  return gameData // returns promise
}

async function getObject(title) {
  const docRef = doc(db, "gameObjects", title)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return await docSnap.data()
  } else {
    console.log("Document does not exist.")
  }
}

// const gameData = require('./__mocks__/gamedata.json');
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const gameData = getData()
let gameObject = {}
// getObject("Postcard").then(
//   data => {
//     // console.log(data)
//     gameObject["topScores"] = data['topScores']
//     gameObject["title"] = data["title"]
//     gameObject["image"] = data["image"]
//     gameObject["characters"] = data["characters"]
//   }
// )

// console.log("Game object", gameObject)
// getData();
// Script for adding objects to Firestore DB
// console.log("Loading app", gameData)
// Object.keys(gameData).forEach(object => {
//   console.log(gameData[object])
//   addObject(gameData[object], object)
// })
// add to firestore
// Stack overflow for server-side click locations
// https://stackoverflow.com/questions/34867066/javascript-mouse-click-coordinates-for-image
ReactDOM.render(
  <React.StrictMode>
    <App gameData={gameData} dataFunctions={updateDoc} updateData={updateDoc} firebaseDependencies={[app, db]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

