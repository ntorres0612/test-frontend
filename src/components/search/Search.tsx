import React, { useEffect, useState } from "react";


import "./search.css";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Search } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { breedsSearch } from "../../api/breedApi";
import { CatBreed } from "../../data/model/CatBreedModel";
import { Link } from "react-router-dom";


const Room: React.FC = () => {

    const [breeds, setBreeds] = useState<readonly CatBreed[]>([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        const getData = setTimeout(() => {
            breedsSearch(inputValue).then((response: any) => {
                console.log("response: ", response);
                setBreeds(response)
            })

        }, 2000)

        return () => clearTimeout(getData)
    }, [inputValue])


    return (
        <div id="search_container">
            <div id="search_header">
                <OutlinedInput
                    fullWidth
                    autoComplete="off"
                    label="fullWidth"
                    id="fullWidth"
                    value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    'hide the password'
                                }

                                edge="end"
                            >
                                {<Search />}
                            </IconButton>
                        </InputAdornment>
                    } />
            </div>


            <div id="search_footer">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>name</TableCell>
                                <TableCell>weight</TableCell>
                                <TableCell>temperament</TableCell>
                                <TableCell>origin</TableCell>
                                <TableCell>life_span</TableCell>
                                <TableCell>adaptability</TableCell>
                                <TableCell >wikipedia_url</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {breeds.map((breed) => (
                                <TableRow key={breed.id}>
                                    <TableCell component="th" scope="row">
                                        {breed.name}
                                    </TableCell>
                                    <TableCell >{`${JSON.stringify(breed.weight)}`}</TableCell>
                                    <TableCell >{breed.temperament}</TableCell>
                                    <TableCell >{breed.origin}</TableCell>
                                    <TableCell >{breed.life_span}</TableCell>
                                    <TableCell >{breed.adaptability}</TableCell>
                                    <TableCell ><Link to={`${breed.wikipedia_url}`} target="_blank" >Wikipedia</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        </div>
    );
};


export default Room;