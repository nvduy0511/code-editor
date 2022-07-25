import React, { useState, useEffect } from 'react';

import styles from './css/NavItem.module.css';
import classNames from 'classnames/bind';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { apis } from './api';
const cx = classNames.bind(styles);

interface IHistory {
    timeSubmit: string;
    language: string;
    testCasePass: number;
    status: boolean;
}
type HistoryProps = {
    id: string | string[] | undefined;
};
const History = ({ id }: HistoryProps) => {
    const [historys, setHistorys] = useState<IHistory[]>([]);
    useEffect(() => {
        const data = async () => {
            try {
                const response = await apis.getHistory(id);
                setHistorys(response.data);
            } catch (error) {
                console.log('Fetch data error: ', error);
            }
        };
        data();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Lịch sử làm bài</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, tableLayout: 'auto' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="center">Ngôn ngữ</TableCell>
                            <TableCell align="center">Câu đúng</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Thời gian nộp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historys.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index}
                                </TableCell>
                                <TableCell align="center">{row.language}</TableCell>
                                <TableCell align="center">{row.testCasePass}</TableCell>
                                <TableCell align="center">
                                    {row.status ? 'Hoàn thành' : 'Thiếu'}
                                </TableCell>
                                <TableCell align="center">
                                    <a href="#">{row.timeSubmit}</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default History;
