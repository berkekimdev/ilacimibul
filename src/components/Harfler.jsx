import React from 'react';
import { Link } from 'react-router-dom';
import './Harfler.css';

const Harfler = () => {
 const harfler = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];

 return (
    <div className="harfler-kutu">
      {harfler.map((harf) => (
        <Link key={harf} to={`/harfegoreara/${harf}`} className="harf">{harf}</Link>
      ))}
    </div>
 );
};

export default Harfler;