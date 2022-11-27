import {setErrorAC, setStatusAC} from '../app/app-reducer';
import {AppThunkDispatch} from '../app/store';
import {ResponseType} from '../api/todolists-api';

export const handleServerNetworkError = (error: {message: string}, dispatch: AppThunkDispatch) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}

export const handleServerAppError =  <T>(data: ResponseType<T>, dispatch: AppThunkDispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}