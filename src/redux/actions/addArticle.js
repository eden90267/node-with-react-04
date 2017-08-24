const actions = {
  addArticle: (payload) => {
    return {
      type: 'ADD_ARTICLE',
      _id: payload._id,
      title: payload.title,
      content: payload.content,
      author: payload.author,
      avatar: payload.avatar,
      date: payload.date
    };
  }
};

export default actions