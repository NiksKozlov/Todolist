import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


