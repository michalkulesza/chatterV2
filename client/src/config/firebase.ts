import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBLhEbEiFtfS4yfvJmt8vk8NMYA_rorclk",
	authDomain: "chatter-ce304.firebaseapp.com",
	projectId: "chatter-ce304",
	storageBucket: "chatter-ce304.appspot.com",
	messagingSenderId: "908895086958",
	appId: "1:908895086958:web:a492e01eb894c92fe7397f",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default { storage, firebase };
