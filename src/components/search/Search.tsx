import React, { useEffect } from "react";
import { Film } from '../../data/model/Film';


import "./search.css";
import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button } from '@mui/material'

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];



interface Room {
    id: string;
    name: string;
    players: number;
    maxPlayers: number;
}

const images = [
    "https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg",
];
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
const Room: React.FC = () => {
    const [options, setOptions] = React.useState<readonly Film[]>([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
    }, []);

    const onPlay = (room: Room) => () => {
        console.log("OnPlay...", room);
    };

    return (
        <div id="search_container">
            <div id="search_header">
                <OutlinedInput fullWidth label="fullWidth" id="fullWidth" endAdornment={
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
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
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