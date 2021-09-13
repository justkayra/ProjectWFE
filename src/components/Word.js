import React from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

const Word = ({props}) => {


    const useStyles = makeStyles({
        table: {
            minWidth: 50,
        }
    });
    const classes = useStyles();

    return (
        <Container>
            <Grid item xs={12}>
               <h2>{props}</h2>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table className={classes.table} aria-label="legend table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Related word</TableCell>
                                <TableCell>Strength</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {legend.map((row) => (
                                <>
                                    <TableRow key={row.word}>
                                        <TableCell>{row.word}</TableCell>
                                        <TableCell>{row.strength}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    )

}

export default Word;
