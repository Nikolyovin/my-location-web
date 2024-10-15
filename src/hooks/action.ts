import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { appActions } from "../store/app.slice";

const actions = {
    ...appActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch) //нужно для экшенов
}