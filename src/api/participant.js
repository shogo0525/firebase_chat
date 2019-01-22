import { db } from '@/plugins/firebase';
import { User } from '@/types/user';

export const fetchParticipants = async (roomId) => {
  const participants = [];
  const querySnapshot = await db.collection('participants').where('room_id', '==', roomId).get();
  querySnapshot.forEach((doc) => {
    const uid = doc.data().user_id;
    db.collection('users').doc(uid).get().then((userDoc) => {
      const user = userDoc.data();
      participants.push({
        id: uid,
        email: null,
        avatar_image_url: user ? user.avatar_image_url : '',
      });
    });
  });
  return participants;
};
