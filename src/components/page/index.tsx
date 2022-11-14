import styles from './index.less';

export default function Page(props: any) {
  return <div className={styles.page}>{props.children}</div>;
}
