//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Home from "/@/Pages/Home/Home";
import PodcastEpisodes from "./Components/PodcastEpisodes/PodcastEpisodes";
import PodcastDetails from "/@/Pages/PodcastDetails/PodcastDetails";
import PodcastEpisode from "./Components/PodcastEpisode/PodcastEpisode";
import NotFound from "./Pages/NotFound";

// Loaders
import homeLoader from "/@/Pages/Home/Loader";
import podcastLoader from "/@/Pages/PodcastDetails/Loader";
import episodesLoader from "/@/Components/PodcastEpisodes/Loader";
import episodeLoader from "/@/Components/PodcastEpisode/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    errorElement: <NotFound />
  },
  {
    path: "podcasts/:podcastId",
    element: <PodcastDetails />,
    loader: podcastLoader,
    errorElement: <NotFound message="Podcast currently unavailable!" />,
    children: [
      {
        index: true,
        loader: episodesLoader,
        element: <PodcastEpisodes />
      },
      {
        path: "episode/:episodeId",
        errorElement: <NotFound message="Podcast episode not found!" />,
        element: <PodcastEpisode />,
        loader: episodeLoader
      }
    ]
  },
  {
    path: "*",
    errorElement: <NotFound message="Page not found!" />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
