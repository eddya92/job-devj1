<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Repository\GenreRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GenresController extends AbstractController
{
    public function __construct(
        private GenreRepository $genreRepository
    )
    {
    }

    #[Route('/api/genres')]
    public function listRelated(): Response
    {
        try {
            $genres = $this->genreRepository->getAllMovieRelated();
        } catch (Exception $exception) {
            //Todo componente pagina di errore
            $genres = [];
        }

        return $this->json([
            "genres" => $genres
        ]);
    }
}
