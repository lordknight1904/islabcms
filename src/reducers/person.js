import api from '../api/index';
export const ACTIONS = {
  PERSON_FETCH_PERSON: 'PERSON_FETCH_PERSON',
  PERSON_SET_CURRENT_PAGE: 'PERSON_SET_CURRENT_PAGE',
  PERSON_SET_EDIT: 'PERSON_SET_EDIT',
  PERSON_LOADING: 'PERSON_LOADING',
};

const initialState = {
  loading: false,
  person: [],
  currentPage: 0,
  edit: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PERSON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.PERSON_FETCH_PERSON:
      return {
        ...state,
        person: action.person,
        loading: false,
      };
    case ACTIONS.PERSON_SET_EDIT:
      return {
        ...state,
        edit: action.edit,
      };
    case ACTIONS.PERSON_SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return { ...state };
  }
};

export const personLoading = () => ({
  type: ACTIONS.PERSON_LOADING,
});
export const editPerson = (person) => () => {
  return api.callApi('person', 'put', { person }, 'token').then(res => {
    return res;
  });
};
export const createPerson = (person) => () => {
  return api.callApi('person', 'post', { person }, 'token').then(res => {
    return res;
  });
};
export const fetchPerson = () => (dispatch, getState) => {
  dispatch(personLoading());
  // const { person } = getState();
  api.callApi('person', 'get').then(res => {
    dispatch(addPerson(res.data));
  });
};
export const addPerson = (person) => ({
  type: ACTIONS.PERSON_FETCH_PERSON,
  person,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.PERSON_SET_CURRENT_PAGE,
  page,
});
export const setEdit = (edit) => ({
  type: ACTIONS.PERSON_SET_EDIT,
  edit,
});
export const deactivePerson = (person) => (dispatch, getState) => {
  // const { person } = getState();
  return api.callApi('person/deactive', 'put', { person }, 'token').then(res => {
    return res;
  })
};
export const reactivePerson = (person) => (dispatch, getState) => {
  // const { person } = getState();
  return api.callApi('person/reactive', 'put', { person }, 'token').then(res => {
    return res;
  })
};
export const deletePerson = (person) => (dispatch, getState) => {
  // const { person } = getState();
  return api.callApi('person', 'delete', { person }, 'token').then(res => {
    return res;
  })
};
