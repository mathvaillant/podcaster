// Base
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Types
import { IEpisode } from "/@/Types/Podcast";

// Hooks
import useGlobalStore from "/@/Context/Global/Global.hook";

// Services
import PodcastServices from "/@/Services/PodcastsService";

export default function usePodcastEpisode() {
  const [_, setStore] = useGlobalStore();
  const { podcastId = null, episodeId = null } = useParams();

  const [episode, setEpisode] = useState<IEpisode | null>(null);

  const fetchEpisode = useCallback(async () => {
    setStore({ globalLoader: "loading" });

    if (!(episodeId && podcastId)) return;

    const episode = await PodcastServices.getEpisodeById(
      podcastId,
      Number(episodeId)
    );

    setEpisode(episode);
    setStore({ globalLoader: "idle" });
  }, [podcastId, episodeId]);

  useEffect(() => {
    fetchEpisode();
  }, [fetchEpisode]);

  return { episode };
}
