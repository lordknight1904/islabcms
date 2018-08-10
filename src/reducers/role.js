import api from '../api/index';
export const ACTIONS = {
  ROLE_FETCH_ROLE: 'ROLE_FETCH_ROLE',
  ROLE_SET_CURRENT_PAGE: 'ROLE_SET_CURRENT_PAGE',
};

const initialState = {
  role: [],
  currentPage: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ROLE_FETCH_ROLE:
      return {
        ...state,
        role: action.role,
      };
    case ACTIONS.ROLE_SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return { ...state };
  }
};

export const fetchRole = () => (dispatch) => {
  api.callApi('role', 'get').then(res => {
    dispatch(addRole(res.data));
  })
};
export const addRole = (role) => ({
  type: ACTIONS.ROLE_FETCH_ROLE,
  role,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.ROLE_SET_CURRENT_PAGE,
  page,
});
