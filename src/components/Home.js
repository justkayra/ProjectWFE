import React, {useCallback, useMemo, useState} from 'react';
import axios from 'axios';
import {createEditor, Node} from "slate";
import {Editable, Slate, withReact} from 'slate-react';
import {Button, Container, Grid, LinearProgress} from "@material-ui/core";

const Home = () => {
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const [progressShown, setProgressShown] = useState(false);
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{
                text: 'By working with all major service operators and on a global basis, we can offer cost effective end-to-end television solutions and recommendations, or very bespoke services if required. These can be technical service recommendations, distribution or marketing focussed. Our business focus has been to successfully open and develop international marketplaces across many distribution platform for our clients. We recognise that any product is only as good as its distribution, whether it is a free-to-air channel. or pay-service channels and content.'

            }
            ]
        }]);


    const transformText = (e) => {
        e.preventDefault();
        let serializedText = serialize(value);
        const connectSession = axios.create({
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
        const formData = {"sourceText": serializedText, "emphasis": "RANDOM"};
        let URL = process.env.REACT_APP_REST_HOST + '/service/transform/mood';
        setProgressShown(true);
        connectSession.post(URL, formData)
            .then(response => {
                let data = response.data;
                console.log(data.payloads.arraylist);
                setValue(data.payloads.arraylist);
                setProgressShown(false);
            }).catch(error => {
            console.log(error);
            setProgressShown(false);
        });
    }

    const serialize = nodes => {
        return nodes.map(n => Node.string(n)).join('\n')
    }

    return (
        <Container>
            <Grid container>
                <form onSubmit={transformText}>
                    <Grid item xs={12}>
                        <h2>Change mood of your expression</h2>
                    </Grid>
                    <Grid item xs={12} style={{border: "1px dotted gray"}}>
                        <Slate
                            value={value}
                            editor={editor}
                            renderLeaf={renderLeaf}
                            onChange={newValue => setValue(newValue)}
                        >
                            <Editable

                                renderLeaf={renderLeaf}
                            />
                        </Slate>
                    </Grid>
                    <Grid item xs={12} style={{margin: "20px"}}>
                        <Button variant="contained" color="primary" onClick={transformText}>Transform</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {progressShown && <LinearProgress/>}
                    </Grid>
                </form>
            </Grid>
        </Container>
    )

}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
}

export default Home;
