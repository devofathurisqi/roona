import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {Logo} from '../components/Layout';
import {ShoppingSteps} from '../App';
import {whatsappUrl} from '../commerce';
export default function About(){return <><section className="about-hero section"><div><span className="eyebrow">A LITTLE NOTE FROM ROONA</span><h1>Hal kecil.<br/>Rasa yang <em>istimewa.</em></h1><p>ROONA adalah ruang kecil untuk menemukan hal-hal cantik yang dekat dengan keseharian. Satu warna yang kamu suka, satu siluet yang terasa pas, satu pilihan yang ingin kamu kenakan lagi.</p><p>Lewat pilihan hijab dan mukena, kami ingin menemani momen sederhana itu. Jelajahi koleksi dengan tenang; kami siap membantu saat kamu ingin mengenal pilihanmu lebih dekat.</p><Link to="/koleksi" className="button">Masuk ke dunia ROONA <ArrowRight size={18}/></Link></div><div className="about-identity"><Logo/><p>a little world of pretty things 𐙚</p><a className="text-link" href={whatsappUrl('Halo ROONA, saya ingin mengenal koleksinya lebih dekat.')} target="_blank" rel="noreferrer">A little hello <ArrowUpRight size={18}/></a></div></section><ShoppingSteps/></>;}
