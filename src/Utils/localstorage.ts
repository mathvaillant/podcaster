/**

Middleware function that checks if data exists in localStorage, and if it's not stale, returns it. Otherwise, it calls the provided refetcher function to get new data and saves it to localStorage before returning it.
@function
@async
@param {string} lsKey - The key to use for the data in localStorage.
@param {function} refetcher - The function to call to get new data if the data in localStorage is stale or non-existent.
@returns {Promise<any>} - A Promise that resolves with the data either from localStorage or the refetcher function.
@example
const data = await localStorageMiddleware("myData", () => {
return axios.get("/api/my-data");
});
*/

export const localStorageMiddleware = async (
  lsKey: string,
  refetcher: () => Promise<any>
) => {
  const prevData = JSON.parse(localStorage.getItem(lsKey) as any);
  const lastUpdateTime = Number(prevData?.lastUpdate);

  const now = new Date().getTime();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  if (oneDayAgo > lastUpdateTime || !prevData) {
    const { data } = await refetcher();

    const new_content = { data, lastUpdate: now };
    localStorage.setItem(lsKey, JSON.stringify(new_content));
    return data;
  } else {
    const { data } = prevData;
    return data;
  }
};
