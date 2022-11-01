import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, COMMENT, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            console.log("Fetching Posts...")
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_POST:
            console.log("Fetching Specific Post...");
            return { ...state, post: action.payload };
        case FETCH_BY_SEARCH:
            console.log("Fetching Posts By Search...");
            return { ...state, posts: action.payload };
        case CREATE: 
            console.log("Creating Post...");
            return { ...state, posts: [ ...state.posts, action.payload] };
        case UPDATE:
            console.log("Updating Post...");
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case COMMENT:
            console.log("Adding Comment...");
            return { 
                ...state, 
                posts: state.posts.map((post) => {
                    //If post that received comment, return updated post with comment
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    //otherwise return same post
                    return post;
                })
            };
            case DELETE:
            console.log("Deleting Post...");
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        default:
            console.log("Default");
            return state;
    }
}