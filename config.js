var langs = [
  {title: 'Español', path: '/'},

]

self.$config = {
  title: 'Culqi API v2',
  repo: 'culqi/api-docs',
  // to show h2 to h3 only
  tocVisibleDepth: 3,
  twitter: 'CulqiOficial',
  nav: {
    default: [
      {
        title: 'Inicio', path: '/'
      },
    ],

  },

  plugins: [

    disqus({
      shortname: 'culqiapi'
    })
  ]
}
