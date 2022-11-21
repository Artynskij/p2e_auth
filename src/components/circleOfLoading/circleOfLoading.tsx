import styles from "./circleOfLoading.module.scss"


const CircleOfLoading = () => {
  return (
    <div className={styles.spin_wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default CircleOfLoading;
