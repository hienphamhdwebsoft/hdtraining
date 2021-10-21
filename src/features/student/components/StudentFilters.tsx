import { Box, Button, Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useRef } from 'react';
import { City, ListParams } from '../../../models';


export interface StudentFiltersProps {
    filter: ListParams,
    cityList: City[],
    onChange?: (newFilter: ListParams) => void,
    onSearchChange?: (newFilter: ListParams) => void,  // Process debounce search
}



export default function StudentFilters({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) {

    const searchRef = useRef<HTMLInputElement>();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value, //   name_like api request
            _page: 1,
        }

        onSearchChange(newFilter);
    };

    const handleCityChange = (e: ChangeEvent<{ name?: string, value: unknown }>) => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            city: e.target.value || undefined,
            _page: 1,
        }

        onChange(newFilter);
    }

    const handleSortChange = (e: ChangeEvent<{ name?: string, value: unknown }>) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = (value as string).split('.'); // Convert value to string to use split
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined, // _oder have data type "asc" or "desc"
        }

        onChange(newFilter);
    }

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: "",
        }

        onChange(newFilter);

        if (searchRef.current) {
            searchRef.current.value = ""; // Clear input search after click button clear
        }
    }

    return (
        <Box>
            <Grid container spacing={3} >
                {/* Search */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
                        <OutlinedInput
                            label="Search By Name"
                            id="searchByName"
                            endAdornment={<Search />}
                            labelWidth={60}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                {/* Filter by city */}
                <Grid item xs={12} md={6} lg={3} >
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="filterByCity" >Filter By City</InputLabel>
                        <Select
                            labelId="filterByCity"
                            id="filterByCity"
                            label="Filter By City"
                            value={filter.city || ""}
                            onChange={handleCityChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityList.map(city => (
                                < MenuItem key={city.code} value={city.code} > {city.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Sort by */}
                <Grid item xs={12} md={6} lg={2} >
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="sortBy" >Sort</InputLabel>
                        <Select
                            labelId="sortBy"
                            id="sortBy"
                            label="Sort"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
                            onChange={handleSortChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            < MenuItem value="name.asc">Name ASC</MenuItem>
                            < MenuItem value="name.desc">Name DESC</MenuItem>
                            < MenuItem value="mark.asc">Mark ASC</MenuItem>
                            < MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Clear all filter */}
                <Grid item xs={12} md={6} lg={1}>
                    <Button color="primary" variant="outlined" fullWidth onClick={handleClearFilter}>
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box >
    );
}
