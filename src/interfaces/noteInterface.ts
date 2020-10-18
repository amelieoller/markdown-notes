import { FirestoreTimestamp } from './firebaseInterface';

export interface Note {
  updated: FirestoreTimestamp;
  created: FirestoreTimestamp;
}

export interface NoteDates {
  updated: FirestoreTimestamp;
  created: FirestoreTimestamp;
}
