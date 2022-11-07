import styles from "./modal.module.scss";


export const Modal = (props: any) => {
  return props.active ? (
    <div className={styles.modal + " " + styles.active}>
      <div className={styles.modal__ctn_content + " " + styles.active}>
        <button onClick={() => props.setActive(false)} className={styles.icon}>
          +
        </button>
        <div className={styles.modalBg}>{props.content()}</div>
      </div>
    </div>
  ) : (
    <div className={styles.modal}></div>
  );
  // <div
  //   className={
  //     props.active ? styles.modal + " " + styles.active : styles.modal
  //   }
  //   onClick={() => {
  //     props.setActive(false);
  //   }}
  // >
  //   <div
  //     style={{ background:`linear-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${props.img})`}}
  //     className={
  //       props.active
  //         ? styles.modal__ctn_content + " " + styles.active
  //         : styles.modal__ctn_content
  //     }
  //   >
  //     <div className={styles.content}>{props.children}</div>
  //   </div>
  // </div>
};
