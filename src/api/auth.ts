import { Route, RouteRecord } from 'vue-router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserCredential } from '@firebase/auth-types';
import { User } from '@/types/user';
import { db } from '@/plugins/firebase';

export const authMiddleware = (to: Route, from: Route, next: any) => {
  const requiresAuth = to.matched.some((record: RouteRecord) => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });
  }
};

export const signUp = (email: string, password: string): Promise<UserCredential> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email: string, password: string): Promise<UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const currentUser = async (): Promise<User | null> => {
  const fireUser = firebase.auth().currentUser;
  if (!fireUser) {
    return null;
  }
  const userDoc = await db.collection('users').doc(fireUser.uid).get();
  if (!userDoc.exists) {
    return null;
  }
  const user = userDoc.data();
  const url = user ? user.avatar_image_url : '';

  return {
    id : fireUser.uid,
    email: fireUser.email,
    avatar_image_url: url,
  };
};
