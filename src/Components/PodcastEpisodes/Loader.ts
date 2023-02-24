import PodcastServices from "/@/Services/PodcastsService";

export default async function loader({ params }: { params: any }) {
  const { podcastId = null } = params;

  if (podcastId) {
    const { results } = await PodcastServices.getPodcastById(podcastId);
    return {
      episodes: results.filter((pod: any) => pod.kind == "podcast-episode")
    };
  }
}
