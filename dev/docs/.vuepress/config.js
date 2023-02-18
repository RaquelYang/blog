
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
            title: "Vue child",
            path: "/vue2/",
            children: ["/vue/vue2/"]
          }
        ]
      },
      {
        title: "webpack4 環境建置",
        path: "/webpack4_environment_setup/",
        children: [
          "/webpack4_environment_setup/",
          "/webpack4_environment_setup/webpack-part2",
          "/webpack4_environment_setup/webpack-part3",
          "/webpack4_environment_setup/webpack-part4",
          "/webpack4_environment_setup/webpack-part5",
          "/webpack4_environment_setup/webpack-part6",
          "/webpack4_environment_setup/webpack-part7",
          "/webpack4_environment_setup/webpack-part8",
          "/webpack4_environment_setup/webpack-part9",
        ],
      },
      {
        title: "Angular Pollex",
        path: "/angular_pollex/",
        children: [
          "/angular_pollex/",
          "/angular_pollex/week1",
          "/angular_pollex/week2",
          "/angular_pollex/week3",
          "/angular_pollex/week4",
        ],
      },
      {
        title: "Angular Project",
        path: "/angular_project/",
        children: [
          "/angular_project/",
          "/angular_project/formQuestions.md",
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
          "/angular/form.md",
          "/angular/form2.md",
          "/angular/nameCalled.md",
          "/angular/reactForm.md",
          "/angular/deploy.md",
        ],
      },
      {
        title: "疑難雜症",
        path: "/problems/",
        children: [
          "/problems/",
          "/problems/js_maps_computed.md",
          "/problems/concept.md",
          "/problems/filter.md",
          "/problems/duplicate.md",
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
        title: "Typescript 筆記",
        path: "/typescript/",
        children: [
          "/typescript/",
        ],
      },
      {
        title: "Material 筆記",
        path: "/material/",
        children: [
          "/material/",
        ],
      },
      {
        title: "CSS style",
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
