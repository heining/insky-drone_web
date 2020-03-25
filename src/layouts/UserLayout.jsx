import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/insky.svg';
// import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardL}>
              <div className={styles.logo}>
                <img alt="logo" className={styles.logo} src={logo} />
              </div>
              <video className={styles.video} muted loop autoPlay playsInline>
                <source src={require('../assets/normalvideo.mp4')} />
              </video>
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, overflow: 'hidden' }}></div>
            </div>
            <div className={styles.cardR}>
              {children}
            </div>
          </div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
