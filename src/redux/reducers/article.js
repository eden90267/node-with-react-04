export function article(state=[], action) {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return [...state, {
        _id: action._id,
        title: action.title,
        content: action.content,
        author: action.author,
        PostDate: action.date,
        avatar: action.avatar
      }];
    default:
      return state;
  }
}