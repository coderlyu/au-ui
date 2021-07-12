import navConfig from './nav.config'

const loadDocs = function (name) {
  return require(`./docs/${name}.md`)
}

const registerRoute = (navConfig) => {
  const route = []
  route.push({
    path: '/component',
    redirect: '/component/installation',
    component: () => import('./pages/component.vue'),
    children: []
  })
  navConfig.forEach(nav => {
    if (nav.href) return
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  function addRoute (page) {
    const _path = page.path.startsWith('/') ? page.path.slice(1) : page.path
    const component = loadDocs(_path)
    const child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    }

    route[0].children.push(child)
  }

  return route
}

let route = registerRoute(navConfig)

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
})

route = route.concat([{
  path: '*',
  redirect: '/component/roll'
}])

export default route
