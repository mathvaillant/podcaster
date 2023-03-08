import { afterEach, describe, expect, it } from "vitest";

import { localStorageMiddleware } from "../localstorage";

describe("localStorageMiddleware", () => {
  const lsKey = "podcast_test_key";
  const mockData = { data: { podcasts: [{ podcastA: { name: "A" } }] } };

  afterEach(() => {
    localStorage.clear();
  });

  it("Returns data from refetcher when localStorage is empty", async () => {
    const APIResponse = mockData;

    const refetcher = async () => APIResponse;
    const result = await localStorageMiddleware(lsKey, refetcher);

    expect(result).toEqual(APIResponse.data);

    const lsContent = JSON.parse(localStorage.getItem(lsKey) as string);

    expect(lsContent.data).to.deep.equals(APIResponse.data);
    expect(lsContent.lastUpdate).exist.toBeTypeOf("number");
  });

  it("Returns cached data from localStorage when not expired", async () => {
    const data = mockData;
    const lastUpdate = new Date().getTime();
    localStorage.setItem(lsKey, JSON.stringify({ data, lastUpdate }));

    const refetcher = async () => {
      throw new Error("Should not be called");
    };

    const result = await localStorageMiddleware(lsKey, refetcher);

    expect(result).toEqual(data);

    const lsContent = JSON.parse(localStorage.getItem(lsKey) as string);

    expect(lsContent.data).to.deep.equals(data);
    expect(lsContent.lastUpdate).exist.toBeTypeOf("number");
  });

  it("Calls refetcher and updates localStorage when data is expired", async () => {
    const threeDaysAgo = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
    const cachedData = { data: mockData, lastUpdate: threeDaysAgo };

    localStorage.setItem(lsKey, JSON.stringify(cachedData));

    const refetchedData = { data: { podcasts: [{ podcastB: { name: "B" } }] } };
    const refetcher = async () => refetchedData;

    const result = await localStorageMiddleware(lsKey, refetcher);

    expect(result).toEqual(refetchedData.data);
  });
});
