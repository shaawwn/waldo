import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs, getDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-D4EF6PxogSmqvxZd1KnzTojry7ca3E0",
    authDomain: "where-s-waldo-5a7ec.firebaseapp.com",
    projectId: "where-s-waldo-5a7ec",
    storageBucket: "where-s-waldo-5a7ec.appspot.com",
    messagingSenderId: "932560901255",
    appId: "1:932560901255:web:25f3461dea2b9a56ff9422"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getData() {
    // get game objects from firestore database, returns promise
    const promiseData = {}
    const gameData = {}
    const querySnapshot = await getDocs(collection(db, "gameObjects"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.data()["title"])
        promiseData[doc.data()['title']] = doc.data()
    })
    // return await getDocs(collection(db, "gameObjects")).data()
    return promiseData
    // return gameData
}

function getDataFromPromise(promise) {
    // get the data from a promise so I don't have to deal with this bs
    let gameData = {}
    promise.then(
        data => {
            gameData = data
        }
    )

    return gameData
}

async function getObject(title) {
    // get object data using gameImage title
    const docRef = doc(db, "gameObjects", title);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return await docSnap.data()
    } else {
        console.log("No such game data")
    }
}



function testLinks() {
    console.log("Loading correctly for fb data")
}

  export { testLinks, getData, getObject }
