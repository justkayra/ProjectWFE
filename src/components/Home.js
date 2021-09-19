import React, {useState} from 'react';
import {
    Badge,
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
import {Link} from "react-router-dom";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {AppEditor} from "./AppEditor";
import Bar from "./Bar";

const Home = () => {
    const [legend, setLegend] = useState([]);
    const [stat, setStat] = useState(0);
    const tableClasses = makeStyles({
        table: {
            minWidth: 50,
        },
    });

    const badgesDefaultProps = {
        color: 'secondary',
        children: <CheckCircleOutlineIcon/>
    };

    const setTable = (legent) => {
        setLegend(legent);
        setStat(legent.length);
    }

    return (
        <Container disableGutters={true}>
            <Bar/>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Change mood of your expression</h2>
                    </Grid>
                    <AppEditor setTable={setTable}/>
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    {stat > 0 && <Badge badgeContent={stat} {...badgesDefaultProps}/>}
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table className={tableClasses.table} aria-label="legend table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Old word</TableCell>
                                    <TableCell align="right">#</TableCell>
                                    <TableCell align="right">New word</TableCell>
                                    <TableCell align="right">#</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {legend.map((row) => (
                                    <>
                                        <TableRow key={row.newWord + row.oldWord}>
                                            <TableCell><Link style={{color: '#000000'}}
                                                             to={"/words/" + row.oldWord}>{row.oldWord}</Link></TableCell>
                                            <TableCell>{row.emphasisRateOfOldWord}</TableCell>
                                            <TableCell>{row.newWord}</TableCell>
                                            <TableCell>{row.emphasisRateOfNewWord}</TableCell>
                                        </TableRow>
                                    </>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        </Container>

    )
}

export default Home;
