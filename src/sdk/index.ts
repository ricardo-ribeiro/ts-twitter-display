import { ITweet, IUser } from "./../../interfaces/ITweet";

const getTimelineForUser = (user_id: string): Promise<ITweet[]> =>
  new Promise((resolve, reject) => {
    fetch(`/api/tweets/${encodeURIComponent(user_id)}`)
      .then((r: Response) => r.json())
      .then((r: ITweet[]) => resolve(r))
      .catch((e: Error) => {
        reject(e);
      });
  });
  
const getUsersForScreenName = (screen_name: string): Promise<IUser[]> =>
  new Promise((resolve, reject) => {
    fetch(`/api/twitter/user/${encodeURIComponent(screen_name)}`)
      .then((r: Response) => r.json())
      .then((r: IUser[]) => resolve(r))
      .catch((e: Error) => {
        reject(e);
      });
  });
  
  
  const getLinkMeta = (link: string): Promise<{ title: string, description:string, image: string, favicon: string}> =>
  new Promise((resolve, reject) => {
    fetch(`/api/link/meta?link=${link}`)
      .then((r: Response) => r.json())
      .then((r: { title: string, description:string, image: string, favicon: string}) => resolve(r))
      .catch((e: Error) => {
        reject(e);
      });
  });

  export { getTimelineForUser, getUsersForScreenName, getLinkMeta }