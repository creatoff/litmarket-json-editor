import { Layout } from '~shared/ui/layout/layout.ui';
import { TableEditor } from '~widgets/table-editor';
import { TextEditor } from '~widgets/text-editor';
import { NewRowForm } from '~widgets/new-row-form';

export default function App() {
  return (
      <Layout
        tableEditorSlot={<TableEditor />}
        formSlot={<NewRowForm />}
        textEditorSlot={<TextEditor />}
      />
  );
};
