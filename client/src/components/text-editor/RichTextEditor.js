import React from 'react';

import { Button } from '@material-ui/core';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;

const RichTextEditor = ({ editorState, onChange }) => {
   return (
      <div className="main">
         <div>
            <Editor
               editorState={editorState}
               onChange={onChange}
               plugins={[emojiPlugin]}
            />
         </div>
         <EmojiSelect />
      </div>
   );
};

export default RichTextEditor;
