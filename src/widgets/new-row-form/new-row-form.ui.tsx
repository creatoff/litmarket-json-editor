import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRow } from '~app/store';
import { Button } from '~shared/ui/button';

import classes from './new-row-form.module.scss';

export function NewRowForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleAddRow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addRow({ name, value }));
    setName('');
    setValue('');
  };

  return (
    <form className={classes.container} onSubmit={handleAddRow}>
      <div className={classes.section}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          className={classes.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={classes.section}>
        <label htmlFor="value">Value</label>
        <input
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add table row</Button>
    </form>
  );
}
