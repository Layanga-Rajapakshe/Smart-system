import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    addParameterToCategory: (state, action) => {
      const { categoryId, parameter } = action.payload;
      const category = state.find((cat) => cat._id === categoryId);
      if (category) {
        category.parameters.push(parameter);
      }
    },
    updateParameterInCategory: (state, action) => {
      const { categoryId, parameterId, updatedParameter } = action.payload;
      const category = state.find((cat) => cat._id === categoryId);
      if (category) {
        const parameterIndex = category.parameters.findIndex(
          (param) => param._id === parameterId
        );
        if (parameterIndex > -1) {
          category.parameters[parameterIndex] = updatedParameter;
        }
      }
    },
    deleteCategory: (state, action) => {
      return state.filter((category) => category._id !== action.payload);
    },
    deleteParameterFromCategory: (state, action) => {
      const { categoryId, parameterId } = action.payload;
      const category = state.find((cat) => cat._id === categoryId);
      if (category) {
        category.parameters = category.parameters.filter(
          (param) => param._id !== parameterId
        );
      }
    },
  },
});

export const {
  setCategories,
  addCategory,
  addParameterToCategory,
  updateParameterInCategory,
  deleteCategory,
  deleteParameterFromCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
