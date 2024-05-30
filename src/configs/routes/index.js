import { lazy } from "react";
import Loadable from "../../components/Loadings/Loadable";

const MainLayout = Loadable(lazy(() => import('../../components/Layouts/MainLayout')));

// Auths
const SignInPage = Loadable(lazy(() => import('../../screens/auths/SignIn')));
const HomePage = Loadable(lazy(() => import('../../screens/mains/dashboard/Home')));

// Patient
const PatientPage = Loadable(lazy(() => import('../../screens/mains/patient/list')));
const PatientFormPage = Loadable(lazy(() => import('../../screens/mains/patient/form')));
const PatientDetailPage = Loadable(lazy(() => import('../../screens/mains/patient/detail')));



const appRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <HomePage /> },
        ],
    },
    {
        path: '/patients',
        element: <MainLayout />,
        children: [
            { path: 'list', element: <PatientPage /> },
            { path: 'form', element: <PatientFormPage /> },
            { path: ':id', element: <PatientDetailPage /> },
        ],
    },
    {
        path: 'auths',
        children: [
            { path: 'sign-in', element: <SignInPage /> },
        ],
    }
];

export default appRoutes;