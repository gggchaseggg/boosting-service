import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReduxUserTypes = {
    nickname: string | undefined;
};

const initialState: ReduxUserTypes = {
    nickname: undefined,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(
            state,
            action: PayloadAction<ReduxUserTypes>
        ) { state.nickname = action.payload.nickname; },
        dropUser(state) { Object.assign(state, initialState); }
    },
});

export const { setUser, dropUser } = userSlice.actions;

export default userSlice.reducer;