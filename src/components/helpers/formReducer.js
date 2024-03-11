const formReducer = (state, action) => {
  if (action.type === 'UPDATE_FIELD') {
    return {
      ...state,
      [action.field]: action.value,
    };
  }

  if (action.type === 'RESET_FORM') {
    return {
      name: '',
    };
  }
  return state;
};

export default formReducer;
