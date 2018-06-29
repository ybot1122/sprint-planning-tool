import Link from 'next/link';
import MyLayout from '../components/MyLayout';

export default MyLayout(() => (
  <div>
    <div className="hero">
      <h1> About Section</h1>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }

      h1 {
        text-align: center;
        font-size: 3em;
      }

    `}</style>
  </div>
));
