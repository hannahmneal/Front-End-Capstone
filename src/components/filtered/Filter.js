import React from "react";
import { Button } from "grommet";


class GameFilter extends React.Component {

    render() {

        return(
            <div>
                <span>
                    <Button
                        className="filter-btn"
                        // onClick={() => {}}
                        >
                        Filter Games
                    </Button>
                </span>
            </div>
        )
    }


}

export default GameFilter