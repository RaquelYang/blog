module.exports = {
  theme: 'vuepress-theme-default-prefers-color-scheme',
  themeConfig:{
    repo:'https://github.com/RaquelYang/blog.git',
    repoLabel: '練習使用 vuepress 製作 blog',
    sidebar: [
      ['/','首頁'],
    ]
  },
  title: 'Hello VuePress',
  description: 'Just playing around',
  base:'/blog/',
  dest: 'docs',
  logo:'./public/logo.ico',
  plugins: [
    '@vuepress/back-to-top'
  ]
}
