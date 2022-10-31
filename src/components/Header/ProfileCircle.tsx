import styles from './Header.module.scss';
import { mockUser } from '../../utils/mockData';
import { Link } from 'react-router-dom';
import { PROFILE_URL, SETTINGS_URL } from '../../utils/links';
import { useState } from 'react';

export type ProfileCircleProps = {
  hide: (val: boolean) => void;
  setToken: (val: any) => void;
};

export default function ProfileCircle({ hide, setToken }: ProfileCircleProps) {
  const [show, setShow] = useState(false);
  
  const logOut = () => {
    setToken('');
    hide(false);
  };

  return (
    <div className={styles.profile} onClick={() => setShow(!show)}>
      <img src={mockUser.avatar} className={styles.profileAvatar} />
      <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.98486 8.12072L0.344238 2.58618C-0.114746 2.20364 -0.114746 1.58508 0.344238 1.20661L1.44775 0.286901C1.90674 -0.0956337 2.64893 -0.0956337 3.10303 0.286901L7.81006 4.20992L12.5171 0.286901C12.9761 -0.0956337 13.7183 -0.0956337 14.1724 0.286901L15.2759 1.20661C15.7349 1.58915 15.7349 2.20771 15.2759 2.58618L8.63525 8.12072C8.18604 8.50326 7.44385 8.50326 6.98486 8.12072Z" fill="white" />
      </svg>
      {show &&
        <div className={styles.profileMenu}>
          <Link to={{ pathname: PROFILE_URL }} onClick={() => hide(false)}>
            <span>Профиль</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5.625C6.55273 5.625 7.8125 4.36523 7.8125 2.8125C7.8125 1.25977 6.55273 0 5 0C3.44727 0 2.1875 1.25977 2.1875 2.8125C2.1875 4.36523 3.44727 5.625 5 5.625ZM7.5 6.25H6.42383C5.99023 6.44922 5.50781 6.5625 5 6.5625C4.49219 6.5625 4.01172 6.44922 3.57617 6.25H2.5C1.11914 6.25 0 7.36914 0 8.75V9.0625C0 9.58008 0.419922 10 0.9375 10H9.0625C9.58008 10 10 9.58008 10 9.0625V8.75C10 7.36914 8.88086 6.25 7.5 6.25Z" fill="white" />
            </svg>
          </Link>
          <Link to={{ pathname: SETTINGS_URL }} onClick={() => hide(false)}>
            <span>Настройки</span>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2.87946V2.40402L9.36384 2.20759L9.31473 1.97545L9.76339 1.51339L9.53125 1.08036L8.88393 1.24777L8.72321 1.08036L8.89062 0.450893L8.46429 0.191964L7.98884 0.660714L7.75 0.589286L7.59375 0H7.08929L6.95089 0.589286L6.6808 0.660714L6.24107 0.191964L5.80804 0.4375L5.98884 1.0558L5.80804 1.2433L5.17188 1.07589L4.92634 1.50223L5.38839 1.97098L5.32366 2.20312L4.6875 2.37723L4.6808 2.86161L5.32366 3.02902L5.37723 3.29911L4.92857 3.7433L5.16071 4.15625L5.82143 3.98884L5.98214 4.1808L5.80134 4.78125L6.24554 5.04018L6.67857 4.58482L6.9375 4.64955L7.08705 5.28571L7.59152 5.29241L7.74107 4.64955L8 4.57143L8.46205 5.05357L8.91741 4.78348L8.72098 4.15848L8.89509 3.97768L9.53795 4.17411L9.76786 3.72545L9.30134 3.3058L9.35045 3.03571L10 2.87946ZM7.33929 3.88839C6.64062 3.88839 6.07143 3.32143 6.07143 2.62054C6.07143 1.91964 6.63839 1.35268 7.33929 1.35268C8.04018 1.35268 8.60714 1.91964 8.60714 2.62054C8.60714 3.32366 8.04018 3.88839 7.33929 3.88839ZM8.95312 4.25446L10 4.57813V5.46875L8.77009 5.76786L8.67857 6.27455L9.54688 7.0625L9.1183 7.90848L7.91295 7.53571L7.58705 7.875L7.95982 9.04688L7.10491 9.55357L6.23661 8.64955L5.75223 8.79688L5.47098 10.0022L4.52455 9.99107L4.2433 8.79464L3.75893 8.66964L2.94643 9.52679L2.11161 9.04241L2.45089 7.91518L2.14509 7.5558L0.90625 7.87054L0.466518 7.09375L1.3125 6.25893L1.20536 5.75L0 5.43527L0.0111607 4.52232L1.20536 4.1942L1.33259 3.75446L0.464286 2.875L0.926339 2.07589L2.12277 2.39063L2.46205 2.04018L2.12277 0.879464L2.93527 0.417411L3.7567 1.29688L4.26339 1.16071L4.52232 0H5.46875L5.72768 1.02455L5.22321 0.892857L5.08259 0.854911L5.00893 0.982143L4.76339 1.40848L4.68973 1.53348L4.79241 1.63616L5.17634 2.02455L5.16964 2.04688L4.63839 2.19196L4.5 2.22991L4.49777 2.37277L4.4933 2.66071C3.43304 2.89286 2.63393 3.83929 2.63393 4.97098C2.63393 6.27232 3.68973 7.33036 4.9933 7.33036C6.12054 7.33036 7.0625 6.54018 7.29688 5.48214L7.59152 5.48661L7.74554 5.48884L7.78125 5.33929L7.90625 4.80357L7.94866 4.79018L8.33036 5.1875L8.43527 5.29688L8.56473 5.22098L9.02009 4.95089L9.14955 4.87277L9.10491 4.72768L8.95312 4.25446Z" fill="white" />
            </svg>
          </Link>
          <Link to={{ pathname: PROFILE_URL }} onClick={logOut} >
            <span>Выйти</span>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.8616 4.14745L6.5281 7.48095C6.23047 7.77859 5.71457 7.57024 5.71457 7.14363V5.23878H3.01602C2.75212 5.23878 2.53981 5.02646 2.53981 4.76256V2.85771C2.53981 2.5938 2.75212 2.38149 3.01602 2.38149H5.71457V0.476636C5.71457 0.0520119 6.22848 -0.158316 6.5281 0.139318L9.8616 3.47282C10.0461 3.65933 10.0461 3.96094 9.8616 4.14745ZM3.80971 7.38174V6.58805C3.80971 6.45709 3.70256 6.34994 3.57161 6.34994H1.90486C1.55365 6.34994 1.2699 6.0662 1.2699 5.71499V1.90528C1.2699 1.55407 1.55365 1.27033 1.90486 1.27033H3.57161C3.70256 1.27033 3.80971 1.16318 3.80971 1.03222V0.238529C3.80971 0.10757 3.70256 0.000422017 3.57161 0.000422017H1.90486C0.853217 0.000422017 0 0.853639 0 1.90528V5.71499C0 6.76663 0.853217 7.61985 1.90486 7.61985H3.57161C3.70256 7.61985 3.80971 7.5127 3.80971 7.38174Z" fill="white" />
            </svg>
          </Link>
        </div>}
    </div>

  )
}