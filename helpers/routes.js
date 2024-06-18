import React from 'react'
import {T} from '../utils/translation'

export const menuRoutes = (desktop = true) => {
  const routes = [
    {
      name: <T ucFirst>menu.doctors</T>,
      link: '/doctors',
      icon: 'circle_dash',
      isDesktop: true
    },
    {
      name: <T ucFirst>menu.clinics</T>,
      link: '/clinics',
      icon: 'plus',
      isDesktop: true
    },
    // {
    //   name: <T ucFirst>menu.analysis</T>,
    //   link: '/tests',
    //   icon: 'document',
    // },
    // {
    //   name: 'Акции',
    //   link: '/promotions',
    //   icon: 'lighting'
    // },
    // {
    //   name: 'Статьи',
    //   link: '/articles',
    //   icon: 'label',
    // },
    {
      name: <T ucFirst>menu.search</T>,
      link: '/search',
      icon: 'search',
      isDesktop: true,
    },
  ]

  let bottomRoutes = [
    {
      name: <T ucFirst>menu.consultation</T>,
      link: '/consultation',
      icon: 'mk_menu',
      isDesktop: true,
    },
    {
      name: <T ucFirst>menu.about</T>,
      link: '/about',
      icon: 'heart_menu'
    },
    {
      name: <T ucFirst>menu.area</T>,
      link: '',
      icon: 'city',
      modal : 'city-area',
    }
  ]

  const topRoutes = routes.filter(({isDesktop}) => (desktop || !isDesktop))
  const currentBottomRoutes = bottomRoutes.filter(({isDesktop}) => (desktop || !isDesktop))

  return [topRoutes, currentBottomRoutes]
}

export const tabsRoutes = () => {
  const leftMenuRoutes = [
    {
      icon: 'main',
      name: <T ucFirst>menu.tabs.main</T>,
      link: '/'
    },
    {
      icon: 'search',
      name: <T ucFirst>menu.tabs.search</T>,
      link: '/search'
    }
  ]

  const rightMenuRoutes = [
    {
      icon: 'mk_menu',
      name: <T ucFirst>menu.tabs.consultation</T>,
      link: '/consultation'
    },
    {
      icon: 'dots',
      name: <T ucFirst>menu.tabs.menu</T>,
      link: '/menu'
    }
  ]

  return [leftMenuRoutes, rightMenuRoutes]
}