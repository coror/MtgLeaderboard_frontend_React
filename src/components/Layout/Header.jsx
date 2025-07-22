import logoImg from '../../assets/logo.jpg';

export default function Header() {
  return (
    <header>
      <div>
        <img src={logoImg} alt='A restaurant' />
        <h1 >MTG leaderboard</h1>
      </div>
    </header>
  );
}
