import { APP_NAME } from 'app/constants';
import { Helmet } from 'react-helmet-async';

function AppHelmet( props ){
    return <>
        <Helmet>
            <title> {`${props.title} | ${APP_NAME}`}  </title>
        </Helmet>
    </>
}
export default AppHelmet;