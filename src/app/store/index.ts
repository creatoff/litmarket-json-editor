import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Row, State } from '~shared/types';

const initialState: State = {
  rows: [
    { name: 'name2', value: 'value2' },
    { name: 'name3', value: 'value3' },
    { name: 'name4', value: 'value4' },
  ],
};

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<Row>) => {
      state.rows.push(action.payload);
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows.splice(action.payload, 1);
    },
    moveRow: (
      state,
      action: PayloadAction<{ index: number; direction: 1 | -1 }>,
    ) => {
      const { index, direction } = action.payload;
      const [movedRow] = state.rows.splice(index, 1);
      state.rows.splice(index + direction, 0, movedRow);
    },
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
    },
    clearRows: (state) => {
      state.rows = [];
    },
  },
});

export const { addRow, deleteRow, moveRow, setRows, clearRows } =
  rowsSlice.actions;

const store = configureStore({
  reducer: {
    rows: rowsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
