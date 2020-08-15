import MainPage from "../components/MainPage";
import StatisticFacilityDetail from "../components/StatisticFacilityDetail";
import StatisticDiseaseDetail from "../components/StatisticDiseaseDetail";
import StatisticTaskDetail from "../components/StatisticTaskDetail";
import StatisticPersonDetail from "../components/StatisticPersonDetail";
const router = [{
    path: '/',
    name: '首页',
    component: MainPage,
    children: [{
            path: '1',
            name: '设施',
            component: StatisticFacilityDetail
        },
        {
            path: '2',
            name: '病害',
            component: StatisticDiseaseDetail
        },
        {
            path: '3',
            name: '维修',
            component: StatisticTaskDetail
        },
        {
            path: '4',
            name: '人员',
            component: StatisticPersonDetail
        },
    ]
}];
export default router