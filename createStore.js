import { createStore , bindActionCreators, combineReducers } from "redux";

function todoReducer(state=[], action){
    if(action.type == 'add_todo'){
        const todoText = action.payload.todoText;
        return[
            ...state,
            {text: todoText , isFinished: false , id: (state.length == 0)? 1 : state[state.length - 1].id +1}
        ]
    }else if(action.type == 'delete_todo'){
        const todoId = action.payload.todoId;
        return state.filter(t => t.id != todoId);
    }else if(action.type == 'edit_todo'){
        const todo = action.payload.todo;
        const todoText = action.payload.todoText;
        return state.map(t => {
            if(t.id == todo.id){
                t.text = todoText;
            }
            return t;
        })
    }
    return state;
}

function userReducer(state=[] , action){
    if(action.type == 'add_user'){
        const userName = action.payload.userName;
        return[
            ...state,
            {name: userName, id: (state.length == 0) ? 1 : state[state.length -1 ].id +1}
        ]
    }
    return state
}
// action objects -> action methods (action creator)
const addTodo = (todoText) => ({type: 'add_todo' , payload: {todoText}});
const deleteTodo = (id) => ({type: 'delete_todo' , payload: {todoId: id}})
const addUser = (name) => ({type: 'add_user', payload:{userName: name}})
const reducer = combineReducers({todo: todoReducer , users: userReducer})
const {dispatch , subscribe , getState , replaceReducer} = createStore(reducer);

subscribe(() => console.log(getState()));

const {action} = bindActionCreators({addTodo , deleteTodo , addUser}, dispatch);

action.addTodo('Todo 1');
action.addUser('Rohan');
action.addTodo('Todo 2');
// console.log(getState());

action.deleteTodo(1);