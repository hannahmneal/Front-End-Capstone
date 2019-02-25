import React from "react";
import { Layer } from "grommet";
import {
    Form,
    Label,
    Input
  } from "reactstrap";
  



class GameFilter extends React.Component {

    render() {

        return(
            <Layer className="filter-layer" modal={true} position="center" margin={"large"} size={"small"} animate={true}>
                    <Form>
                        <div>

                            <Label>
                                Search By Game Title
                            </Label>
                        <Input
                            type="text"
                            name="gameTitleSearch"
                            id="title-search"
                            placeholder="Game Title"
                        >
                        </Input>
                        </div>
                        <div>

                            <Label>
                                Filter By Competitive or Cooperative Games
                            </Label>
                        <Input>
                        </Input>
                        </div>
                        <div>

                            <Label>
                                Filter By Number of Players
                            </Label>
                        <Input>
                        </Input>
                        </div>
                    </Form>
            </Layer>
        )

    }


}

export default GameFilter