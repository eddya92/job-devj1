import React, {useEffect, useState} from 'react';
import {Button, Rating, Spinner} from 'flowbite-react';

const Index = props => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('release_date', '');
    const [genre, setGenre] = useState('');
    const [activeButton, setActiveButton] = useState(null);
    const [genres, setGenres] = useState();

    const fetchMovies = (sort) => {
        setLoading(true);

        return fetch(`/api/movies?order_by=${sort}&genre=${genre}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.movies);
                setLoading(false);
            });
    }

    const fetchGenres = () => {
        return fetch(`/api/genres`)
            .then(response => response.json())
            .then(data => {
                setGenres(data.genres);
            });
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchMovies(filter);
    }, [filter,genre]);

    function handleFilterClick(sort, activeButton) {
        setFilter(sort);
        setActiveButton(activeButton);
    }

    function handleSelectChange(genre) {
        setGenre(genre)
    }

    return (
        <Layout>
            <Heading/>
            < Filter activeButton={activeButton} onFilterClick={handleFilterClick}/>
            < GenreList genres={genres} onSelect={handleSelectChange}/>
            <MovieList loading={loading}>
                {movies.map((item, key) => (
                    <MovieItem key={key} {...item} />
                ))}
            </MovieList>
        </Layout>
    );
};

const Layout = props => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                {props.children}
            </div>
        </section>
    );
};

const Heading = props => {
    return (
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Movie Collection
            </h1>

            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                Explore the whole collection of movies
            </p>
        </div>
    );
};

const Filter = (props) => {
    function handleClick(sort, button) {
        props.onFilterClick(sort, button);
    }

    return (
        <div className="flex items-start">
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400 self-start">
                Sort by:
            </p>
            <button
                style={{backgroundColor: props.activeButton === 'button1' ? 'gold' : 'white'}}
                onClick={() => handleClick('release_date', 'button1')}
                className="ml-2 bg-white border border-black text-black py-2 px-4 rounded -mt-1"
            >
                Release Date
            </button>
            <button
                style={{backgroundColor: props.activeButton === 'button2' ? 'gold' : 'white'}}
                onClick={() => handleClick('rating', 'button2')}
                className="ml-2 bg-white border border-black text-black py-2 px-4 rounded -mt-1"
            >
                Rating
            </button>
        </div>
    );
};

const GenreList = (props) => {
    const handleSelect = (event) => {
        props.onSelect(event.target.value);
    }

    return (
        <div className="flex items-start">
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400 self-start">
                Select Genre:
            </p>
            <select className="-mt-1 ml-2" onChange={handleSelect}>
                <option key="0">Select</option>
                {props.genres && props.genres.map((genre, index) => (
                    <option key={index}>{genre.id}</option>
                ))}
            </select>
        </div>
    );
};

const MovieList = props => {
    if (props.loading) {
        return (
            <div className="text-center">
                <Spinner size="xl"/>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
            {props.children}
        </div>
    );
};

const MovieItem = props => {
    return (
        <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
            <div className="grow">
                <img
                    className="object-cover w-full h-60 md:h-80"
                    src={props.image}
                    alt={props.title}
                    loading="lazy"
                />
            </div>

            <div className="grow flex flex-col h-full p-3">
                <div className="grow mb-3 last:mb-0">
                    {props.year || props.rating
                        ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
                            <span>{props.year}</span>

                            {props.rating
                                ? <Rating>
                                    <Rating.Star/>

                                    <span className="ml-0.5">
                            {props.rating}
                          </span>
                                </Rating>
                                : null
                            }
                        </div>
                        : null
                    }

                    <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
                        {props.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
                        {props.plot.substr(0, 80)}...
                    </p>
                </div>

                {props.wikipedia_url
                    ? <Button
                        color="light"
                        size="xs"
                        className="w-full"
                        onClick={() => window.open(props.wikipedia_url, '_blank')}
                    >
                        More
                    </Button>
                    : null
                }
            </div>
        </div>
    );
};

export default Index;
