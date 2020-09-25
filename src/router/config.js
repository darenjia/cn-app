import MainPage from '../components/MainPage';
import DetailCard from '../components/first/DetailCard';
const router = [
  {
    path: '/',
    name: '首页',
    component: MainPage,
    redirect: 'first',
    children: [
      {
        path: 'first',
        name: '1',
        components: {
          left: () => import('../components/first/LeftPage.vue'),
          right: () => import('../components/first/StatisticDiseaseDetail.vue'),
          center: DetailCard,
        },
      },
      {
        path: 'second',
        name: '2',
        components: {
          left: () => import('../components/second/LeftPage.vue'),
          right: () => import('../components/second/RightPage.vue'),
          center: DetailCard,
        },
      },
      {
        path: 'third',
        name: '3',
        components: {
          left: () => import('../components/third/LeftPage.vue'),
          right: () => import('../components/third/RightPage.vue'),
          center: DetailCard,
        },
      },
      {
        path: 'fourth',
        name: '4',
        components: {
          left: () => import('../components/fourth/LeftPage.vue'),
          right: () => import('../components/fourth/RightPage.vue'),
          center: DetailCard,
        },
      },
      {
        path: 'fifth',
        name: '5',
        components: {
          left: () => import('../components/fifth/LeftPage.vue'),
          right: () => import('../components/fifth/LeftPage.vue'),
          center: DetailCard,
        },
      },
    ],
  },
];
export default router;
