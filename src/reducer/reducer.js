export const initialState = {
  userInfo: {},
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        userInfo: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
