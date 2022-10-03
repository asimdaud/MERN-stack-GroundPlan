import { LOAD_XFDF, SAVE_XFDF } from '../../constants/actionTypes';
// export default (state = { isLoading: true, posts: [] }, action) => {
export default (state = { isLoading: true, xfdfs: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case LOAD_XFDF:
            return { ...state, xfdf: action.payload.xfdf };
        case SAVE_XFDF:
            return { ...state, xfdfs: [...state.xfdfs, action.payload] };


        default:
            return state;
    }
};
