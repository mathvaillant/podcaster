// Base
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Types
import { IPodCast } from "/@/Types/Podcast";

// Hooks
import useGlobalStore from "/@/Context/Global/Global.hook";

// Services
import PodcastServices from "/@/Services/PodcastsService";

export default function usePodcastDetails() {
  const [_, setStore] = useGlobalStore();
  const { podcastId = null } = useParams();

  const [podcast, setPodcast] = useState<IPodCast | null>(null);

  const fetchPodcast = useCallback(async () => {
    setStore({ globalLoader: "loading" });

    if (!podcastId) return;

    const data = await PodcastServices.getAll();
    const podcast = data.feed.entry.find(
      (entry: any) => entry.id.attributes["im:id"] === podcastId
    ) as unknown as IPodCast;

    setPodcast(podcast);
    setStore({ globalLoader: "idle" });
  }, [podcastId]);

  useEffect(() => {
    fetchPodcast();
  }, [fetchPodcast]);

  return { podcast };
}
