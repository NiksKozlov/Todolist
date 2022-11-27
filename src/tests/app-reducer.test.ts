import {appReducer, InitialStateType, setErrorAC, setStatusAC} from '../app/app-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('error should be set', () => {
    const endState = appReducer(startState, setErrorAC('Some error'))

    expect(endState.error).toBe('Some error')
})

test('status should be set', () => {
    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})