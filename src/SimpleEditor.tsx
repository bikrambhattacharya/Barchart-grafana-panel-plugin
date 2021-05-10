import React, { useEffect } from 'react';
import { StandardEditorProps } from '@grafana/data';
const colors = ['#3F85A5', '#F6C85F', '#6F4E7C', '#9DD866', '#CA472F', '#EE9D55', '#8DDDD0'];

export const SimpleEditor: React.FC<StandardEditorProps<any>> = (props) => {
  useEffect(() => {
    if (props.context.data?.length !== 0 && props.value.length !== props.context.data?.length) {
      let arr = [...Array(props.context.data?.length - props.value.length)];
      arr.map((d, index) => {
        props.value.push(colors[index]);
      });
    }
  }, [props.context.data?.length]);
  return <div />;
};
