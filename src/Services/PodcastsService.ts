import axios from "axios";
import { localStorageMiddleware } from "../Utils/localstorage";

const BASE_URL = "https://itunes.apple.com";

/**

Retrieves all podcasts from local storage if they exist and are not stale, otherwise fetches them from the API
@async
@function getAll
@returns {Promise<Array>} - An array of podcast objects
*/
async function getAll(): Promise<Array<any>> {
  const lsKey = "podcasts-data";

  return await localStorageMiddleware(lsKey, () =>
    axios.get(`${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`, {
      headers: { "Content-Type": "application/json" }
    })
  );
}

/**
Retrieves a single podcast by ID from local storage if it exists and is not stale, otherwise fetches it from the API
@async
@function getPodcastById
@param {string} podcastId - The ID of the podcast to retrieve
@returns {Promise<Object>} - A podcast object
*/
async function getPodcastById(podcastId: string) {
  const lsKey = `podcast_${podcastId}`;

  return await localStorageMiddleware(lsKey, () =>
    axios.get(`${BASE_URL}/lookup?id=${podcastId}&entity=podcastEpisode`, {
      headers: { "Content-Type": "application/json" }
    })
  );
}

/**
Retrieves a single episode of a podcast by ID from local storage if it exists and is not stale, otherwise fetches it from the API
@async
@function getEpisodeById
@param {string} podcastId - The ID of the podcast that the episode belongs to
@param {number} episodeId - The ID of the episode to retrieve
@returns {Promise<Object>} - An episode object
*/
async function getEpisodeById(
  podcastId: string,
  episodeId: number
): Promise<object> {
  const lsKey = `podcast_${podcastId}_episode_${episodeId}`;

  return await localStorageMiddleware(lsKey, async () => {
    const { results } = await getPodcastById(podcastId);
    const episode = results.find((ep: any) => ep.trackId === episodeId);
    return { data: episode };
  });
}

const PodcastServices = {
  getAll,
  getPodcastById,
  getEpisodeById
};

export default PodcastServices;
