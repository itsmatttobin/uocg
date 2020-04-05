const blackCards = [
  {
    text: 'Why can\'t I sleep at night?',
    pick: 1,
  },
  {
    text: 'I got 99 problems but ___ ain\'t one.',
    pick: 1,
  },
  {
    text: 'What\'s a girl\'s best friend?',
    pick: 1,
  },
  {
    text: 'What\'s that smell?',
    pick: 1,
  },
  {
    text: 'This is the way the world ends / This is the way the world ends / Not with a bang but with ___.',
    pick: 1,
  },
  {
    text: 'What is Batman\'s guilty pleasure?',
    pick: 1,
  },
  {
    text: 'TSA guidelines now prohibit ___ on airplanes.',
    pick: 1,
  },
  {
    text: 'What ended my last relationship?',
    pick: 1,
  },
  {
    text: 'MTV\'s new reality show features eight washed-up celebrities living with ___.',
    pick: 1,
  },
  {
    text: 'I drink to forget ___.',
    pick: 1,
  },
  {
    text: 'I\'m sorry, Professor, but I couldn\'t complete my homework because of ___.',
    pick: 1,
  },
  {
    text: 'Alternative medicine is now embracing the curative powers of ___.',
    pick: 1,
  },
  {
    text: 'What\'s that sound?',
    pick: 1,
  },
  {
    text: 'What\'s the next Happy Meal® toy?',
    pick: 1,
  },
  {
    text: 'It\'s a pity that kids these days are all getting involved with ___.',
    pick: 1,
  },
  {
    text: 'In the new Disney Channel Original Movie, Hannah Montana struggles with ___ for the first time.',
    pick: 1,
  },
  {
    text: '___. That\'s how I want to die.',
    pick: 1,
  },
  {
    text: 'What does Dick Cheney prefer?',
    pick: 1,
  },
  {
    text: 'What\'s the most emo?',
    pick: 1,
  },
  {
    text: 'Instead of coal, Santa now gives the bad children ___.',
    pick: 1,
  },
  {
    text: 'Next from J.K. Rowling: Harry Potter and the Chamber of ___.',
    pick: 1,
  },
  {
    text: 'A romantic, candlelit dinner would be incomplete without ___.',
    pick: 1,
  },
  {
    text: 'White people like ___.',
    pick: 1,
  },
  {
    text: '___. Betcha can\'t have just one!',
    pick: 1,
  },
  {
    text: 'War! What is it good for?',
    pick: 1,
  },
  {
    text: 'BILLY MAYS HERE FOR ___.',
    pick: 1,
  },
  {
    text: '___. High five, bro.',
    pick: 1,
  },
  {
    text: 'During sex, I like to think about ___.',
    pick: 1,
  },
  {
    text: 'What did I bring back from Mexico?',
    pick: 1,
  },
  {
    text: 'What are my parents hiding from me?',
    pick: 1,
  },
  {
    text: 'What will always get you laid?',
    pick: 1,
  },
  {
    text: 'What would grandma find disturbing, yet oddly charming?',
    pick: 1,
  },
  {
    text: 'What did the U.S. airdrop to the children of Afghanistan?',
    pick: 1,
  },
  {
    text: 'What helps Obama unwind?',
    pick: 1,
  },
  {
    text: 'What\'s there a ton of in heaven?',
    pick: 1,
  },
  {
    text: 'Major League Baseball has banned ___ for giving players an unfair advantage.',
    pick: 1,
  },
  {
    text: 'When I am a billionaire, I shall erect a 50-foot statue to commemorate ___.',
    pick: 1,
  },
  {
    text: 'What\'s the new fad diet?',
    pick: 1,
  },
  {
    text: 'When I am the President of the United States, I will create the Department of ___.',
    pick: 1,
  },
  {
    text: '___. It\'s a trap!',
    pick: 1,
  },
  {
    text: 'How am I maintaining my relationship status?',
    pick: 1,
  },
  {
    text: 'What will I bring back in time to convince people that I am a powerful wizard?',
    pick: 1,
  },
  {
    text: 'While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on ___.',
    pick: 1,
  },
  {
    text: 'Coming to Broadway this season, ___: The Musical.',
    pick: 1,
  },
  {
    text: 'What\'s my secret power?',
    pick: 1,
  },
  {
    text: 'What gives me uncontrollable gas?',
    pick: 1,
  },
  {
    text: 'But before I kill you, Mr. Bond, I must show you ___.',
    pick: 1,
  },
  {
    text: 'What never fails to liven up the party?',
    pick: 1,
  },
  {
    text: 'What am I giving up for Lent?',
    pick: 1,
  },
  {
    text: 'What do old people smell like? ',
    pick: 1,
  },
  {
    text: 'The class field trip was completely ruined by ___.',
    pick: 1,
  },
  {
    text: 'When Pharaoh remained unmoved, Moses called down a plague of ___.',
    pick: 1,
  },
  {
    text: 'I do not know with which weapons World War III will be fought, but World War IV will be fought with ___.',
    pick: 1,
  },
  {
    text: 'What\'s Teach for America using to inspire inner city students to succeed?',
    pick: 1,
  },
  {
    text: 'In Michael Jackson\'s final moments, he thought about ___.',
    pick: 1,
  },
  {
    text: 'Why do I hurt all over?',
    pick: 1,
  },
  {
    text: 'Studies show that lab rats navigate mazes 50% faster after being exposed to ___.',
    pick: 1,
  },
  {
    text: 'Why am I sticky?',
    pick: 1,
  },
  {
    text: 'What\'s my anti-drug?',
    pick: 1,
  },
  // {
  //   text: 'And the Academy Award for ___ goes to ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'For my next trick, I will pull ___ out of ___.',
  //   pick: 2,
  // },
  {
    text: '___: Good to the last drop.',
    pick: 1,
  },
  {
    text: 'What did Vin Diesel eat for dinner?',
    pick: 1,
  },
  {
    text: '___: kid-tested, mother-approved.',
    pick: 1,
  },
  {
    text: 'What gets better with age?',
    pick: 1,
  },
  // {
  //   text: 'I never truly understood ___ until I encountered ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'Rumor has it that Vladimir Putin\'s favorite delicacy is ___ stuffed with ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'Lifetime® presents ___, the story of ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'Make a haiku.',
  //   pick: 3,
  // },
  // {
  //   text: 'In M. Night Shyamalan\'s new movie, Bruce Willis discovers that ___ had really been ___ all along.',
  //   pick: 2,
  // },
  // {
  //   text: '___ is a slippery slope that leads to ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'In a world ravaged by ___, our only solace is ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'That\'s right, I killed ___. How, you ask? ___.',
  //   pick: 2,
  // },
  // {
  //   text: 'When I was tripping on acid, ___ turned into ___.',
  //   pick: 2,
  // },
  // {
  //   text: '___ + ___ = ___.',
  //   pick: 3,
  // },
  // {
  //   text: 'What\'s the next superhero/sidekick duo?',
  //   pick: 2,
  // },
  {
    text: 'Dear Abby, I\'m having some trouble with ___ and would like your advice.',
    pick: 1,
  },
  {
    text: 'After the earthquake, Sean Penn brought ___ to the people of Haiti.',
    pick: 1,
  },
  {
    text: 'In L.A. County Jail, word is you can trade 200 cigarettes for ___.',
    pick: 1,
  },
  {
    text: 'Maybe she\'s born with it. Maybe it\'s ___.',
    pick: 1,
  },
  {
    text: 'Life for American Indians was forever changed when the White Man introduced them to ___.',
    pick: 1,
  },
  {
    text: 'Next on ESPN2, the World Series of ___.',
    pick: 1,
  },
  // {
  //   text: 'Step 1: ___. Step 2: ___. Step 3: Profit.',
  //   pick: 2,
  // },
  {
    text: 'Here is the church. Here is the steeple. Open the doors. And there is ___.',
    pick: 1,
  },
  {
    text: 'How did I lose my virginity?',
    pick: 1,
  },
  {
    text: 'During his childhood, Salvador Dalí produced hundreds of paintings of ___.',
    pick: 1,
  },
  {
    text: 'In 1,000 years, when paper money is a distant memory, how will we pay for goods and services?',
    pick: 1,
  },
  {
    text: 'What don\'t you want to find in your Kung Pao chicken?',
    pick: 1,
  },
  {
    text: 'The Smithsonian Museum of Natural History has just opened an exhibit on ___.',
    pick: 1,
  },
  {
    text: 'Daddy, why is Mommy crying?',
    pick: 1,
  },
];

module.exports = blackCards;
