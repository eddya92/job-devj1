<?php
declare(strict_types=1);

namespace App\Repository;

interface GenreRepository
{

    /**
     * Restituisce l'elenco delle categorie presenti
     *
     * @return array
     */
    function getAll(): array;

    /**
     * Restituisce l'elenco delle categorie (prendendo in considerazione solo i film presenti)
     *
     * @return array
     */
    function getAllMovieRelated(): array;
}