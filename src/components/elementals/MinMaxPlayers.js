import React from "react";
import { Stack, Box, RangeSelector, Text } from "grommet";


class MinMaxPlayers extends React.Component {

    render() {

        return (

            <Stack>
                <Box direction="row" justify="between">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                        <Box key={value} pad="small" border={false}>
                            <Text style={{ fontFamily: 'monospace' }}>
                                {value}
                            </Text>
                        </Box>
                    ))}
                </Box>
                <RangeSelector
                    direction="horizontal"
                    invert={false}
                    min={0}
                    max={9}
                    size="full"
                    round="small"
                    values={[3, 7]}
                    onChange={(values) => { }}
                />
            </Stack>

        )

    }
}

export default MinMaxPlayers