import styles from "./Container.module.scss";

export interface ContainerProps {
  children: any;
  padding?: string;
  center?: Boolean;
}

export function Container(props: ContainerProps) {
  if (props.center)
    return (
      <div style={{ padding: props.padding }} className={styles.centered}>
        {props.children}
      </div>
    );
  return <div style={{ padding: props.padding }}>{props.children}</div>;
}
