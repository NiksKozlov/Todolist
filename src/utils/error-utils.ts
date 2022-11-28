import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {AppThunkDispatch} from '../app/store';
import {ResponseType} from '../api/todolists-api';


export const handleServerAppError =  <T>(data: ResponseType<T>, dispatch: AppThunkDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
