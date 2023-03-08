// Base
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Types
import { IEpisode } from "/@/Types/Podcast";

// Hooks
import useGlobalStore from "/@/Context/Global/Global.hook";

// Services
import PodcastServices from "/@/Services/PodcastsService";

export default function usePodcastEpisodes() {
  const [_, setStore] = useGlobalStore();
  const { podcastId = null } = useParams();

  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

  const fetchEpisodes = useCallback(async () => {
    setStore({ globalLoader: "loading" });

    if (!podcastId) return;

    const { results } = await PodcastServices.getPodcastById(podcastId);
    const episodes = results.filter(
      (pod: any) => pod.kind == "podcast-episode"
    );

    setEpisodes(episodes);
    setStore({ globalLoader: "idle" });
  }, [podcastId]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  return { episodes };
}
