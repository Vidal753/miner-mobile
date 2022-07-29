const initialState = {
  rastras: [],
  supplier_rasta: [],
  reservation: [],
  notification: [],
};

export const SET_RASTRAS = 'set_rastras';
export const SET_RESERVATION = 'set_reservation';

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RASTRAS:
      return {
        ...state,
        rastras: action.payload,
      };
    case SET_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
      };
    default:
      return state;
  }
}
