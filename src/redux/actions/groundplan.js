import {
    START_LOADING, END_LOADING,  
     LOAD_XFDF, SAVE_XFDF

  } from '../../constants/actionTypes';
  import * as api from '../../api/index.js';
  
  export const loadXfdf = (_id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.loadXfdf(_id);
  
      dispatch({ type: LOAD_XFDF, payload: { xfdf: data } });
  
      // console.log("in redux/actions/groundplan.js/loadxfdf");
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  // export const getXfdfs = (page) => async (dispatch) => {
  //   try {
  //     dispatch({ type: START_LOADING });
  //     const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
  //     dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
  //     dispatch({ type: END_LOADING });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  


//   documentId, annotationId, xfdfString
  export const saveXfdf = (dataXfdf, docId) => async (dispatch) => {
    try {
      
      dispatch({ type: START_LOADING });
      // console.log("in redux/actions/groundplan.js/savexfdf trying");
      const { data } = await api.saveXfdf(dataXfdf);
      // console.log("in redux/actions/groundplan.js/savexfdf");
      // console.log(data);
  
      dispatch({ type: SAVE_XFDF, payload: data });
      dispatch({ type: END_LOADING });
    //   dispatch({ type: SAVE_XFDF, payload: { documentId, annotationId, xfdfString }});
    //   history(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

