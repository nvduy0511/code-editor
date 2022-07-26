import dynamic from 'next/dynamic';

import React, { useState, useRef, useEffect, createRef } from 'react';
import styles from '../../components/css/Editor.module.css';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { defaultValueEditor, modeEditor, navLeftItems } from '../../components/dataCodeUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCircleXmark,
    faCircle,
    faArrowsLeftRight,
    faChevronDown,
    faChevronUp,
    faSpinner,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft, faRankingStar, faClock } from '@fortawesome/free-solid-svg-icons';

import { apis } from '../../lib/api';
import classNames from 'classnames/bind';
import Rank from '../../components/Rank';
import History from '../../components/History';
import Exercise from '../../components/Exercise';
import ReactAce from 'react-ace/lib/ace';
import Button from '@mui/material/Button';
import Image from 'next/image';
const cx = classNames.bind(styles);

const DynamicComponentWithNoSSR = dynamic(() => import('../../components/CodeEditor'), {
    ssr: false,
});

function Editor() {
    const router = useRouter();
    const { id } = router.query;
    // console
    const [code, setCode] = useState<string>('');
    const [resulCode, setResultCode] = useState<string>('Console ...');
    const [input, setInput] = useState<string>('');
    // navigate
    const [tabType, setTabType] = useState<string>('exercise');
    const [isTestCase, setIsTestCase] = useState<boolean>(true);
    const [language, setLanguage] = useState<string>('c');
    const [testCases, setTestCases] = useState<Array<number>>([]);
    const [question, setQuestion] = useState({});
    const [isExtend, setIsExtend] = useState<boolean>(true);
    // resize
    const [initialPos, setInitialPos] = useState<number>(0);
    const [initialSize, setInitialSize] = useState<number>(0);

    const editor = createRef<ReactAce>();
    console.log({ editor });

    const getData = async () => {
        const resQuestion = await apis.getQuestion(id);
        setQuestion(resQuestion.data);
        const resTestCase = await apis.getTestCase(id);
        setTestCases(resTestCase.data);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNavLeft = (value: string) => {
        setTabType(value);
        console.log(value);
    };

    function handleClickRunCode() {
        setResultCode('Đang chạy....');
        const data = async () => {
            try {
                const response = await apis.runCode({
                    code: editor.current?.editor.getValue(),
                    input: input,
                    language: language,
                });
                setResultCode(response.data);
            } catch (error) {
                console.log('Fetch data error: ', error);
            }
        };
        data();
    }

    const MouseDownResize = (e: any) => {
        let resizable = document.getElementById('content-question')!;
        setInitialPos(e.clientX);
        setInitialSize(resizable.offsetWidth);
    };

    const handleResize = (e: any) => {
        let resizable = document.getElementById('content-question')!;
        resizable.style.width = `${initialSize + (e.clientX - initialPos)}px`;
    };

    const handleClickRunCodes = () => {
        const submit = async () => {
            setTestCases(testCases.map(() => 3));
            try {
                const response = await apis.runCodes(
                    {
                        code: editor.current?.editor.getValue(),
                        input: '',
                        language: language,
                    },
                    id,
                );
                setTestCases(response.data);
            } catch (error) {
                console.log('Fetch data error: ', error);
            }
        };
        submit();
    };

    const handleClickSubmitCode = () => {
        const submit = async () => {
            setTestCases(testCases.map(() => 3));
            try {
                const response = await apis.submitCode(
                    {
                        code: editor.current?.editor.getValue(),
                        input: '',
                        language: language,
                    },
                    id,
                );
                setTestCases(response.data);
            } catch (error) {
                console.log('Fetch data error: ', error);
            }
        };
        submit();
    };

    return (
        <div className={cx('content_body')}>
            <div className={cx('nav_left')}>
                <div
                    className={clsx(styles.nav_item, {
                        [styles.is_select]: tabType === 'exercise',
                    })}
                    onClick={() => handleNavLeft('exercise')}
                >
                    <FontAwesomeIcon icon={faAlignLeft} className={cx('icon-navBar')} />
                </div>
                <div
                    className={clsx(styles.nav_item, { [styles.is_select]: tabType === 'rank' })}
                    onClick={() => handleNavLeft('rank')}
                >
                    <FontAwesomeIcon icon={faRankingStar} className={cx('icon-navBar')} />
                </div>
                <div
                    className={clsx(styles.nav_item, { [styles.is_select]: tabType === 'history' })}
                    onClick={() => handleNavLeft('history')}
                >
                    <FontAwesomeIcon icon={faClock} className={cx('icon-navBar')} />
                </div>
            </div>
            <label htmlFor="nav_mobile-input" className={cx('icon_Bars')}>
                <FontAwesomeIcon icon={faBars} />
            </label>

            <input
                type={'checkbox'}
                hidden
                className={cx('nav_mobile-input')}
                id="nav_mobile-input"
            ></input>
            <label htmlFor="nav_mobile-input" className={cx('overlay')} />

            <div className={cx('nav_mobile')}>
                <div className={cx('nav_mobile-user')}>
                    <Image
                        src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        alt="avatar"
                        layout="fill"
                    />
                    <h6 style={{ margin: '12px 0 0', fontSize: '18px' }}>nvduy-0511</h6>
                </div>
                <ul className={cx('nav_mobile-list')}>
                    <label
                        htmlFor="nav_mobile-input"
                        className={clsx(cx('nav_mobile-item'), {
                            [cx('is-select-itemMobile')]: tabType === 'exercise',
                        })}
                        onClick={() => handleNavLeft('exercise')}
                    >
                        <FontAwesomeIcon icon={faAlignLeft} className={cx('icon-navmobile')} />
                        <p>Đề bài</p>
                    </label>
                    <label
                        htmlFor="nav_mobile-input"
                        className={clsx(cx('nav_mobile-item'), {
                            [cx('is-select-itemMobile')]: tabType === 'rank',
                        })}
                        onClick={() => handleNavLeft('rank')}
                    >
                        <FontAwesomeIcon icon={faRankingStar} className={cx('icon-navmobile')} />
                        <p>Bảng xếp hạng</p>
                    </label>
                    <label
                        htmlFor="nav_mobile-input"
                        className={clsx(cx('nav_mobile-item'), {
                            [cx('is-select-itemMobile')]: tabType === 'history',
                        })}
                        onClick={() => handleNavLeft('history')}
                    >
                        <FontAwesomeIcon icon={faClock} className={cx('icon-navmobile')} />
                        <p>Lịch sử làm bài</p>
                    </label>
                </ul>
            </div>

            <div id="content-question" className={cx('content')}>
                {tabType === 'exercise' && <Exercise question={question} />}
                {tabType === 'rank' && <Rank id={id} />}
                {tabType === 'history' && <History id={id} />}
            </div>

            <div className={cx('code_editor')}>
                <div
                    className={cx('resize')}
                    onMouseDown={MouseDownResize}
                    draggable="true"
                    onDrag={handleResize}
                >
                    <FontAwesomeIcon icon={faArrowsLeftRight} />
                </div>
                <div className={cx('option_language')}>
                    <select
                        className={cx('selectpicker')}
                        onChange={(e) => {
                            console.log(editor.current);
                            setLanguage(e.target.value);
                            // editor.current?.editor.setValue(defaultValueEditor[e.target.value]);
                        }}
                    >
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="py">Python</option>
                        <option value="cs">C#</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <div id="codeEditor" className={cx('editor')}>
                    <div className={cx('editor__wrapper')}>
                        <div className={cx('editor__body')}>
                            <DynamicComponentWithNoSSR ref={editor} language={language} />
                        </div>
                    </div>

                    <Button
                        sx={{ position: 'absolute', right: '100px', bottom: '10px' }}
                        variant="contained"
                        size="small"
                        onClick={handleClickRunCodes}
                    >
                        Chạy thử
                    </Button>
                    <Button
                        sx={{ position: 'absolute', right: '20px', bottom: '10px' }}
                        color="success"
                        variant="contained"
                        size="small"
                        onClick={handleClickSubmitCode}
                    >
                        Nộp bài
                    </Button>
                    <div className={cx('btn-extend')} onClick={() => setIsExtend((p) => !p)}>
                        <FontAwesomeIcon icon={isExtend ? faChevronDown : faChevronUp} />
                    </div>
                </div>

                <div className={cx(isExtend ? 'result-extend' : 'result')}>
                    <div className={cx('navRessult')}>
                        <h3
                            onClick={() => setIsTestCase(true)}
                            className={clsx(styles.navRessult_item, {
                                [styles.isSelect_navRessult]: isTestCase,
                            })}
                        >
                            Test case
                        </h3>
                        <h3
                            onClick={() => setIsTestCase(false)}
                            className={clsx(styles.navRessult_item, {
                                [styles.isSelect_navRessult]: !isTestCase,
                            })}
                        >
                            Console
                        </h3>
                    </div>
                    {isExtend && (
                        <div>
                            {isTestCase ? (
                                <div className={cx('result_content')}>
                                    <ul className={cx('list_testcase')}>
                                        {testCases &&
                                            testCases.map((testCase, index) => (
                                                <li key={index}>
                                                    <div className={cx('case')}>
                                                        <FontAwesomeIcon
                                                            className={clsx(styles.icon, {
                                                                [styles.icon_success]:
                                                                    testCase === 1 ||
                                                                    testCase === 2,
                                                                [styles.icon_error]: testCase === 0,
                                                                [styles.icon_loading]:
                                                                    testCase === 3,
                                                            })}
                                                            icon={
                                                                testCase === 2
                                                                    ? faCircle
                                                                    : testCase === 1
                                                                    ? faCircleCheck
                                                                    : testCase === 3
                                                                    ? faSpinner
                                                                    : faCircleXmark
                                                            }
                                                        />
                                                        <span>Test case #{index}</span>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className={styles.consoleScreen}>
                                    <div className={styles.consoleContent}>{resulCode}</div>
                                    <div className={styles.consoleInput}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={handleClickRunCode}
                                            >
                                                Chạy thử
                                            </Button>
                                        </div>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Input"
                                            onChange={(e) => setInput(e.target.value)}
                                            style={{
                                                width: 300,
                                                height: '60px',
                                                marginTop: '15px',
                                                borderRadius: '3px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Editor;
