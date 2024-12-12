import React, { Fragment, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";



const Breed: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [breeds, setBreeds] = useState<readonly CatBreed[]>([]);
    const [images, setImages] = useState<readonly ImageModel[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<CatBreed>();
    const [loading, setLoading] = useState(false);


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

                setImages(resp)
            })
        })
    };


    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
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
            {selectedBreed ?
                <Fragment>
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
                                        {selectedBreed ?
                                            <Link to={`${selectedBreed?.wikipedia_url}`} target="_blank" ><Button size="small">Learn More</Button></Link>
                                            : ""
                                        }
                                    </CardActions>
                                </Card>
                            </div>
                            <div id="detail-breed-container-right">
                                <img width={'50%'} src={images.length > 0 ? images[0].url : ""} />
                            </div>
                        </div>
                    </div>
                    <div id="search_footer">

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
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

                                    <TableRow key={selectedBreed?.id}>
                                        <TableCell component="th" scope="row">
                                            {selectedBreed?.name}
                                        </TableCell>
                                        <TableCell >{`${JSON.stringify(selectedBreed?.weight)}`}</TableCell>
                                        <TableCell >{selectedBreed?.temperament}</TableCell>
                                        <TableCell >{selectedBreed?.origin}</TableCell>
                                        <TableCell >{selectedBreed?.life_span}</TableCell>
                                        <TableCell >{selectedBreed?.adaptability}</TableCell>
                                        <TableCell ><Link to={`${selectedBreed?.wikipedia_url}`} target="_blank" >Wikipedia</Link></TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Fragment>
                : ""
            }


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