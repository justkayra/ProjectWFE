import React from 'react';
import {Card, CardActions, CardContent, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {fetchWord, updateRate} from "../store/words/actions";
import PropTypes from "prop-types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Bar from "./Bar";


export class Word extends React.Component {

    componentDidMount() {
        this.props.fetchWord(this.props.match.params.wordValue);
    }

    render() {
        return (
            <Container disableGutters={true}>
                <Bar/>
                <Container>
                    <Grid container>
                        <Grid item xs={5}>
                            <h2>{this.props.match.params.wordValue}</h2>
                        </Grid>
                        <Grid>
                            <h5>{this.props.wordType}</h5>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(this.props.associations).map((row) =>
                            <Card style={{marginBottom: "15px"}} key={row}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {this.props.associations[row].value}
                                    </Typography>
                                    <Typography variant="h4" style={{marginTop: "10px"}}>
                                        {this.props.associations[row].emphasisRank}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton
                                        aria-label="increase emphasises"
                                        onClick={() => this.props.updateRate(this.props.wordId, this.props.associations[row].value, 1)}
                                    >
                                        <ArrowUpwardIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="decrease emphasises"
                                        onClick={() => this.props.updateRate(this.props.wordId, this.props.associations[row].value, -1)}>
                                        <ArrowDownwardIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )}
                    </Grid>
                </Container>
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


