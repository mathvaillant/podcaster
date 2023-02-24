import axios from "axios";

const BASE_URL = "https://itunes.apple.com";

async function getAll() {
  try {
    const prevData = JSON.parse(localStorage.getItem("podcasts_data") as any);
    const yesterday = Number(prevData?.lastUpdate);
    const yesterdayTimestamp =
      new Date(yesterday).getTime() - 24 * 60 * 60 * 1000;
    const nowTimestamp = new Date().getTime();

    if (nowTimestamp < yesterdayTimestamp || !prevData) {
      const { data } = await axios.get(
        `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const podcastsData = { data, lastUpdate: nowTimestamp };
      localStorage.setItem("podcasts_data", JSON.stringify(podcastsData));
      return data;
    } else {
      const { data } = prevData;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getPodcastById(podcastId: string) {
  try {
    const lsKey = `podcast_${podcastId}`;
    const prevData = JSON.parse(localStorage.getItem(lsKey) as any);
    const yesterday = Number(prevData?.lastUpdate);
    const yesterdayTimestamp =
      new Date(yesterday).getTime() - 24 * 60 * 60 * 1000;
    const nowTimestamp = new Date().getTime();

    if (nowTimestamp < yesterdayTimestamp || !prevData) {
      const { data } = await axios.get(
        `${BASE_URL}/lookup?id=${podcastId}&entity=podcastEpisode`,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const podcastData = { data, lastUpdate: nowTimestamp };
      localStorage.setItem(lsKey, JSON.stringify(podcastData));
      return data;
    } else {
      const { data } = prevData;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getEpisodeById(podcastId: string, episodeId: number) {
  try {
    const lsKey = `podcast_${podcastId}_episode_${episodeId}`;
    const prevData = JSON.parse(localStorage.getItem(lsKey) as any);
    const yesterday = Number(prevData?.lastUpdate);
    const yesterdayTimestamp =
      new Date(yesterday).getTime() - 24 * 60 * 60 * 1000;
    const nowTimestamp = new Date().getTime();

    if (nowTimestamp < yesterdayTimestamp || !prevData) {
      const { results } = await getPodcastById(podcastId);
      const episode = results.find((ep: any) => ep.trackId === episodeId);

      const episodeData = { episode, lastUpdate: nowTimestamp };
      localStorage.setItem(lsKey, JSON.stringify(episodeData));
      return episode;
    } else {
      const { episode } = prevData;
      return episode;
    }
  } catch (error) {
    console.error(error);
  }
}

const PodcastServices = {
  getAll,
  getPodcastById,
  getEpisodeById
};

export default PodcastServices;
