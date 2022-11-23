import { Helmet } from 'react-helmet';

import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content='Error' />
				<title>{'Error Page'}</title>
			</Helmet>
			<div>
				<ErrorMessage />
				<p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page not found</p>
				<Link style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px' }} to="/MarvelPortal">
					Back to main page
				</Link>
			</div>
		</>
	);
};

export default Page404;
