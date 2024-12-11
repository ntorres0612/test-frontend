import React, { useEffect } from "react";
//import { Film } from '../../data/model/Film';


import "./breed.css";
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { getBreeds, getBreedsById, getImagesById } from "../../api/breedApi";
import { CatBreed } from "../../data/model/CatBreedModel";
import { ImageModel } from "../../data/model/ImageModel";

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
interface Film {
    title: string;
    year: number;
}

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const Breed: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const [breeds, setBreeds] = React.useState<readonly CatBreed[]>([]);
    const [images, setImages] = React.useState<readonly ImageModel[]>([]);
    const [selectedBreed, setSelectedBreed] = React.useState<CatBreed>();
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        getBreeds().then((response: any) => {
            console.log("response", response);

            const breeds: CatBreed[] = response.map((item: any) => ({
                ...item
            }));
            setBreeds([...breeds]);

        })
    }, []);

    const breedById = (catBreed: CatBreed) => {

        getBreedsById(catBreed.id).then((response: any) => {
            console.log("response", response);
            setSelectedBreed(response)
            getImagesById(response.reference_image_id).then((resp: any) => {
                console.log('resp', resp);
                setImages(resp)
            })
        })
    };


    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1e3);
            setLoading(false);


        })();
    };

    const handleClose = () => {
        setOpen(false);
        // setOptions([]);
    };
    const handleChange = (catBreed: CatBreed) => {
        breedById(catBreed)

    };
    return (
        <div id="search_container">
            <div id="search_header">
                <Autocomplete
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    onChange={(event: any, newValue: CatBreed | null) => {
                        if (newValue != null)
                            handleChange(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    options={breeds}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Asynchronous"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            </div>
            <div id="search_body">
                <div id="detail-breed-container">
                    <div id="detail-breed-container-left">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {selectedBreed?.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {selectedBreed?.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div id="detail-breed-container-right">
                        <img width={'100%'} height={'100%'} src={images.length > 0 ? images[0].url : ""} />
                    </div>
                </div>
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

const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

export default Breed;