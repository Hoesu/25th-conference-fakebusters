import Image from 'next/image'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
            <Image 
                src="/fakebusters-logo.png" 
                alt="Fakebusters Logo" 
                layout="fill"
                objectFit="cover"
            />
        </div>
        <h1 className={styles.title}>Deepfake Detector</h1>
      </div>
    </header>
  )
}

export default Header