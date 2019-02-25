import React from "react";
// import FilterManager from "../filtered/FilterManager";
import GameData from "../../modules/GameData";
import { Form, Label, Input } from "reactstrap";

// The "getFilteredPlayers filter looks like this:

// getFilteredPlayers(min, max) {
//     // This URL was tested in the browser and it does indeed work to filter games by min and max players:
//     return fetch (`${remoteURL}/games?minPlayers_gte=${min}?&maxPlayers_lte=${max}`)
//     .then(r => r.json());
// }

class MinMaxPlayers extends React.Component {

    state = {
        minPlayers: "",
        maxPlayers: ""

    }

    // This is exactly the same function used in GameEditForm and GameForm; create a stateless functional component to hold these repetitive functions:

    handleIntChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = parseInt(evt.target.value);
        this.setState(stateToChange);
    };


    // FilterManager.getMinPlayers(min, max) {
    //     .then(minPlayers => {
    //     this.setState({
    //         minPlayers: minPlayers,

    //     })
    // })
    // }

    componentDidMount() {

        GameData.getAllGames()
            .then(games =>
                this.setState({
                    minPlayers: Math.min(parseInt(games.minPlayers)),
                    maxPlayers: Math.max(parseInt(games.maxPlayers))
                })
            )
    }




    // MDN:
    // Math.max([x[, y[, …]]])
    // Returns the largest of zero or more numbers.
    // Math.min([x[, y[, …]]])
    // Returns the smallest of zero or more numbers.




    render() {

        const { min, max } = this.state;

        return (

            <React.Fragment>
                <Form>
                <div>
                    <Label for="minPlayers">Players (min.)</Label>
                    <Input
                        type="number"
                        id="minPlayers"
                        placeholder="0"
                        onChange={this.handleIntChange}
                        value={min}
                    />
                </div>
                <div>

                    <Input
                        type="number"
                        id="maxPlayers"
                        placeholder="20"
                        onChange={this.handleIntChange}
                        value={max}
                    />
                </div>
                </Form>
            </React.Fragment>
        )

    }
}

export default MinMaxPlayers

// Example from Grommet's Code Sandbox:
// export default class extends Component {
//     state = { values: [2, 8] }

//     render() {
//       const { values } = this.state;
//       return (
//         <SandboxComponent>
//           <Stack>
//             <Box direction='row' justify='between'>
//               {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
//                 <Box key={value} pad='small' border={false}>
//                   <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
//                 </Box>
//               ))}
//             </Box>
//             <RangeSelector
//               direction='horizontal'
//               invert={false}
//               min={0}
//               max={9}
//               size='full'
//               round='small'
//               values={values}
//               onChange={nextValues => this.setState({ values: nextValues })}
//             />
//           </Stack>
//         </SandboxComponent>
//       );
//     }
//   }