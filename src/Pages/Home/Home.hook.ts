// Base
import { useCallback, useEffect, useMemo, useState } from "react";

// Hooks
import useGlobalStore from "/@/Context/Global/Global.hook";

// Services
import PodcastServices from "/@/Services/PodcastsService";

export default function useHome() {
  const [_, setStore] = useGlobalStore();
  const [podcasts, setPodcasts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const fetchPodcasts = useCallback(async () => {
    setStore({ globalLoader: "loading" });

    const {
      feed: { entry }
    } = await PodcastServices.getAll();

    setPodcasts(entry);
    setStore({ globalLoader: "idle" });
  }, []);

  const filteredData = useMemo(
    () =>
      podcasts.filter((podcast: any) => {
        if (
          podcast["im:name"].label.toLowerCase().includes(filterValue) ||
          podcast["im:artist"].label.toLowerCase().includes(filterValue)
        )
          return true;
        return false;
      }),
    [podcasts, filterValue]
  );

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFilterValue(e.target.value);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  return { podcasts: filteredData, handleFilter };
}
