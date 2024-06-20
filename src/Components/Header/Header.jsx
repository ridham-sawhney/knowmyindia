import './Header.css'
import logoIndia from '../../assets/images/logo-india.png'
export default function Header() {
    return (<div className='header'>
        <div className='header-image'>
        <img src={logoIndia}></img>
        </div>
        <div className='header-content'>
            <h1>Know My <span>India</span></h1>
        </div>
    </div>);
}