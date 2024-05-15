import React from 'react';
import './Anasayfa.css';
import backgroundImage from '../images/sihirli.svg';

const Anasayfa = () => {
  return (
    <div className="container">
      <div className="svg-container">
        <img src={backgroundImage} alt="Arka Plan" />
      </div>
      <div className="content">
        <div className="alan1">
          <h1>Yeni İlaçlar</h1>
          <p>İçerik detayları burada yer alacak. Her alanın kendi scroll barı vardır. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolor maiores cumque sed quibusdam autem nisi accusamus recusandae aspernatur vitae sit odit mollitia voluptas ipsa, et culpa qui molestias laudantium! Minus, quisquam accusantium. Placeat veritatis nulla provident consequatur. Quia eum autem officiis optio, expedita ad excepturi, quam distinctio exercitationem ullam temporibus doloribus odio amet fuga labore aliquam qui nam esse quis quibusdam tenetur cumque, ab itaque veritatis. Id, ab. Quia voluptas assumenda quos aspernatur? Vel ipsa asperiores, aliquid enim nobis, alias quis consequuntur, numquam ex eveniet omnis quaerat temporibus fuga magni mollitia nisi error. Dolorem aut eum animi assumenda voluptas, fugiat molestias voluptates beatae reiciendis? Nostrum, voluptatum cumque enim soluta eveniet rem cupiditate libero distinctio esse rerum tenetur illum, dolorem voluptatem eos fugit atque nesciunt porro inventore. Sint corrupti eveniet quo facilis reprehenderit animi perferendis, tempora aliquam unde deleniti magnam deserunt error est sapiente quidem maxime similique recusandae delectus officiis architecto vitae quaerat. Blanditiis soluta dolorum amet reiciendis id tempore numquam quasi fuga, porro perferendis, repellat alias ex, quam voluptatum eaque tenetur libero nobis incidunt accusantium ad natus. Ipsam consequatur quo ullam sed eveniet non obcaecati quae ad dolorem, vel quod quos voluptatem accusamus, nesciunt debitis ab. Distinctio quis fugiat maxime, sequi quisquam sunt impedit beatae expedita earum harum qui soluta eius ipsum odit omnis. Voluptatum ipsum nulla asperiores eveniet! Odio eius ipsa dolorum laudantium aliquid, adipisci autem fugit ad nulla magni. Veniam debitis laudantium voluptatem. Suscipit vel harum voluptates rem. Earum facere ipsum distinctio eos aut quo architecto odit, perferendis, iusto dignissimos ipsa voluptates ea placeat corrupti dolorum velit ab. Eius, nisi perspiciatis explicabo asperiores molestiae eos praesentium saepe? Voluptates commodi dolorum fuga omnis error vitae quaerat corporis, odit obcaecati id at, fugit quidem quibusdam perspiciatis! Laboriosam, voluptatem et magni animi nihil totam possimus illo placeat, id odit delectus?</p>
        </div>
        <div className="alan2">
          <h2>İkinci Alan</h2>
          <p>İçerik detayları burada yer alacak. Her alanın kendi scroll barı vardır.</p>
        </div>
        <div className="alan3">
          <h2>En Çok Aranan İlaçlar</h2>
          <p>İçerik detayları burada yer alacak. Her alanın kendi scroll barı vardır.</p>
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
