module.exports = {
  title: "Raquel Blog",
  description: "coding blog",
  base: "/blog/",
  logo: "./public/favicon.ico",
  themeConfig: {
    nav: [{
        text: "首頁",
        link: "/"
      },
      {
        text: "Github",
        link: "https://github.com/RaquelYang"
      },
    ],
    sidebar: [
      ["/", "首頁"],
      {
        title: "疑難雜症",
        path: "/problems/",
        children: [
          "/problems/",
          "/problems/js_maps_computed.md",
          "/problems/concept.md",
          "/problems/filter.md",
        ],
      },
      {
        title: "Vuepress 筆記",
        path: "/vuepress_note/",
        children: ["/vuepress_note/"],
      },
      {
        title: "Vue2 筆記",
        path: "/vue2/",
        children: [
          "/vue2/",
          "/vue2/dataflow.md",
          "/vue2/lifecycle.md",
          "/vue2/nuxt.md",
          "/vue2/vuex.md",
          "/vue2/depoly.md",
        ],
      },
      {
        title: "Vue3 筆記",
        path: "/vue3/",
        children: ["/vue3/", "/vue3/vite.md"],
      },
      {
        title: "PWA 筆記",
        path: "/pwa/",
        children: ["/pwa/", "/pwa/depoly.md"],
      },
      {
        title: "AJAX 筆記",
        path: "/ajax/",
        children: ["/ajax/"],
      },
      {
        title: "Firebase 筆記",
        path: "/firebase/",
        children: ["/firebase/",
          "/firebase/calendar1.md",
          "/firebase/calendar2.md",
          "/firebase/calendar3.md",
          "/firebase/calendar4.md",
        ],
      },
      {
        title: "Angular 筆記",
        path: "/angular/",
        children: [
          "/angular/",
          "/angular/pipe.md",
          "/angular/rxjs.md",
          "/angular/directives.md",
          "/angular/databinding.md",
        ],
      },
      {
        title: "Typescript 筆記",
        path: "/typescript/",
        children: [
          "/typescript/",
        ],
      }
    ],
  },
};
