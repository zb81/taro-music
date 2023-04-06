export default defineAppConfig({
  pages: [
    "pages/main-music/index",
    "pages/main-video/index",
    "pages/detail-video/index",
    "pages/detail-songs/index",
    "pages/music-player/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fafafa",
    navigationBarTitleText: "Taro Music",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/main-music/index",
        iconPath: "assets/images/tabbar/music_normal.png",
        selectedIconPath: "assets/images/tabbar/music_active.png",
        text: "音乐",
      },
      {
        pagePath: "pages/main-video/index",
        iconPath: "assets/images/tabbar/video_normal.png",
        selectedIconPath: "assets/images/tabbar/video_active.png",
        text: "视频",
      },
    ],
  },
});
