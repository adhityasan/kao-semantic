import Authentication from '@views/Authentication/Authentication'
import NotFound from '@views/Error/public_notfound'

const r_Authentication = {
  path: '/',
  exact: true,
  component: Authentication
}

const r_Notfound = {
  path: '*',
  component: NotFound
}

const publicRoutes = [
  r_Authentication,
  r_Notfound
]

export default publicRoutes