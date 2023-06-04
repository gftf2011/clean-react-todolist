import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignInFormState = {
  emailErrorMessage: string
  passwordErrorMessage: string
}

const initialState: SignInFormState = {
  emailErrorMessage: '',
  passwordErrorMessage: '',
}

export const signInFormSlice = createSlice({
  name: "signInForm",
  initialState,
  reducers: {
    emailFieldError: (state: SignInFormState, action: PayloadAction<Omit<SignInFormState, 'passwordErrorMessage'>>) => {
      state.emailErrorMessage = action.payload.emailErrorMessage
    },
  
    passwordFieldError: (state: SignInFormState, action: PayloadAction<Omit<SignInFormState, 'emailErrorMessage'>>) => {
      state.passwordErrorMessage = action.payload.passwordErrorMessage
    },
  },
});
