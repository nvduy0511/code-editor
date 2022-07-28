import React, { useEffect, useState } from 'react';

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
    code: string;
    onChange: (value: string, event?: any) => void;
    language: string;
};

const CodeEditor = ({ code, onChange, language }: CodeEditorProps) => {
    return (
        <AceEditor
            placeholder="Viết code của bạn ở đây..."
            value={code}
            mode={modeEditor[language]}
            theme="one_dark"
            fontSize="14pt"
            width="100%"
            height="100%"
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={false}
            onChange={onChange}
            editorProps={{
                $blockScrolling: true,
            }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
            }}
        />
    );
};
export default CodeEditor;
