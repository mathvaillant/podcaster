import PodcastServices from "/@/Services/PodcastsService";

export default async function loader() {
  const {
    feed: { entry }
  } = await PodcastServices.getAll();

  return { podcasts: entry };
}
