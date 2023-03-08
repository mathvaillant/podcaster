//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Home from "./Pages/Home/Home.component";
import PodcastDetails from "./Pages/PodcastDetails/PodcastDetails.component";
import PodcastEpisodes from "/@/Components/PodcastEpisodes/PodcastEpisodes";
import PodcastEpisode from "/@/Components/PodcastEpisode/PodcastEpisode";
import NotFound from "./Pages/NotFound";

// Context
import GlobalContextProvider from "./Context/Global/Global.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "podcasts/:podcastId",
    element: <PodcastDetails />,
    errorElement: <NotFound message="Podcast currently unavailable!" />,
    children: [
      {
        index: true,
        element: <PodcastEpisodes />
      },
      {
        path: "episode/:episodeId",
        errorElement: <NotFound message="Podcast episode not found!" />,
        element: <PodcastEpisode />
      }
    ]
  },
  {
    path: "*",
    errorElement: <NotFound message="Page not found!" />
  }
]);

export default function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
}
