/**
 * router.js file used to specify all the routes in the mobile app
 */
import {createRouter, createWebHistory} from '@ionic/vue-router';
import store from '../store'
import Storage from '../store/storage'

export function setupRouter() {

  /**
   * Meta Tags
   *
   * requireAuth = true will requre the user to be logged in to view the page
   * swipeMenu = false will disable the swipe menu button to invoke still works
   * restrictDemo = true will not allow the demo account to access this page
   *
   * @type {Router}
   */
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
      {
        path: '/',
        redirect: '/page1'
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import(/* webpackChunkName: "TgLogin" */'@/views/Page1'),
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import(/* webpackChunkName: "TgLogin" */'@/views/Page2'),
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import(/* webpackChunkName: "TgLogin" */'@/views/Page3'),
      },
      {
        path: '/tabs/',
        name: 'tabs',
        component: () => import(/* webpackChunkName: "TgLogin" */'@/views/Tabs'),
        children: [
          {
            path: '',
            redirect: '/tabs/tab1'
          },
          {
            path: 'tab1',
            name: 'tab1',
            component: () => import('@/views/Tab1.vue')
          },
          {
            path: 'tab2',
            component: () => import('@/views/Tab2.vue')
          },
          {
            path: 'tab3',
            component: () => import('@/views/Tab3.vue')
          }
        ]
      }
    ],
  });

  router.historyStack = [];

  router.beforeEach((to, from, next) => {
    //keep track
    if (router.historyStack.length === 0) {
      router.historyStack.push(to);
    } else {
      //get last
      let lastRoute        = router.historyStack[router.historyStack.length - 1];
      let twoRoutesAgo     = router.historyStack.length > 1 ? router.historyStack[router.historyStack.length - 2] : null;
      let isBackNavigation = twoRoutesAgo !== null && twoRoutesAgo.path === to.path;
      if (isBackNavigation) {
        //pop the current one?
        console.log('User navigated back to:', to.path);
        router.historyStack.pop();
      } else if (lastRoute.path === to.path) {
        //going to same route
        console.log('User navigated to same path as before?:', to.path);
      } else {
        console.log('User navigated to:', to.path);
        router.historyStack.push(to);
      }
    }

    if (from) {
      Storage.set('router.from.name', from.name)
    }
    if (to.meta.requireAuth === true) {
      if (store.state.users.authLoaded === false) {
        store.dispatch('users/loadAuth')
          .then(() => {
            if (store.getters['users/getLoggedIn'] === false
              || (to.meta.restrictDemo === true && store.state.users.isDemo === true)
            ) {
              next({name: 'logout'});
              return;
            }
            next();
          })
          .catch(() => {
            next({name: 'logout'});
          });
        return;
      } else if (store.getters['users/getLoggedIn'] === false
        || (to.meta.restrictDemo === true && store.state.users.isDemo === true)
      ) {
        next({name: 'logout'});
        return;
      }
    }

    next();
  });

  router.goBackTo = function (route) {
    let routeIndex   = null,
        historyStack = router.historyStack;

    for (let i = historyStack.length - 1; i >= 0; i--) {
      let _route = historyStack[i];
      if (_route.name === route.name) {
        routeIndex = i;
        break;
      }
    }

    if (routeIndex === null) {
      console.log('Could not find:', route.name, ' in stack.');
      router.replace(route)
      return;
    }

    let indexesToPop = historyStack.length - routeIndex,
        goBack       = -(indexesToPop - 1);
    router.historyStack.splice(routeIndex, indexesToPop);

    router.go(goBack);
    console.log('Should go back:', goBack, ' to index of:', routeIndex, ' should remove indexes:', indexesToPop);
  }
  return router;
}


