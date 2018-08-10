import api from '../api/index';
export const ACTIONS = {
  COURSE_FETCH_COURSE: 'COURSE_FETCH_COURSE',
  COURSE_SET_CURRENT_PAGE: 'COURSE_SET_CURRENT_PAGE',
  COURSE_SET_EDIT: 'COURSE_SET_EDIT',
  COURSE_LOADING: 'COURSE_LOADING',
};

const initialState = {
  loading: false,
  course: [],
  currentPage: 0,
  edit: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.COURSE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.COURSE_FETCH_COURSE:
      return {
        ...state,
        course: action.course,
        loading: false,
      };
    case ACTIONS.COURSE_SET_EDIT:
      return {
        ...state,
        edit: action.edit,
      };
    case ACTIONS.COURSE_SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return { ...state };
  }
};

export const courseLoading = () => ({
  type: ACTIONS.COURSE_LOADING,
});
export const editCourse = (course) => () => {
  return api.callApi('course', 'put', { course }, 'token').then(res => {
    return res;
  });
};
export const createCourse = (course) => () => {
  return api.callApi('course', 'post', { course }, 'token').then(res => {
    return res;
  });
};
export const fetchCourse = () => (dispatch, getState) => {
  dispatch(courseLoading());
  // const { course } = getState();
  api.callApi('course', 'get').then(res => {
    dispatch(addCourse(res.data));
  });
};
export const addCourse = (course) => ({
  type: ACTIONS.COURSE_FETCH_COURSE,
  course,
});
export const setCurrentPage = (currentPage) => ({
  type: ACTIONS.COURSE_SET_CURRENT_PAGE,
  currentPage,
});
export const setEdit = (edit) => ({
  type: ACTIONS.COURSE_SET_EDIT,
  edit,
});
export const deactiveCourse = (course) => (dispatch, getState) => {
  // const { course } = getState();
  return api.callApi('course/deactive', 'put', { course }, 'token').then(res => {
    return res;
  })
};
export const reactiveCourse = (course) => (dispatch, getState) => {
  // const { course } = getState();
  return api.callApi('course/reactive', 'put', { course }, 'token').then(res => {
    return res;
  })
};
export const deleteCourse = (course) => (dispatch, getState) => {
  // const { course } = getState();
  return api.callApi('course', 'delete', { course }, 'token').then(res => {
    return res;
  })
};
