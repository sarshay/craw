import { Search, SearchRounded } from '@mui/icons-material';
import { Avatar, IconButton, InputBase, Paper, SwipeableDrawer } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery } from '../../services';

function MySearch(props) {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [searchWord, setSearchWord] = React.useState('');

    let query = useQuery();

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const goSearch = (event) => {
        event.preventDefault();
        history.push(`/${props.slug}/?search=${searchWord}`);
        setOpen(false);
    }

    const onChange = (event) => {
        setSearchWord(event.target.value);
    };
    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor="top"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                <Paper
                    component="form"
                    sx={{ p: '4px', display: 'flex', alignItems: 'center' }}
                    onSubmit={goSearch}
                >
                    {props.images && <Avatar alt={props.title} src={props.images.xs} />}
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={`Search on ${props.title}`}
                        defaultValue={query.get("search")}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={onChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={goSearch}>
                        <Search />
                    </IconButton>
                </Paper>
            </SwipeableDrawer>
            <IconButton onClick={toggleDrawer}>
                <SearchRounded sx={{ color: "#ffffff" }} />
            </IconButton>
        </React.Fragment>
    );
}
export default MySearch;