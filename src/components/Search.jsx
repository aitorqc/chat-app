import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {

    const handleSearch = async () => {
      setUser(null);
      const q = query(collection(db, "users"), where("displayName", "==", username));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
      } catch (err) {
        setErr(true);
      }
    }

    handleSearch();
  }, [username]);

  const handleSelect = async () => {
    //check whether the group (chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create userChat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (error) {

    }

    setUser(null)
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='find a user' value={username}
          onChange={(e) => setUserName(e.target.value)} />
      </div>
      {err && <span>User not found!</span>}
      {user &&
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="/" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}
