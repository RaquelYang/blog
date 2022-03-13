module.exports = {
  title: 'Raquel Blog',
  description: 'coding blog',
  base:'/blog/',
  logo:'./public/favicon.ico',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: 'Github', link: 'https://github.com/RaquelYang' }
    ],
    sidebar:[
      ['/', '首頁'],
      {
        title:'疑難雜症',
        path:'/problems/',
        children:
        ['/problems/js_maps_computed.md']
      },
      {
        title:'Vuepress 筆記',
        path:'/vuepress_note/',
        children:[
          '/vuepress_note/install.md',
          '/vuepress_note/test2.md',
        ]
      },
      {
        title:'Vue2 筆記',
        path:'/vue/',
        children:[
          '/vue/dataflow.md',
          '/vue/lifecycle.md',
          '/vue/nuxt.md',
          '/vue/vuex.md',
        ]
      }
    ]
  }
}
