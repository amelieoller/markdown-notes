const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = "notes";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.onNoteCreated = functions.firestore
  .document("notes/{noteId}")
  .onCreate((snap, context) => {
    const note = snap.data();
    note.objectID = context.params.noteId;
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(note);
  });

exports.onNoteDeleted = functions.firestore
  .document("notes/{noteId}")
  .onDelete((snap, context) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObjects([context.params.noteId]);
  });

exports.onNoteUpdate = functions.firestore
  .document("notes/{noteId}")
  .onUpdate((change, context) => {
    const newNote = change.after.data();
    newNote.objectID = context.params.noteId;
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.partialUpdateObjects([newNote], (err, content) => {
      if (err) throw err;

      console.log(content);
    });
  });
