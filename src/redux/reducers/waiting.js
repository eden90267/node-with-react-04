export function waiting(state = '', action) {
  switch (action.type) {
    case 'WAITING_TRUE':
      return waiting = true;
    case 'WAITING_FALSE':
      return waiting = false;
    default:
      return state;
  }
}