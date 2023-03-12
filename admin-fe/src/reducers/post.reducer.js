import { postTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const post = (state = {
    data: [], page: 1, totalpage: null
}, action) => {
    switch(action.type){
        case postTypes.SET_POST: {
            return {
                ...state, 
                data: action.data
            }
        }
        case postTypes.SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case postTypes.SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case postTypes.ADD_POST_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case postTypes.ADD_POST_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        default: return state
    }
}
export default combineReducers({
    post,
})