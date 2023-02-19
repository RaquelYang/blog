
module.exports = {
  title: "Raquel Blog",
  description: "coding blog",
  base: "/blog/",
  logo: "./public/favicon.ico",
  theme: 'yuu',
  themeConfig: {
    nav: [
      {
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
        title: "Vue 技術筆記",
        path: "/vue/",
        children: [
          "/vue/",
          {
            title: "Vue2 筆記",
            path: "/vue/vue2/",
            children: [
              "/vue/vue2/",
              "/vue/vue2/dataflow.md",
              "/vue/vue2/lifecycle.md",
              "/vue/vue2/nuxt.md",
              "/vue/vue2/vuex.md",
              "/vue/vue2/depoly.md",
            ],
          },
          {
            title: "Vue3 筆記",
            path: "/vue/vue3/",
            children: ["/vue/vue3/", "/vue/vue3/vite.md"],
          },
          {
            title: "Firebase 筆記",
            path: "/vue/firebase/",
            children: ["/vue/firebase/",
              "/vue/firebase/calendar1.md",
              "/vue/firebase/calendar2.md",
              "/vue/firebase/calendar3.md",
              "/vue/firebase/calendar4.md",
            ],
          },
        ]
      },
      {
        title: "Angular 技術筆記",
        path: "/angular/",
        children: [
          "/angular/angular/",
          {
            title: "Angular 筆記",
            path: "/angular/angular/",
            children: [
              "/angular/angular/",
              "/angular/angular/pipe.md",
              "/angular/angular/rxjs.md",
              "/angular/angular/directives.md",
              "/angular/angular/databinding.md",
              "/angular/angular/form.md",
              "/angular/angular/form2.md",
              "/angular/angular/nameCalled.md",
              "/angular/angular/reactForm.md",
              "/angular/angular/deploy.md",
            ],
          },
          {
            title: "Material 筆記",
            path: "/angular/material/",
            children: [
              "/angular/material/",
            ],
          },
          {
            title: "Angular Pollex",
            path: "/angular/angular_pollex/",
            children: [
              "/angular/angular_pollex/",
              "/angular/angular_pollex/week1",
              "/angular/angular_pollex/week2",
              "/angular/angular_pollex/week3",
              "/angular/angular_pollex/week4",
            ],
          },
          {
            title: "Angular Project",
            path: "/angular/angular_project/",
            children: [
              "/angular/angular_project/",
              "/angular/angular_project/formQuestions.md",
            ],
          },
        ]
      },
      {
        title: "其他筆記",
        path: "/others/",
        children: [
          "/others/",
          {
            title: "webpack4 環境建置",
            path: "/others/webpack4_environment_setup/",
            children: [
              "/others/webpack4_environment_setup/",
              "/others/webpack4_environment_setup/webpack-part2",
              "/others/webpack4_environment_setup/webpack-part3",
              "/others/webpack4_environment_setup/webpack-part4",
              "/others/webpack4_environment_setup/webpack-part5",
              "/others/webpack4_environment_setup/webpack-part6",
              "/others/webpack4_environment_setup/webpack-part7",
              "/others/webpack4_environment_setup/webpack-part8",
              "/others/webpack4_environment_setup/webpack-part9",
            ],
          },
          {
            title: "Vuepress 筆記",
            path: "/others/vuepress_note/",
            children: ["/others/vuepress_note/"],
          },
          {
            title: "PWA 筆記",
            path: "/others/pwa/",
            children: ["/others/pwa/", "/others/pwa/depoly.md"],
          },
          {
            title: "疑難雜症",
            path: "/others/problems/",
            children: [
              "/others/problems/",
              "/others/problems/js_maps_computed.md",
              "/others/problems/concept.md",
              "/others/problems/filter.md",
              "/others/problems/duplicate.md",
            ],
          },
        ]
      },
      {
        title: "API 筆記",
        path: "/api/",
        children: ["/api/"],
      },
      {
        title: "Typescript 筆記",
        path: "/typescript/",
        children: [
          "/typescript/",
        ],
      },
      {
        title: "樣式筆記",
        path: "/style/",
        children: [
          "/style/",
        ],
      },
    ],
    lastUpdated: 'Last Updated', // string | boolean
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/nprogress',
    ['@vuepress/pwa',  
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['vuepress-plugin-typescript', {
        tsLoaderOptions: {
          transpileOnly: true,
          compilerOptions: {
            'target': 'ES2019',
          },
        }
      }
    ]
  ]
};
