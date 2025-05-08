import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IError, IRegistrationError, IUser, IUserForm} from "../../types";
import {isAxiosError} from "axios";

export const registration = createAsyncThunk<
    IUser,
    IUserForm,
    { rejectValue: IRegistrationError | IError }
>(
    "users/registration",
    async (newUser, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.post("users", newUser);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const authentication = createAsyncThunk<
    IUser,
    IUserForm,
    { rejectValue: IError }
>(
    "users/authentication",
    async (user, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.post("users/sessions", user);
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const logout = createAsyncThunk<void, void>(
    "users/logout",
    async () => {
        await axiosAPI.delete("users/sessions");
    }
)