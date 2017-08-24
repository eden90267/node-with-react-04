const actions = {
  pause: payload => ({type: 'WAITING_TRUE'}),
  resume: payload => ({type: 'WAITING_FALSE'}),
};

export default actions;