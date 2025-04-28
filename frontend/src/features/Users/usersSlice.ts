import {IError, IRegistrationError, IUser} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {authentication, registration} from "./userThunks.ts";
import {RootState} from "../../app/store.ts";

interface userState {
    user: IUser | null;
    registrationLoading: boolean;
    registrationErrors: IRegistrationError | IError | null;
    authenticationLoading: boolean;
    authenticationErrors: boolean;
}

const initialState: userState = {
    user: null,
    registrationLoading: false,
    registrationErrors: null,
    authenticationLoading: false,
    authenticationErrors: false,
}

export const selectUser = (state: RootState) => state.users.user;
export const selectRegistrationErrors = (state: RootState) => state.users.registrationErrors;
export const selectAuthenticationErrors = (state: RootState) => state.users.registrationErrors;
export const selectRegistrationLoading = (state: RootState) => state.users.registrationLoading;
export const selectAuthenticationLoading = (state: RootState) => state.users.authenticationLoading;

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.registrationLoading = true;
                state.registrationErrors = null;
            })
            .addCase(registration.fulfilled, (state, {payload: user}) => {
                state.registrationLoading = false;
                state.registrationErrors = null;
                state.user = user;
            })
            .addCase(registration.rejected, (state, {payload: error}) => {
                state.registrationLoading = false;
                state.registrationErrors = error || null;
                console.log(error)
            })

            .addCase(authentication.pending, (state) => {
                state.authenticationLoading = true;
                state.authenticationErrors = false;
            })
            .addCase(authentication.fulfilled, (state, {payload}) => {
                state.authenticationLoading = false;
                state.authenticationErrors = false;
                state.user = payload;
            })
            .addCase(authentication.rejected, (state) => {
                state.authenticationLoading = false;
                state.authenticationErrors = true;
            })
    }
});

export const userReducer = usersSlice.reducer;
export const {logout} = usersSlice.actions;