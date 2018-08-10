export const ACTIONS = {
  FETCH_TITLE: 'FETCH_TITLE',
  SET_PAGE: 'SET_PAGE',
  SET_HELMET: 'SET_HELMET',
};

const initialState = {
  appName: 'CMS',
  title: 'CMS',
  page: 'store',
  description: 'description',
  admin: {
    name: '',
    token: '',
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case ACTIONS.SET_HELMET:
      return {
        ...state,
        title: action.title,
        description: action.description,
      };
    default:
      return { ...state };
  }
};

export const setHelmet = (title, description) => ({
  type: ACTIONS.SET_HELMET,
  title,
  description,
});
export const setPage = (page) => ({
  type: ACTIONS.SET_PAGE,
  page,
});
export const setTitle = () => ({
  type: ACTIONS.FETCH_TITLE,
});
export const fetchTitle = () => (dispatch, getState, api) => {
};
