import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём tests
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type ThunkDispatchActionType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchActionType>()

//Это для того, чтобы не писать каждый раз в useSelector первом параметре тип стейта
//export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// а это, чтобы можно было в консоли браузера обращаться к tests в любой момент
// @ts-ignore
window.store = store