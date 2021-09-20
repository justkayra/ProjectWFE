import React from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import {connect} from "react-redux";
import {cancelRequest, clean, transform} from "../store/transformation/actions";
import PropTypes from "prop-types";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Grid,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Link} from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {makeStyles} from "@material-ui/core";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

class AppEditor extends React.Component {
    constructor(props) {
        super(props)
        this.quillRef = props.ref;
        this.reactQuillRef = null;
        this.tableClasses = makeStyles({
            table: {
                minWidth: 50,
            },
        });
        this.badgesDefaultProps = {
            color: 'secondary',
            children: <CheckCircleOutlineIcon/>
        };
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    setTable = (legent) => {
        this.setState({
                legent: legent,
                stat: legent.length
            }
        )
    }


    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    clearText = () => {
        this.props.clean();
    }

    render() {
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Change mood of your expression</h2>
                    </Grid>
                    <form onSubmit={this.props.transform}>
                        <div>
                            <ReactQuill
                                placeholder={this.props.placeholder}
                                value={this.props.ops}
                                ref={(el) => {
                                    this.reactQuillRef = el
                                }}
                                theme={'bubble'}/>
                        </div>
                        <Grid item xs={12} style={{background: "#04040"}}/>
                        <Grid item xs={12} style={{marginTop: "20px"}}>
                            <ButtonGroup disableElevation variant="outlined" color="primary">
                                <Button disabled={this.props.progressShown}
                                        variant="contained" color="primary"
                                        onClick={() => this.props.transform(this.quillRef.getText(0, this.quillRef.getLength()))}>Transform</Button>
                                <Button disabled={this.props.progressShown}
                                        variant="outlined"
                                        onClick={this.clearText}>Clear</Button>
                                <Button  color="error" disabled={!this.props.progressShown}
                                        variant="outlined"
                                        onClick={this.props.cancelRequest}>Stop</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: "20px"}}>
                            {this.props.progressShown && <LinearProgress/>}
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    {this.props.legend.legend.length > 0 &&
                    <Badge badgeContent={this.props.legend.legend.length} {...this.badgesDefaultProps}/>}
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table size="small" className={this.tableClasses.table} aria-label="legend table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>Replaced words list</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.legend.legend.map((row) => (
                                    <>
                                        <TableRow key={row.newWord + row.oldWord}>
                                            <TableCell><Link style={{color: '#000000'}}
                                                             to={"/words/" + row.oldWord}>{row.oldWord}</Link></TableCell>
                                            <TableCell><ArrowForwardIcon/></TableCell>
                                            <TableCell>{row.newWord}</TableCell>
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
}


AppEditor.propTypes = {
    transform: PropTypes.func.isRequired,
    clean: PropTypes.func.isRequired,
    cancelRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ops: state.transformReducer,
    legend: state.transformReducer,
    placeholder: state.transformReducer.placeholder,
    progressShown: state.loadingReducer.progressShown


});

export default connect(mapStateToProps, {transform, clean, cancelRequest})(AppEditor);