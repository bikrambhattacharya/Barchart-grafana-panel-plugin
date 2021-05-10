import React from 'react';
import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'layers',
      path: 'layers',
      name: '',
      defaultValue: [],
      editor: (props) => {
        return <SimpleEditor {...props} />;
      },
    });
});
