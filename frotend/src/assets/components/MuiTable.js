import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MuiTable = ({ guesses }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="guess table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Guess</TableCell>
                        <TableCell align="right">Similarity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {guesses.map((guess) => (
                        <TableRow key={guess.id}>
                            <TableCell component="th" scope="row">
                                {guess.id}
                            </TableCell>
                            <TableCell align="right">{guess.guess}</TableCell>
                            <TableCell align="right">{guess.similarity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MuiTable;
