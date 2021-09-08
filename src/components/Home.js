import React from 'react';
import {Mention, MentionsInput} from "react-mentions";
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textToTransform: 'By working with all major service operators and on a global basis, we can offer cost effective end-to-end television solutions and recommendations, or very bespoke services if required. These can be technical service recommendations, distribution or marketing focussed. Our business focus has been to successfully open and develop international marketplaces across many distribution platform for our clients. We recognise that any product is only as good as its distribution, whether it is a free-to-air channel. or pay-service channels and content.',
        };
    }

    transformText = (e) => {
        e.preventDefault();
        const connectSession = axios.create({
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
        const formData = {"sourceText": this.state.textToTransform, "emphasis": "RANDOM"};
        let URL = process.env.REACT_APP_REST_HOST + '/service/transform/mood';
        connectSession.post(URL, formData)
            .then(response => {
                let data = response.data;
                this.setState({
                    textToTransform: data.payloads.string
                });
            }).catch(error => {
                console.log(error);
        });
    }

    handleChange = (e) => {
        this.setState({
            textToTransform: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.transformText}>
                <div className="container">
                    <div className="row" style={{marginTop: 20}}>
                        <div className="one columns">
                        </div>
                        <div className="three columns">
                            <h2>Change mood of your expression</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="one columns">
                        </div>
                        <div className="three columns">
                            <MentionsInput value={this.state.textToTransform} onChange={this.handleChange}
                                           className="u-full-width" style={{height: 300, width: 500}}>
                                <Mention
                                    markup="@[__display__]"
                                />
                            </MentionsInput>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: 10}}>
                        <div className="one columns">
                        </div>
                        <div className="three columns">
                            <input
                                className="button-primary"
                                style={{fontSize: 18}}
                                type="submit"
                                value="Transform"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default Home;
