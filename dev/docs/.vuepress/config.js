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
        path:'/Vuepress_note/',
        children:[
          '/Vuepress_note/install.md',
          '/Vuepress_note/test2.md',
        ]
      }
    ]
  }
}
