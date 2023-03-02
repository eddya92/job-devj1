<?php
declare(strict_types=1);

namespace App\Repository;

interface MovieRepository
{
    /**
     * Restituisce l'elenco dei film ordinato in base al parametro passato<br>
     * è possibile passare "rating" o "release_date"<br>
     *
     * inoltre è possibile passare un genere che può essere anche una stringa vuota
     *
     * @param string $sort
     * @param string $genre
     * @return array
     */
    function allSortedBy(string $sort, string $genre): array;

}