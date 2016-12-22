var langs = [
  {title: 'Español', path: '/'},
  {title: 'English', path: '/eng/'}
]



self.$config = {
  title: 'Culqi API',
  repo: 'culqi/apidocs',
  twitter: 'CulqiOficial',
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs',

  nav: {
  default: [
    {
      title: 'Inicio', path: '/'
    },
    {
      title: 'PHP', path: '/php'
    },
    {
      title: 'Java', path: '/java'
    },
    {
      title: 'NodeJS', path: '/nodejs'
    },
    {
      title: 'Idiomas', type: 'dropdown', items: langs
    }
  ],
  'eng': [
    {
      title: 'Welcome', path: '/eng/'
    },
    {
      title: 'PHP', path: '/php'
    },
    {
      title: 'Java', path: '/java'
    },
    {
      title: 'NodeJS', path: '/nodejs'
    },
    {
      title: 'Languages', type: 'dropdown', items: langs
    }
  ]
}



}
