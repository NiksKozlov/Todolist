import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {AppThunkDispatch} from '../app/store';
import {ResponseType} from '../api/api';


export const handleServerAppError =  <T>(data: ResponseType<T>, dispatch: AppThunkDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC( { error: data.messages[0] }))
    } else {
        dispatch(setAppErrorAC({ error: 'Some error occurred' }))
    }
    dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC({ error: error.message }))
    dispatch(setAppStatusAC({ status: 'failed' }))
}
