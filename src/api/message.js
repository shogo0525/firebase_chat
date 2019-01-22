import * as firebase from 'firebase/app';
import { db } from '@/plugins/firebase';
import m from 'moment';

const timestamp2String = (ts) => {
  return ts ? m(ts.toDate()).format('YYYY/MM/DD HH:mm:ss') : '';
};

export const addEventHandlers = (added, modified, removed) => {
  db.collection('messages')
  .onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    if (!changes) {
      return;
    }
    changes.forEach((change) => {
      if (change.type === 'added') {
        const message = {
          room_id: change.doc.data().room_id,
          sender_id: change.doc.data().sender_id,
          content: change.doc.data().content,
          created_at: timestamp2String(change.doc.data().created_at),
        };
        added(message);
      }
      if (change.type === 'modified') {
        // TODO
      }
      if (change.type === 'removed') {
        // TODO
      }
    });
  });
};

export const fetchMessages = async (roomId) => {
  const querySnapshot = await db.collection('messages').orderBy('created_at').get();
  const messages = [];
  querySnapshot.forEach((doc) => {
    messages.push({
      room_id: roomId,
      sender_id: doc.data().sender_id,
      content: doc.data().content,
      created_at: timestamp2String(doc.data().created_at),
    });
  });
  return messages;
};

export const addMessage = (message)=> {
  db.collection('messages').add({ ...message, created_at: firebase.firestore.Timestamp.now() });
};

export default {
  addEventHandlers,
  fetchMessages,
  addMessage,
};
