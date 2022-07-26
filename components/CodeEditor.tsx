import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/theme-one_dark';
import { defaultValueEditor, modeEditor, navLeftItems } from '../components/dataCodeUI';
import ReactAce from 'react-ace/lib/ace';

type CodeEditorProps = {
    language: string;
};

const CodeEditor = React.forwardRef<ReactAce, CodeEditorProps>((props, ref) => {
    console.log({ ref });
    return (
        <AceEditor
            ref={ref}
            placeholder="Viết code của bạn ở đây..."
            defaultValue={defaultValueEditor[props.language]}
            mode={modeEditor[props.language]}
            theme="one_dark"
            fontSize="14pt"
            width="100%"
            height="100%"
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={false}
            editorProps={{
                $blockScrolling: true,
            }}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: true,
                showLineNumbers: true,
            }}
        />
    );
});

CodeEditor.displayName = 'CodeEditor';
export default CodeEditor;
