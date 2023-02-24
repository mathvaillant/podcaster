import PodcastServices from "/@/Services/PodcastsService";

export default async function loader({ params }: { params: any }) {
  const { podcastId = null, episodeId = null } = params;

  if (episodeId && podcastId) {
    const episode = await PodcastServices.getEpisodeById(
      podcastId,
      Number(episodeId)
    );
    return { episode };
  }
}
