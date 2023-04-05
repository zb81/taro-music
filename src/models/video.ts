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

export interface MVURL {
  id: number;
  url: string;
  r: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  fee: number;
  mvFee: number;
  st: number;
  promotionVo: any;
  msg: string;
}

export interface MVDetail {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  briefDesc: string;
  desc: string;
  cover: string;
  coverId_str: string;
  coverId: number;
  playCount: number;
  subCount: number;
  shareCount: number;
  commentCount: number;
  duration: number;
  nType: number;
  publishTime: string;
  price: any;
  brs: Br[];
  artists: Artist[];
  commentThreadId: string;
  videoGroup: any[];
}

interface Br {
  size: number;
  br: number;
  point: number;
}

interface Artist {
  id: number;
  name: string;
  img1v1Url: string;
  followed: boolean;
}

export interface RelatedVideo {
  id: number;
  cover: string;
  name: string;
  playCount: number;
  briefDesc: string;
  desc: any;
  artistName: string;
  artistId: number;
  duration: number;
  mark: number;
  artists: Array<{
    id: number;
    name: string;
    alias: any[];
    transNames: any;
  }>;
  alg: string;
}
