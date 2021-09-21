import React from 'react';
import {Container, Grid, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {fetchWord, updateRate} from "../store/words/actions";
import PropTypes from "prop-types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";

export class Word extends React.Component {

    componentDidMount() {
        this.props.fetchWord(this.props.match.params.wordValue);
    }

    render() {
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Change emphasis of the related words</h2>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table size="small" aria-label="words table">
                            <TableBody>
                                {Object.keys(this.props.associations).map((row) =>
                                    <TableRow key={row}>
                                        {this.props.associations[row].baseWord
                                            ?
                                            <>
                                                <TableCell align={"center"}
                                                    style={{backgroundColor:'#e25b3d', color: '#FFFFFF',}}
                                                    colSpan={5}>
                                                    <Typography variant="h5">{this.props.associations[row].value}</Typography>
                                                    <Typography variant="h7">{this.props.wordType}</Typography>
                                                </TableCell>
                                            </>
                                            :
                                            <>
                                                <TableCell>{this.props.associations[row].value}</TableCell>
                                                <TableCell><h2>{this.props.associations[row].emphasisRank}</h2>
                                                </TableCell>
                                                <TableCell><IconButton
                                                    aria-label="increase emphasises"
                                                    onClick={() => this.props.updateRate(this.props.wordId, this.props.associations[row].value, 1)}
                                                >
                                                    <ArrowUpwardIcon/>
                                                </IconButton></TableCell>
                                                <TableCell><IconButton
                                                    aria-label="decrease emphasises"
                                                    onClick={() => this.props.updateRate(this.props.wordId, this.props.associations[row].value, -1)}>
                                                    <ArrowDownwardIcon/>
                                                </IconButton></TableCell>
                                            </>
                                        }
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>)
    }

}

const mapStateToProps = state => ({
    wordId: state.wordReducer.wordId,
    wordType: state.wordReducer.wordType,
    associations: state.wordReducer.associations
});

Word.propTypes = {
    fetchWord: PropTypes.func.isRequired,
    updateRate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {fetchWord, updateRate})(withRouter(Word));


