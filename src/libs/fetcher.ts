import axios from "axios";

export default async function fetcher(url: string) {
  return await axios.get(url).then((res) => res.data);
}
