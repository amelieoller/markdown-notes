const titleText = 'Create a new note...';

const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: titleText,
        },
      ],
    },
  ],
};

export const initialNote = {
  title: '',
  content: initialContent,
  textContent: titleText,
  tagIds: [],
  noteLinkIds: [],
  language: 'code',
};
