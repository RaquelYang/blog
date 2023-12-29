module.exports = {
  title: "Raquel Blog",
  description: "coding blog",
  base: "/blog/",
  logo: "./public/favicon.ico",
  theme: "yuu",
  themeConfig: {
    nav: [
      {
        text: "首頁",
        link: "/",
      },
      {
        text: "Github",
        link: "https://github.com/RaquelYang",
      },
    ],
    sidebar: [
      {
        title: "Angular Note",
        path: "/angular/angular-beginner/",
        children: [
          {
            title: "Angular Beginner",
            path: "/angular/angular-beginner/",
            children: [
              "/angular/angular-beginner/",
              "/angular/angular-beginner/pipe",
              "/angular/angular-beginner/rxjs",
              "/angular/angular-beginner/directives",
              "/angular/angular-beginner/dataBinding",
              "/angular/angular-beginner/nameCalled",
              "/angular/angular-beginner/deploy",
            ],
          },
          {
            title: "Angular Advanced",
            path: "/angular/angular-advanced/",
            children: ["/angular/angular-advanced/"],
          },
          {
            title: "Angular Form Advanced",
            path: "/angular/angular-form-advanced/",
            children: [
              {
                title: "Angular Reactive Form Advanced",
                path: "/angular/angular-form-advanced/reactive-driven-form/",
              },
              {
                title: "Angular Template Form Advanced",
                path: "/angular/angular-form-advanced/template-driven-form/",
              },
            ],
          },
          {
            title: "Angular Route Advanced",
            path: "/angular/angular-route-advanced/",
            children: ["/angular/angular-route-advanced/"],
          },
        ],
      },
      {
        title: "Style Note",
        path: "/style/grid",
        children: [
          {
            title: "Grid",
            path: "/style/grid",
          },
        ],
      },
      {
        title: "API Note",
        path: "/api/",
        children: [
          "/api/",
          {
            title: "Rxjs Note",
            path: "/api/rxjs/",
          },
        ],
      },
      {
        title: "Others Note",
        path: "/others/webpack4/webpack-ep1",
        children: [
          {
            title: "Webpack4 Environment",
            path: "/others/webpack4/webpack-ep1",
            children: [
              "/others/webpack4/webpack-ep1",
              "/others/webpack4/webpack-ep2",
              "/others/webpack4/webpack-ep3",
              "/others/webpack4/webpack-ep4",
              "/others/webpack4/webpack-ep5",
              "/others/webpack4/webpack-ep6",
              "/others/webpack4/webpack-ep7",
              "/others/webpack4/webpack-ep8",
              "/others/webpack4/webpack-ep9",
            ],
          },
          {
            title: "Typescript Note",
            path: "/others/typescript/",
            children: ["/others/typescript/"],
          },
          {
            title: "Vuepress Note",
            path: "/others/vuepress-note/",
            children: ["/others/vuepress-note/"],
          },
          {
            title: "Markdown Note",
            path: "/others/markdown/",
            children: [
              "/others/markdown/",
              "/others/markdown/GoogleMarkDownSpec",
            ],
          },
          {
            title: "Any issue",
            path: "/others/issues/concept",
            children: [
              "/others/issues/concept",
              "/others/issues/filter",
              "/others/issues/duplicate",
            ],
          },
        ],
      },
      {
        title: "Vue Note",
        path: "/vue/vite",
        children: [
          "/vue/vite",
          "/vue/nuxt",
          {
            title: "Vue2 Note",
            path: "/vue/vue2/dataflow",
            children: [
              "/vue/vue2/dataflow",
              "/vue/vue2/lifecycle",
              "/vue/vue2/vuex",
              "/vue/vue2/deploy",
            ],
          },
          {
            title: "Firebase Note",
            path: "/vue/firebase/",
            children: [
              "/vue/firebase/",
              "/vue/firebase/calendar1",
              "/vue/firebase/calendar2",
              "/vue/firebase/calendar3",
              "/vue/firebase/calendar4",
            ],
          },
        ],
      },
    ],
    lastUpdated: "Last Updated", // string | boolean
  },
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    [
      "vuepress-plugin-typescript",
      {
        tsLoaderOptions: {
          transpileOnly: true,
          compilerOptions: {
            target: "ES2019",
          },
        },
      },
    ],
  ],
};
