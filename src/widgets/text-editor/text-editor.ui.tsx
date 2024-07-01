import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRows, clearRows, RootState } from '~app/store';
import { Button } from '~shared/ui/button';

import classes from './text-editor.module.scss';

export function TextEditor() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.rows.rows);
  const [json, setJson] = useState(JSON.stringify(rows, null, 2));
  const [error, setError] = useState<Error | null>(null);

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJson(event.target.value);
  };

  const handleSave = () => {
    setJson(JSON.stringify(rows, null, 2));
    setError(null);
  };

  const handleLoad = () => {
    try {
      const newRows = JSON.parse(json);
      dispatch(setRows(newRows));
      setError(null);
    } catch (e) {
      setError(e as Error);
    }
  };

  const handleClear = () => {
    dispatch(clearRows());
    setJson('[]');
  };

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleLoad}>Load</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      {error && <div className={classes.error}>{error.message}</div>}
      <div className={classes.textarea}>
        <textarea
          className={classes.textarea__input}
          rows={5}
          value={json}
          onChange={handleJsonChange}
        />
      </div>
    </div>
  );
}
