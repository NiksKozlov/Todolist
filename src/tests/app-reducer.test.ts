import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';

let startState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: true
    }
})

test('error should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({ error: 'Some error' }))

    expect(endState.error).toBe('Some error')
})

test('status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({ status: 'loading' }))

    expect(endState.status).toBe('loading')
})