import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<span><Spinner/></span>}>
						<Routes>
							<Route path="/MarvelPortal" element={<MainPage/>}/>
							<Route path="/MarvelPortal/comics" element={<ComicsPage/>}/>
							<Route path="/MarvelPortal/comics/:comicId" element={<SingleComicPage/>} />
							<Route path="*" element={<Page404/>}/>
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;