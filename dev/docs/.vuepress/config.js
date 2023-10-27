
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
      {
        title: "Angular 技術筆記",
        path: "/angular/",
        children: [
          {
            title: "Angular 筆記",
            path: "/angular/angular/",
            children: [
              "/angular/angular/",
              "/angular/angular/pipe.md",
              "/angular/angular/rxjs.md",
              "/angular/angular/directives.md",
              "/angular/angular/databinding.md",
              "/angular/angular/nameCalled.md",
              "/angular/angular/deploy.md",
            ],
          },
          {
            title: "Angular Form 筆記",
            path: "/angular/react_form/",
            children: [
              "/angular/react_form/",
              "/angular/react_form/react_form1.md",
              "/angular/react_form/react_form2.md",
              "/angular/react_form/react_form3.md",
              "/angular/react_form/react_form4.md",
              "/angular/react_form/react_form5.md",
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
      // {
      //   title: "Typescript 筆記",
      //   path: "/typescript/",
      //   children: [
      //     "/typescript/",
      //   ],
      // },
      {
        title: "Style 筆記",
        path: "/style/grid",
        children: [
          "/style/grid",
        ],
      },
      {
        title: "API 筆記",
        path: "/api/rxjs",
        children: [
          "/api/",
          {
            title: "Rxjs 筆記",
            path: "/api/rxjs/",
          }
          ],
      }, 
      {
        title: "其他筆記",
        path: "/others/webpack4_environment_setup/webpack-part1",
        children: [
          {
            title: "webpack4 環境建置",
            path: "/others/webpack4_environment_setup/webpack-part1",
            children: [
              "/others/webpack4_environment_setup/webpack-part1",
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
            title: "Typescript 筆記",
            path: "/others/typescript/",
            children: ["/others/typescript/"],
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
        title: "Vue 技術筆記",
        path: "/vue/vite",
        children: [
          "/vue/vite",
          "/vue/nuxt",
          {
            title: "Vue2 筆記",
            path: "/vue/vue2/dataflow",
            children: [
              "/vue/vue2/dataflow",
              "/vue/vue2/lifecycle",
              "/vue/vue2/vuex",
              "/vue/vue2/deploy",
            ],
          },
          {
            title: "Firebase 筆記",
            path: "/vue/firebase/",
            children: ["/vue/firebase/",
              "/vue/firebase/calendar1",
              "/vue/firebase/calendar2",
              "/vue/firebase/calendar3",
              "/vue/firebase/calendar4",
            ],
          },
        ]
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
