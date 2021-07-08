import React from 'react';
import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';
import { FontColorEditor } from './FontColorEditor';
import { FontSizeEditor } from './FontSizeEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'fontColor',
      path: 'fontColor',
      name: 'Bar Text Color',
      defaultValue: '#000000',
      editor: function Editor(props) {
        return <FontColorEditor {...props} />;
      },
    })
    .addCustomEditor({
      id: 'fontSize',
      path: 'fontSize',
      name: 'Bar Text Size',
      defaultValue: { label: '10', value: 10 },
      editor: function Editor(props) {
        return <FontSizeEditor {...props} />;
      },
    })
    .addCustomEditor({
      id: 'layers',
      path: 'layers',
      name: '',
      defaultValue: ['#3F85A5', '#F6C85F', '#6F4E7C', '#9DD866', '#CA472F', '#EE9D55', '#8DDDD0'],
      editor: function Editor(props) {
        return <SimpleEditor {...props} />;
      },
    });
});
