import DotLoader from "react-spinners/DotLoader";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className={styles.overlay}>
          <DotLoader color="#000000" size={60} />
        </div>
      )}
    </>
  );
}
