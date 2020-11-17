import React from 'react';
import { Editor } from 'draft-js';

const ViewOnlyEditor = ({ editorState }) => {
   return (
      <div>
         <Editor readOnly editorState={editorState} />
      </div>
   );
};

export default ViewOnlyEditor;
