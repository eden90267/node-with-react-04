const actions = {

  addTodo: (text) => {
    return ({
      type: 'ADD_TODO',
      text
    });
  },

  toggleTodo: (id) => {
    return ({
      type: 'TOGGLE_TODO',
      id
    });
  },

  asyncAction: () => {
    return (dispatch, getState) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/ajax');
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          console.log(xhttp.responseText);
          dispatch(actions.addTodo(xhttp.responseText));
        }
      };
      xhttp.send();
    };
  }

};

export default actions;