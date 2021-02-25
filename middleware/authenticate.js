/* eslint eqeqeq: 0 */

export default function ({ store, redirect }) {
  if (store.state.sessionStorage.loggedIn != true) {
    return redirect('/login')
  }
}
