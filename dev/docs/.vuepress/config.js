module.exports = {
  title: 'Raquel Blog',
  description: 'coding blog',
  base:'/blog/',
  themeConfig: {
    sidebar:[
      ['/', '首頁'],
      {
        title:'疑難雜症',
        path:'/problems/',
        children:
        ['/problems/js_maps_computed.md']
      },
      {
        title:'cate2_nest',
        path:'/cate2/',
        children:[
          '/cate2/test1.md',
          '/cate2/test2.md',
        ]
      }
    ]
  }
}
