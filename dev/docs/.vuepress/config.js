
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
        title: "Angular 菜比八筆記",
        path: "/angular/angular-beginner-note",
        children: [
          {
            title: "Angular 筆記",
            path: "/angular/angular-beginner-note/",
            children: [
              "/angular/angular-beginner-note/",
              "/angular/angular-beginner-note/pipe",
              "/angular/angular-beginner-note/rxjs",
              "/angular/angular-beginner-note/directives",
              "/angular/angular-beginner-note/dataBinding",
              "/angular/angular-beginner-note/nameCalled",
              "/angular/angular-beginner-note/deploy",
            ],
          },
          {
            title: "Angular Form 筆記",
            path: "/angular/react-form/",
            children: [
              "/angular/react-form/",
              "/angular/react-form/reactForm1",
              "/angular/react-form/reactForm2",
              "/angular/react-form/reactForm3",
              "/angular/react-form/reactForm4",
              "/angular/react-form/reactForm5",
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
            path: "/angular/angular-pollex/",
            children: [
              "/angular/angular-pollex/",
              "/angular/angular-pollex/week1",
              "/angular/angular-pollex/week2",
              "/angular/angular-pollex/week3",
              "/angular/angular-pollex/week4",
            ],
          },
          {
            title: "Angular Project",
            path: "/angular/angular-project/",
            children: [
              "/angular/angular-project/",
              "/angular/angular-project/formQuestions",
            ],
          },
        ]
      },
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
        path: "/others/webpack4-environment-setup/webpack1",
        children: [
          {
            title: "webpack4 環境建置",
            path: "/others/webpack4-environment-setup/webpack1",
            children: [
              "/others/webpack4-environment-setup/webpack1",
              "/others/webpack4-environment-setup/webpack2",
              "/others/webpack4-environment-setup/webpack3",
              "/others/webpack4-environment-setup/webpack4",
              "/others/webpack4-environment-setup/webpack5",
              "/others/webpack4-environment-setup/webpack6",
              "/others/webpack4-environment-setup/webpack7",
              "/others/webpack4-environment-setup/webpack8",
              "/others/webpack4-environment-setup/webpack9",
            ],
          },
          {
            title: "Typescript 筆記",
            path: "/others/typescript/",
            children: ["/others/typescript/"],
          },
          {
            title: "Vuepress 筆記",
            path: "/others/vuepress-note/",
            children: ["/others/vuepress-note/"],
          },
          {
            title: "Markdown 筆記",
            path: "/others/markdown/",
            children: [
              "/others/markdown/",
              "/others/markdown/GoogleMarkDownSpec",
            ],
          },
          {
            title: "PWA 筆記",
            path: "/others/pwa/",
            children: ["/others/pwa/"],
          },
          {
            title: "疑難雜症",
            path: "/others/problems/concept",
            children: [
              "/others/problems/concept",
              "/others/problems/filter",
              "/others/problems/duplicate",
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
