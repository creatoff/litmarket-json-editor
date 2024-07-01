import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Close, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { deleteRow, moveRow, setRows, RootState } from '~app/store';
import type { Columns } from '~shared/types';

import classes from './table-editor.module.scss';

export function TableEditor() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.rows.rows);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editingColumn, setEditingColumnType] = useState<Columns | null>(null);
  const [inputText, setInputText] = useState('');

  const handleDeleteRow = (index: number) => {
    dispatch(deleteRow(index));
  };

  const handleMoveRow = (index: number, direction: 1 | -1) => {
    dispatch(moveRow({ index, direction }));
  };

  const handleEditCell = (index: number, columnType: Columns, text: string) => {
    setEditingRowIndex(index);
    setEditingColumnType(columnType);
    setInputText(text);
  };

  const handleSaveCell = () => {
    if (editingRowIndex === null) return;
    if (editingColumn === null) return;

    const updatedRows = [...rows];
    updatedRows[editingRowIndex] = {
      ...updatedRows[editingRowIndex],
      [editingColumn]: inputText,
    };
    dispatch(setRows(updatedRows));

    setEditingRowIndex(null);
    setEditingColumnType(null);
    setInputText('');
  };

  if (rows.length === 0) {
    return (
      <div className={classes.alert}>
        The table is empty. Please add some rows.
      </div>
    );
  }

  return (
    <div className={classes.table}>
      <div className={classes.th}>Name</div>
      <div className={classes.th}>Value</div>
      <div className={classes.th}></div>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {['name', 'value'].map((columnType) => (
            <div key={`${index}${columnType}`} className={classes.td}>
              <div className={classes.cell}>
                {editingRowIndex === index && editingColumn === columnType ? (
                  <>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <button
                      className={classes.edit}
                      onClick={() => handleSaveCell()}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {row[columnType as keyof typeof row]}
                    <button
                      className={classes.edit}
                      onClick={() =>
                        handleEditCell(
                          index,
                          columnType as keyof typeof row,
                          row[columnType as keyof typeof row],
                        )
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className={classes.td}>
            <div className={classes.actions}>
              <div className={classes.move}>
                <button
                  className={classes.move__button}
                  onClick={() => handleMoveRow(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowUpward fontSize="inherit" />
                </button>
                <button
                  disabled={index === rows.length - 1}
                  onClick={() => handleMoveRow(index, 1)}
                  className={classes.move__button}
                >
                  <ArrowDownward fontSize="inherit" />
                </button>
              </div>
              <button
                className={classes.delete}
                onClick={() => handleDeleteRow(index)}
              >
                <Close />
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
