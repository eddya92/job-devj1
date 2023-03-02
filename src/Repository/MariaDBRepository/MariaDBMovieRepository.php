<?php
declare(strict_types=1);

namespace App\Repository\MariaDBRepository;

use App\Repository\MovieRepository;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;

class MariaDBMovieRepository implements MovieRepository
{
    public function __construct(
        private Connection $db
    )
    {
    }


    /**
     * @inheritDoc
     * @return array
     * @throws Exception
     */
    function allSortedBy(string $sort, string $genre): array
    {
        $qb = $this->db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m");

        if (!empty($genre)) {
            $qb->innerJoin("m", "movies_genres", "mg", "m.id = mg.movie_id")
                ->innerJoin("mg", "genres", "g", "mg.genre_id = g.id")
                ->where("g.id = :genre")
                ->setParameter("genre", $genre);
        }

        $qb->orderBy("m." . $sort, "DESC")
            ->setMaxResults(50);

        return $qb->executeQuery()->fetchAllAssociative();
    }
}