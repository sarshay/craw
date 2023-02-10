import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

export default function NavTabs(prop) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // let match = useRouteMatch();
    return (
        <Box sx={prop.sty}>
            <Tabs
                value={value}
                orientation={prop.orientation}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
            >
                {
                    prop.data.map((c, i) => (
                        <Tab label={c.label}
                            component={Link}
                            to={`${c.to}`}
                            key={i} />
                    ))
                }
            </Tabs>
        </Box>
    );
}
