import React, { createRef, forwardRef, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from './code_editor.module.css';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DataObjectIcon from '@mui/icons-material/DataObject';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { apis } from '../../lib/api';
import LinearProgress from '@mui/material/LinearProgress';
import { defaultValueEditor, modeEditor, navLeftItems } from '../../components/dataCodeUI';
const cx = classNames.bind(styles);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CodeEditor = dynamic(() => import('../../components/CodeEditor'), {
    ssr: false,
});

const CodeEditorPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [code, setCode] = useState<string>(defaultValueEditor['c']);
    const [input, setInput] = useState<string>('');
    const [language, setLanguage] = useState<string>('c');
    const [result, setResult] = useState<string>('');

    const handleClickRunCode = (e: any) => {
        const runCode = async () => {
            setIsLoading(true);
            try {
                const res = await apis.runCode({
                    code: code,
                    language: language,
                    input: input,
                });
                if (res.data.success) {
                    setResult(res.data.output);
                } else {
                    setResult('Lỗi' + res.data.error);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        runCode();
    };

    const handleOnChange = (value: string, event?: any) => {
        console.log(value);
        setCode(value);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <Head>
                    <title>Code Editor</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <div className={cx('logo')}>
                            <DataObjectIcon color="primary" fontSize="large" />
                            <span style={{ color: 'white', marginLeft: '5px', fontWeight: 'bold' }}>
                                Code-Yud
                            </span>
                        </div>

                        <IconButton sx={{ ml: 1, color: 'text.primary' }} color="inherit">
                            <Brightness7Icon />
                        </IconButton>
                    </div>
                    <div className={cx('wrap-code-editor')}>
                        <div className={cx('code-editor')}>
                            <CodeEditor onChange={handleOnChange} code={code} language={language} />
                        </div>

                        <div className={cx('console')}>
                            <div style={{ height: '5px' }}>{isLoading && <LinearProgress />}</div>

                            <div className={cx('console-output')}>
                                <span>Output</span>
                                {result}
                            </div>
                            <div className={cx('console-control')}>
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder="Input"
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '60px',
                                        marginTop: '15px',
                                        borderRadius: '3px',
                                        outline: 'none',
                                    }}
                                />
                                <div>
                                    <Button
                                        sx={{ height: '35px' }}
                                        variant="contained"
                                        startIcon={<PlayArrowIcon />}
                                        onClick={handleClickRunCode}
                                    >
                                        Chạy
                                    </Button>
                                    <Select
                                        sx={{
                                            height: '35px',
                                            textAlign: 'left !important',
                                        }}
                                        value={language}
                                        onChange={(e) => {
                                            setLanguage(e.target.value);
                                            setCode(defaultValueEditor[e.target.value]);
                                        }}
                                        variant="outlined"
                                    >
                                        <MenuItem value={'cpp'}>C++</MenuItem>
                                        <MenuItem value={'c'}>C</MenuItem>
                                        <MenuItem value={'cs'}>C#</MenuItem>
                                        <MenuItem value={'java'}>Java</MenuItem>
                                        <MenuItem value={'py'}>Python3</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CodeEditorPage;
