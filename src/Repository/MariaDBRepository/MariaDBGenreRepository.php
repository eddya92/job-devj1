<?php
declare(strict_types=1);

namespace App\Repository\MariaDBRepository;

use App\Repository\GenreRepository;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;

class MariaDBGenreRepository implements GenreRepository
{
    public function __construct(
        private Connection $db
    )
    {
    }

    /**
     *
     * @inheritDoc
     * @return array
     * @throws Exception
     */
    function getAll(): array
    {
        return $this->db->createQueryBuilder()
            ->select("g.*")
            ->from("genres", "g")
            ->orderBy("g.id", "DESC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();
    }

    /**
     *
     * @inheritDoc
     * @return array
     * @throws Exception
     */
    function getAllMovieRelated(): array
    {
        return $this->db->createQueryBuilder()
            ->select("g.*")
            ->from("genres", "g")
            ->distinct()
            ->orderBy("g.id", "ASC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();
    }
}