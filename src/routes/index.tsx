import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';

const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const movieRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/movie/$movieId',
    component: MovieDetailsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, movieRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}