import React from 'react';
import {Card, CardActions, CardContent, IconButton, Typography} from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export class WordRateCard extends React.Component {

    constructor(props) {
        super(props)
        console.log(props);
    }


    render() {
        return (
            <Card style={{marginBottom: "15px"}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {this.props.row.value}
                    </Typography>
                    <Typography variant="h4" style={{marginTop: "10px"}}>
                        {this.props.row.emphasisRank}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="increase emphasises"
                        onClick={() => this.props.updateRate(this.props.wordId, this.props.row.value, 10)}
                    >
                        <ArrowUpwardIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="decrease emphasises"
                        onClick={() => this.props.updateRate(this.props.wordId, this.props.row.value, 10)}>
                        <ArrowDownwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>)
    }

}


