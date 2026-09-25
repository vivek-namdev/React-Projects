const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",

    initialState,

    reducers: {
        addTodo : (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },
        
        
    },
})

export const {addTodo} = todoSlice.actions;

export default todoSlice.reducer;