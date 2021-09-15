import React from 'react';
import ReactQuill from "react-quill";
import {Button, ButtonGroup, Grid, LinearProgress} from "@material-ui/core";
import axios from "axios";
import 'react-quill/dist/quill.snow.css'

export class AppEditor extends React.Component {
    constructor(props) {
        super(props)
        this.quillRef = props.ref;
        this.reactQuillRef = null;
    }

    state = {
        progressShown: false,
        ops: [
            {insert: 'Hi.', attributes: {bold: true}},
            {insert: 'By working with all major service operators and on a global basis, we can offer cost effective end-to-end television solutions and recommendations, or very bespoke services if required. These can be technical service recommendations, distribution or marketing focussed. Our business focus has been to successfully open and develop international marketplaces across many distribution platform for our clients. We recognise that any product is only as good as its distribution, whether it is a free-to-air channel. or pay-service channels and content.'},
            {insert: 'Grey', attributes: {color: '#bebd76'}}
        ]
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    transformText = () => {
        const connectSession = axios.create({
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
        const formData = {"sourceText": this.quillRef.getText(0, this.quillRef.getLength()), "emphasisType": "RANDOM"};
        let URL = process.env.REACT_APP_REST_HOST + '/service/transform/mood';
        this.setState({
            progressShown: true
        })
        connectSession.post(URL, formData)
            .then(response => {
                let data = response.data;
                this.setState({
                    progressShown: false,
                    ops: data.payloads.ops
                })
                this.props.setTable(data.payloads.legend);
            }).catch(error => {
            console.log(error);
            this.setState({
                progressShown: false
            })
        });
    }

    insertText = () => {
        let range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, 'Hello, World! ')
    }

    clearText = () => {
        this.setState({
            ops: []
        })
        this.props.setTable([]);
    }

    render() {
        return (
            <form onSubmit={this.transformText}>
                <div>
                    <ReactQuill
                        value={this.state.ops}
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'} />
                </div>
                <Grid item xs={12} style={{background: "#04040"}}/>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    <ButtonGroup disableElevation variant="outlined" color="primary">
                        <Button disabled={this.state.progressShown}
                                variant="contained" color="primary"
                                onClick={this.transformText}>Transform</Button>
                       <Button disabled={this.state.progressShown}
                                variant="outlined"
                                onClick={this.clearText}>Clear</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    {this.state.progressShown && <LinearProgress/>}
                </Grid>
            </form>
        )
    }
}