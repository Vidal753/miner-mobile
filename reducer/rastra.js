const initialState = {
  rastras: [],
  supplier_rasta: [],
};

export const SET_RASTRAS = 'set_rastras';

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RASTRAS:
      return {
        ...state,
        rastras: action.payload,
      };
    default:
      return state;
  }
}
