import api from '../api/index';
export const ACTIONS = {
  PAPER_FETCH_PAPER: 'PAPER_FETCH_PAPER',
  PAPER_SET_CURRENT_PAGE: 'PAPER_SET_CURRENT_PAGE',
  PAPER_SET_EDIT: 'PAPER_SET_EDIT',
  PAPER_LOADING: 'PAPER_LOADING',
};

const initialState = {
  loading: false,
  paper: [],
  currentPage: 0,
  edit: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PAPER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.PAPER_FETCH_PAPER:
      return {
        ...state,
        paper: action.paper,
        loading: false,
      };
    case ACTIONS.PAPER_SET_EDIT:
      return {
        ...state,
        edit: action.edit,
      };
    case ACTIONS.PAPER_SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return { ...state };
  }
};

export const paperLoading = () => ({
  type: ACTIONS.PAPER_LOADING,
});
export const editPaper = (paper) => () => {
  return api.callApi('paper', 'put', { paper }, 'token').then(res => {
    return res;
  });
};
export const createPaper = (paper) => () => {
  return api.callApi('paper', 'post', { paper }, 'token').then(res => {
    return res;
  });
};
export const fetchPaper = () => (dispatch, getState) => {
  dispatch(paperLoading());
  // const { paper } = getState();
  api.callApi('paper', 'get').then(res => {
    dispatch(addPaper(res.data));
  });
};
export const addPaper = (paper) => ({
  type: ACTIONS.PAPER_FETCH_PAPER,
  paper,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.PAPER_SET_CURRENT_PAGE,
  page,
});
export const setEdit = (edit) => ({
  type: ACTIONS.PAPER_SET_EDIT,
  edit,
});
export const deactivePaper = (paper) => (dispatch, getState) => {
  // const { paper } = getState();
  return api.callApi('paper/deactive', 'put', { paper }, 'token').then(res => {
    return res;
  })
};
export const reactivePaper = (paper) => (dispatch, getState) => {
  // const { paper } = getState();
  return api.callApi('paper/reactive', 'put', { paper }, 'token').then(res => {
    return res;
  })
};
export const deletePaper = (paper) => (dispatch, getState) => {
  // const { paper } = getState();
  return api.callApi('paper', 'delete', { paper }, 'token').then(res => {
    return res;
  })
};
