import React from 'react';
import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder.addCustomEditor({
    id: 'layers',
    path: 'layers',
    name: '',
    defaultValue: ['#3F85A5', '#F6C85F', '#6F4E7C', '#9DD866', '#CA472F', '#EE9D55', '#8DDDD0'],
    editor: function Editor(props) {
      return <SimpleEditor {...props} />;
    },
  });
});
