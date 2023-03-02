<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Repository\MovieRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository
    )
    {
    }

    #[Route('/api/movies')]
    public function list(Request $request): Response
    {
        $sort = $request->query->get('order_by');
        $genre = $request->query->get('genre');

        try {
            $movies = $this->movieRepository->allSortedBy($sort, $genre);
        } catch (Exception $exception) {
            //Todo componente pagina di errore
            $movies = [];
        }

        return $this->json([
            "movies" => $movies
        ]);
    }
}
