const blackCards = [
  {
    text: 'Why can\'t I sleep at night?',
    pick: 1,
  },
  {
    text: 'I got 99 problems but _ ain\'t one.',
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
    text: 'This is the way the world ends / This is the way the world ends / Not with a bang but with _.',
    pick: 1,
  },
  {
    text: 'What is Batman\'s guilty pleasure?',
    pick: 1,
  },
  {
    text: 'TSA guidelines now prohibit _ on airplanes.',
    pick: 1,
  },
  {
    text: 'What ended my last relationship?',
    pick: 1,
  },
  {
    text: 'MTV\'s new reality show features eight washed-up celebrities living with _.',
    pick: 1,
  },
  {
    text: 'I drink to forget _.',
    pick: 1,
  },
  {
    text: 'I\'m sorry, Professor, but I couldn\'t complete my homework because of _.',
    pick: 1,
  },
  {
    text: 'Alternative medicine is now embracing the curative powers of _.',
    pick: 1,
  },
  {
    text: 'What\'s that sound?',
    pick: 1,
  },
  {
    text: 'What\'s the next Happy Meal&reg; toy?',
    pick: 1,
  },
  {
    text: 'It\'s a pity that kids these days are all getting involved with _.',
    pick: 1,
  },
  {
    text: 'In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.',
    pick: 1,
  },
  {
    text: '_. That\'s how I want to die.',
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
    text: 'Instead of coal, Santa now gives the bad children _.',
    pick: 1,
  },
  {
    text: 'Next from J.K. Rowling: Harry Potter and the Chamber of _.',
    pick: 1,
  },
  {
    text: 'A romantic, candlelit dinner would be incomplete without _.',
    pick: 1,
  },
  {
    text: 'White people like _.',
    pick: 1,
  },
  {
    text: '_. Betcha can\'t have just one!',
    pick: 1,
  },
  {
    text: 'War!<br><br>What is it good for?',
    pick: 1,
  },
  {
    text: 'BILLY MAYS HERE FOR _.',
    pick: 1,
  },
  {
    text: '_. High five, bro.',
    pick: 1,
  },
  {
    text: 'During sex, I like to think about _.',
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
    text: 'Major League Baseball has banned _ for giving players an unfair advantage.',
    pick: 1,
  },
  {
    text: 'When I am a billionaire, I shall erect a 50-foot statue to commemorate _.',
    pick: 1,
  },
  {
    text: 'What\'s the new fad diet?',
    pick: 1,
  },
  {
    text: 'When I am the President of the United States, I will create the Department of _.',
    pick: 1,
  },
  {
    text: '_. It\'s a trap!',
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
    text: 'While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on _.',
    pick: 1,
  },
  {
    text: 'Coming to Broadway this season, _: The Musical.',
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
    text: 'But before I kill you, Mr. Bond, I must show you _.',
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
    text: 'The class field trip was completely ruined by _.',
    pick: 1,
  },
  {
    text: 'When Pharaoh remained unmoved, Moses called down a plague of _.',
    pick: 1,
  },
  {
    text: 'I do not know with which weapons World War III will be fought, but World War IV will be fought with _.',
    pick: 1,
  },
  {
    text: 'What\'s Teach for America using to inspire inner city students to succeed?',
    pick: 1,
  },
  {
    text: 'In Michael Jackson\'s final moments, he thought about _.',
    pick: 1,
  },
  {
    text: 'Why do I hurt all over?',
    pick: 1,
  },
  {
    text: 'Studies show that lab rats navigate mazes 50% faster after being exposed to _.',
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
  {
    text: 'And the Academy Award for _ goes to _.',
    pick: 2,
  },
  {
    text: 'For my next trick, I will pull _ out of _.',
    pick: 2,
  },
  {
    text: '_: Good to the last drop.',
    pick: 1,
  },
  {
    text: 'What did Vin Diesel eat for dinner?',
    pick: 1,
  },
  {
    text: '_: kid-tested, mother-approved.',
    pick: 1,
  },
  {
    text: 'What gets better with age?',
    pick: 1,
  },
  {
    text: 'I never truly understood _ until I encountered _.',
    pick: 2,
  },
  {
    text: 'Rumor has it that Vladimir Putin\'s favorite delicacy is _ stuffed with _.',
    pick: 2,
  },
  {
    text: 'Lifetime&reg; presents _, the story of _.',
    pick: 2,
  },
  {
    text: 'Make a haiku.',
    pick: 3,
  },
  {
    text: 'In M. Night Shyamalan\'s new movie, Bruce Willis discovers that _ had really been _ all along.',
    pick: 2,
  },
  {
    text: '_ is a slippery slope that leads to _.',
    pick: 2,
  },
  {
    text: 'In a world ravaged by _, our only solace is _.',
    pick: 2,
  },
  {
    text: 'That\'s right, I killed _. How, you ask? _.',
    pick: 2,
  },
  {
    text: 'When I was tripping on acid, _ turned into _.',
    pick: 2,
  },
  {
    text: '_ + _ = _.',
    pick: 3,
  },
  {
    text: 'What\'s the next superhero/sidekick duo?',
    pick: 2,
  },
  {
    text: 'Dear Abby,<br><br>I\'m having some trouble with _ and would like your advice.',
    pick: 1,
  },
  {
    text: 'After the earthquake, Sean Penn brought _ to the people of Haiti.',
    pick: 1,
  },
  {
    text: 'In L.A. County Jail, word is you can trade 200 cigarettes for _.',
    pick: 1,
  },
  {
    text: 'Maybe she\'s born with it. Maybe it\'s _.',
    pick: 1,
  },
  {
    text: 'Life for American Indians was forever changed when the White Man introduced them to _.',
    pick: 1,
  },
  {
    text: 'Next on ESPN2, the World Series of _.',
    pick: 1,
  },
  {
    text: 'Step 1: _. Step 2: _. Step 3: Profit.',
    pick: 2,
  },
  {
    text: 'Here is the church<br>Here is the steeple<br>Open the doors<br>And there is _.',
    pick: 1,
  },
  {
    text: 'How did I lose my virginity?',
    pick: 1,
  },
  {
    text: 'During his childhood, Salvador Dal&iacute; produced hundreds of paintings of _.',
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
    text: 'The Smithsonian Museum of Natural History has just opened an exhibit on _.',
    pick: 1,
  },
  {
    text: 'Daddy, why is Mommy crying?',
    pick: 1,
  },
];

module.exports = blackCards;
