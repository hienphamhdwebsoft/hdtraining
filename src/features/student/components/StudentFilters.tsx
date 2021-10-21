import { Box, Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React from 'react';
import { City, ListParams } from '../../../models';


export interface StudentFiltersProps {
    filter: ListParams,
    cityList: City[],
    onChange?: (newFilter: ListParams) => void,
    onSearchChange?: (newFilter: ListParams) => void,  // Process debounce search
}



export default function StudentFilters({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) {

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
            </Grid>
        </Box >
    );
}
