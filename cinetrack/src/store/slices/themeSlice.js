import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('ct_theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: saved },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ct_theme', state.mode);
      document.documentElement.setAttribute('data-theme', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
