import React, { Component } from "react";
import { Grid, Box } from 'grommet';
import {
    Card,
    CardTitle,
    CardText,
    Row,
    Col,
    Button,
    Container,
    CardDeck
  } from "reactstrap";



// The cards should be displayed here, in their own "decks", sorted by category
// The filter (a separate component) will be rendered above the table
// When the state of the filter changes, the cards are rendered differently in this table



  export default class GameGrid extends Component {

    render() {
        return(
            <Grid>
                rows={['xsmall']}
                columns={['medum']}
                gap={['medium']}
                areas={[
                    {name: "main", start: [0,0], end:[0,2]},
                    {name: "game-display", start: [0,1], end: [2,2]}
                ]}

            <Box gridArea="main" />
            <Box gridArea="game-display" />

            </Grid>
        )
    }

  }