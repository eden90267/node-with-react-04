let getId = 1;

export function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: ++getId,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(item => {
        if (item.id !== action.id) {
          return item;
        }
        return {...item, completed: !item.completed};
      });
    default:
      return state;
  }
}