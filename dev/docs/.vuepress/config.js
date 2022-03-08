module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  base:'/blog/',
  themeConfig: {
    sidebar:[
      ['/', '首頁'],
      ['/cate1/', 'cate1'],
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
