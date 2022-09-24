export const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_X_FIELD":
      return { ...state, x_field: action.payload };

    case "CHANGE_Y_FIELD":
      return { ...state, y_field: action.payload };

    case "CHANGE_SIZE_FIELD":
      return { ...state, size_field: action.payload };

    default:
      return state;
  }
};
