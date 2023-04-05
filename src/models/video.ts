export interface VideoRoot {
  id: number;
  cover: string;
  name: string;
  playCount: number;
  briefDesc: any;
  desc: any;
  artistName: string;
  artistId: number;
  duration: number;
  mark: number;
  mv: Mv;
  lastRank: number;
  score: number;
  subed: boolean;
  artists: Artist2[];
}

interface Mv {
  authId: number;
  status: number;
  id: number;
  title: string;
  subTitle: string;
  appTitle: string;
  aliaName: string;
  transName: string;
  pic4v3: number;
  pic16v9: number;
  caption: number;
  captionLanguage: string;
  style: any;
  mottos: string;
  oneword: any;
  appword: string;
  stars: any;
  desc: string;
  area: string;
  type: string;
  subType: string;
  neteaseonly: number;
  upban: number;
  topWeeks: string;
  publishTime: string;
  online: number;
  score: number;
  plays: number;
  monthplays: number;
  weekplays: number;
  dayplays: number;
  fee: number;
  artists: Artist[];
  videos: Video[];
}

interface Artist {
  id: number;
  name: string;
}

interface Video {
  tagSign: TagSign;
  tag: string;
  url: string;
  duration: number;
  size: number;
  width: number;
  height: number;
  container: string;
  md5: string;
  check: boolean;
}

export interface TagSign {
  br: number;
  type: string;
  tagSign: string;
  mvtype: string;
  resolution: number;
}

export interface Artist2 {
  id: number;
  name: string;
}
