import PodcastServices from "/@/Services/PodcastsService";

export default async function loader({ params }: { params: any }) {
  const { podcastId = null } = params;

  if (podcastId) {
    const data = await PodcastServices.getAll();
    const podcast = data.feed.entry.find(
      (entry: any) => entry.id.attributes["im:id"] === podcastId
    );
    return { podcast };
  }
}
