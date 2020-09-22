interface ITweet {
  full_text: string;
  created_at: Date;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: ITweetEntities;
  extended_entities: ITweetEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: IUser;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  lang: string;
  retweeted_status?: ITweet;
}

interface ITweetEntities {
  hashtags: IHashtag[];
  symbols: any[];
  user_mentions: IUserMention[];
  urls: IURL[];
  media: IMedia[];
}

interface IHashtag {
  text: string;
  indices: number[];
}

interface IMedia {
  video_info: any;
  id : number;
  id_str : string;
  indices : number[];
  media_url : string;
  media_url_https : string;
  url : string;
  display_url : string;
  expanded_url : string;
  type : string;
  source_status_id : string;
  source_status_id_str : string;
  source_user_id : string;
  source_user_id_str : string;
}

interface IURL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

interface IUserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

interface IUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: IUserEntities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: Date;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: null;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
}

interface IUserEntities {
  url: IDescription;
  description: IDescription;
}

interface IDescription {
  urls: URL[];
}

export type {
  ITweet,
  IDescription,
  IHashtag,
  ITweetEntities,
  IURL,
  IUser,
  IUserEntities,
  IUserMention,
};
