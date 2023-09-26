// EditorJS
// https://editorjs.io/api

import { RefObject, useEffect, useRef } from 'react';
import EditorJS, { API, LogLevels, OutputData } from '@editorjs/editorjs';

const CONTAINER_ID = 'editor-container';
const ColorPlugin = require('editorjs-text-color-plugin');
const Size = require('editorjs-inline-font-size-tool');
const Strikethrough = require('editorjs-strikethrough');
const UnderLine = require('@editorjs/underline');


export const useEditorJs = (ref: RefObject<HTMLDivElement>, onChange: (e: OutputData) => void, 
  option?: {
    initData?: OutputData,
    isReadOnly?: boolean,
  }
) => {
  const editor = useRef<EditorJS | null>(null);
  const init = useRef<boolean>(false);
  useEffect(() => {
    if (init.current) return;
    init.current = true;
    if (!(ref && ref.current)) {
      return;
    }
    // - initialize editor.js -
    const container = ref.current;
    container.id = container.id ?? CONTAINER_ID;
    editor.current = new EditorJS({
      holder: container.id,
      readOnly: option?.isReadOnly,
      logLevel: "ERROR" as any,
      inlineToolbar: ['bold', 'italic', 'Size', 'Color', 'Marker', '下線', '取り消し線'],
      defaultBlock: '',
      // autofocus: true,
      tools: {
        'Size': {
          class: Size,
        },
        'Color' : {
          class: ColorPlugin,
          config: {
            // defaultColor: '#00000000',
            customPicker: true,
            style: true,
            type: 'text',
          }
        },
        'Marker': {
          class: ColorPlugin,
          config: {
            // defaultColor: '#00000000',
            customPicker: true,
            type: 'marker'
          }
        },
        '下線': {
          class: UnderLine,
        },
        '取り消し線': {
          class: Strikethrough,
        },
      },
    });
    return () => {
      // - destroy editor.js -
    };
  }, [ref]);
  return editor;
};
