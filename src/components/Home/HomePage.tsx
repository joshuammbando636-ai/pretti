import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from './Hero';
import WhyChoose from './WhyChoose';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Preetie Decor | Professional Event Decoration in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Preetie Decor creates stunning wedding decorations, birthday setups, and corporate event styling in Dar es Salaam, Tanzania. Located in Msasani. Get a free quote today." />
        <meta name="keywords" content="event decoration Dar es Salaam, wedding decor Tanzania, party decorations Msasani, corporate event styling, Preetie Decor, birthday decorations, anniversary decor, Tanzania event planners" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
        <link rel="canonical" href="https://preetiedecor.com/" />
      </Helmet>
      <Hero />
      <WhyChoose />
    </>
  );
};

export default HomePage;