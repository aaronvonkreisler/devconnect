import React from 'react';
import Editor from 'draft-js-plugins-editor';

import 'draft-js-linkify-plugin/lib/plugin.css';

const ViewOnlyEditor = (props) => {
   return (
      <div>
         <Editor
            readOnly
            editorState={props.editorState}
            onChange={() => {}}
            plugins={props.plugins}
            {...props}
         />
      </div>
   );
};

export default ViewOnlyEditor;
