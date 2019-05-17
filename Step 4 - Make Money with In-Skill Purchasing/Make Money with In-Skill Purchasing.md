# Make Money with In-Skill Purchasing

In this section of the workshop, you will incorporate in-skill purchasing (ISP) into your skill. When developers and content creators build delightful skills with compelling content, customers win. With in-skill purchasing, you can sell premium content to enrich your Alexa skill experience.

When a customer walks through your Ship Commander, they have the option to purchase the ability to ask for a Star Trek fact. When the customer successfully completes the in-skill purchase, they can ask for up a fact at any point in time.

## Objectives

After completing this workshop, you will be able to:

- Set up an ISP entitlement in the developer console
- Configure your interaction model to handle ISP
- Update your service code to be able to handle the various requests from the purchase flow

## Prerequisites

This lab requires:

- Access to a notebook computer with Wi-Fi, running Microsoft Windows, Mac OSX, or Linux (Ubuntu, SuSE, or RedHat).
- An Internet browser suchas Chrome, Firefox, or IE9 (previous versions of Internet Explorer are not supported).
- Having completed **[Step 0: Initialize Ship Commander]( )**
- Having completed **[Step 1: Add SSML, Sound Effects, and Amazon Polly]( )**
- Having completed **[Step 2: Build your Display]( )**
- Having completed **[Step 3: Pairing your VUI and GUI]( )**

## Goal: Integrating Premium Features into your skill
ISP supports one-time purchases for entitlements that unlock access to features or content in your skill, subscriptions that offer access to premium features or content for a period of time, and consumables which can be purchased, depleted and purchased again.

You can define your premium offering and price, and we handle the voice-first purchasing flow. We also provide self-service tools to manage your in-skill products, and optimize their sales performance over time. Today, you can make money through both ISP and Alexa Developer Rewards. This feature is available for Alexa skills in the US.

### Task 4.1: Build the Premium Feature into your skill
Before we start to integrate a formal ISP flow into our skill, we need to build the premium feature into the skill. This will mean creating an intent for when the customer asks for a fact in the game.

1. Be sure your most recent code is **saved and deployed**.
2. In the Amazon Developer Portal, navigate to your **Build** tab.
3. In the left-hand menu, click the **+ Add** icon to add an intent
4. Create a custom intent called "FactIntent"
5. Enter the following sample utterances for FactIntent:

```
i want to hear a star trek fact,
i want to hear a fact,
give me a star trek fact,
random fact,
fact,
i want to hear a random fact,
tell me about star trek,
give me a random fact,
give me a fact
```

6. **Save** and **Build** your interaction model.

This has updated our interaction model to be able to understand when the user requests for a fact. Now we need to be able to handle this in our service code. Once this is done, we will put this ability behind an ISP flow.

7. Navigate to your service code in the **Code** tab of the developer console.
8. **Click** on the _Create File_ icon on the upper left.
9. Under **File Path:**, type _lambda/facts.js_
10. **Paste** the following code into this file:

```
'use strict';

module.exports = {
	FACTS: [
		"Martin Luther King Jr. talked Nichelle Nichols (Lt. Uhura) out of leaving Star Trek: The Original Series.",
		"The popular line Beam me up, Scotty, was never said exactly in this way in the Star Trek series or film.",
		"An alternate juror for the 1996 Whitewater trial wore a Star Trek: The Next Generation uniform with a phaser and tricorder during the trial. She was later dismissed for talking to a journalist.",
		"Star Trek: TNG character Geordi La Forge was named after George La Forge, a devoted fan of the original Star Trek series. George La Forge had muscular dystrophy and died in 1975.",
		"Lucille Ball, from I Love Lucy and head of Star Trek’s parent company Desilu Productions, single handedly kept Star Trek: TOS from cancellation during the first season. The series was finally canceled in its third season, after 79 episodes. It then gained immense popularity in syndication.",
		"The original Star Trek series was originally marketed as Wagon Train to the Stars, after the popular 1957 western, Wagon Train.",
		"Star Trek: TOS aired from September 8, 1966, to September 2, 1969. The show was a way for its creator Eugene Wesley Gene Roddenbery (1921-1991) to comment on contemporary issues through the guise of science fiction.",
		"Scientists from the Jet Propulsion Laboratory wore Spock ears while monitoring the Mariner V on its October 1967 fly-by of Venus.",
		"Star Trek: TNG had the highest ratings of any Star Trek series.",
		"The popular 2009 Star Trek Reboot movie is the eleventh film in the Star Trek franchise. The film has earned high critical praise and has grossed more revenue than all previous Star Trek films.",
		"The Star Trek franchise includes six series: The Original Series, The Animated Series, The Next Generation, Deep Space Nine, Voyager, and Enterprise, totaling 726 episodes.",
		"Gene Roddenberry initially cast girlfriend (and later wife) Majel Barrett as Captain Pike’s Number One (first officer) in the series first pilot. NBC executives, however, demanded the character be cut because they said audience members could not relate to such a powerful woman character.",
		"Initially, NBC asked Gene Roddenberry to get rid of the guy with the pointy ears partly because they were worried about his satanic appearance. Luckily, Roddenberry refused to cut Spock.",
		"Most male Vulcan names begin with S and most females’ names with a T followed by an apostrophe.",
		"The BBC banned a TNG first-season episode titled Conspiracy because of the graphic phaser death of Star Fleet Inspector Dexter Remmick, who was a host to a disgusting mother creature. The BBC also did not air a 1990 TNG episode titled High Ground due to Data’s passing remark that Ireland would be reunified as a result of successful terrorist activities in 2024. BBC Two finally aired the episode in 2007.",
		"During the first season of TNG, Patrick Stewart had a sign over his door that read: Beware of Unknown Shakespearean Actor.",
		"DeForest Kelly (1920-1999) was the first of the three original members to appear on TNG. He was also the first original cast member of TOS to pass away.",
		"The Borg were initially conceptualized as being insects but took on their ultimate form due to budget restraints. The hive motif, however, remained.",
		"In the Star Trek universe, Zefram Cochrane developed faster-than-light warp drive around 2061 and conducted his test flight to Steppenwolf’s Magic Carpet Ride.",
		"On impulse drive, it would take 400,000 years for the Enterprise to cross the galaxy.",
		"Warp engines work by allowing particles of matter and antimatter to commingle in a reaction chamber regulated by a dilithium crystal. When the particles interact, they destroy each other, giving off enough energy to allow the ship to warp into space.",
		"The Enterprise usually can operate safety from warp drive 1 to 9.2. Traveling at warp 10, as seen in Star Trek: Voyager, mutates humans into big salamander creatures. However, in the final episode of the preceding series TNG, All Good Things, Federation starships traveled at warp 13.",
		"In TOS, uniform colors indicated the wearer’s role on the Enterprise. Gold uniforms indicated the wearer was on a command track. Blue meant the sciences, including medicine. Red indicated support services, such as communications, engineering, or security.",
		"The star dates Kirk mentions in his captain’s log each week in TOS are not based on our current Gregorian calendar dates. TOS star dates were largely arbitrary and were created just to let the audiences know the show took place in the future. Later Star Treks attempted to be more consistent with star dates.",
		"The episode titled Spock’s Brain ranks as one of the worst TOS episodes due to clichés and an implausible plot. The phrase Spock’s Brain has become a cultural term that refers to an unintentionally humorous television episode.",
		"The Enterprise in TOS is 953.7 feet long, which is more than the length of three football fields. The Enterprise-D in TNG is more than twice the length of Kirk’s ship at 2,103 feet. That’s as big as the Paramount Studio lot in Hollywood.",
		"The only official intoxicant served in TNG’s Ten-Forward is Synthenol, an artificial booze that loses its inebriating effects the moment a crew member leaves the bar.",
		"Red-shirting became a Star Trek slang word for an extra who was killed to demonstrate the danger the main characters were in. The extra almost always wore a red uniform. In tribute to the original series’ red-shirting, red-shirted Chief Engineer Olsen in Star Trek (2009) meets his death during an orbital skydive onto a drilling platform while Kirk and Sulu survive.",
		"Data’s cat Spot was initially a long-haired male but became a short-haired female later in the series. Data didn’t seem to notice.",
		"Although Roddenberry was actively involved in the Star Trek animated series’ conception and production, he did not consider them to be canon or part of the established history for the characters he created.",
		"Vulcans were once an extremely violent and emotional people until Surak developed a new philosophy of logic, which spawned the Vulcan Time of Awakening. Those opposed to Vulcan logic left the planet and founded colonies elsewhere, most notably the Romulan Star Empire.",
		"Vulcans were one of the first to develop warp drive, and they helped humans navigate the perils of warp travel. The official contact between Vulcans and humans occurred on April 5, 2063, when a Vulcan survey ship detected the warp flight of Captain Zefram Cochrane’s Phoenix.",
		"Vulcan’s have teeth that humans don’t have, such as anterior tricuspids. Their heart is where a human’s liver would normally be and beats several hundred times a minute. They have no appendix.",
		"Vulcans have inner eyelids that protect their eyes from the intensity of the Vulcan sun. They can also survive several days without water, perhaps because they evolved on a hot, dry planet.",
		"The Vulcan brain has been described as a puzzle wrapped in an enigma, housed inside a cranium.",
		"Besides the Trill, Vulcans are the only other known humanoid in the Star Trek universe who are able to transfer one individual’s consciousness into another’s (known as the mind meld).",
		"Lieutenant Uhura’s name means freedom in Swahili.",
		"Even though they’d prefer not to mate, Vulcans are compelled to reproduce by a ritual called Pon Farr. Once every seven years, they are consumed by Plak-tow, or blood fever, in which they become savage and may even fight to the death.",
		"Most Vulcans are vegetarians and do not touch food with their hands unless they are wearing special gloves.",
		"In an alternate reality established in the 2009 Star Trek film, Vulcan was destroyed by the Romulan Nero in 2258.",
		"When Spock sacrificed his own life to save the Enterprise from destruction at Kahn’s hand in the film The Wrath of Khan, Kirk could only say, Of all the souls I have encountered in my travels, his was the most . . . human.",
		"Dr. McCoy’s nickname Bones seems to come from two sources. First, it may have derived from the old-fashion colloquialism sawbones for a doctor. In Star Trek, Kirk calls McCoy Bones after McCoy reveals his divorce left him just his bones.",
		"Jeri Ryan, the actress who played Seven of Nine in Voyager turned down the role four times.",
		"James Doohan (Scotty) did not have a right middle finger. He lost it during WWII.",
		"Several famous actors and actresses have made guest appearances in Star Trek films and episodes, including Kim Cattrall, Kirstie Alley, Tom Bergeron, Jason Alexander, King Abdullah II of Jordan, Kelsey Grammer, Christopher Plummer, The Rock, Iman, Lee Meriwether, Joan Collins, Mick Fleetwood, Stephen Hawking, Ashley Judd, Famke Janssen, Mae Jemison, and Tom Morello.",
		"Actress Majel Barrett Roddenberry is the only actor to be in all Star Trek incarnations, including the animated series and films. Before her death in December 2008, she completed the voice of the computer in Star Trek.",
		"Star Trek is the first time Uhura has been given a name on screen, Nyota, though she is referred to as Nyota in the DC comics’ Who’s Who in Star Trek.",
		"Leonord Nimoy created the famous Spock neck pinch during the episode The Enemy Within when Spock was supposed to hit the evil Kirk over the head with the butt of a phaser. Nimoy wanted something more interesting and came up with an answer from within Spock’s hand-orientated background.",
		"At the same time the Star Trek series was beginning to create a loyal following, the Monkees were exploding onto TV sets. Consequently, Roddenberry created the character of Pavel Andreievich Chekhov as a close approximation of the Monkees’ lead singer, Davy Jones—with a Russian accent.",
		"Spock was originally conceived as a red-skinned alien with a plate in the middle of his stomach. He didn’t eat or drink but fed upon any form of energy that struck his stomach plate.",
		"An October 1967 TV Guide ad by RCA cited Star Trek: TOS as the reason to buy a color TV.",
		"Geordie La Forge’s VISOR (Visual Instrument and Sensory Organ Replacement) was actually based on a hair clip. LaVar Burton describes wearing the VISOR as a living hell as it gave him headaches and reduced his vision.",
		"Nimoy and Shatner are the only two actors to appear in every episode of the original Star Trek series.",
		"DeForest Kelley (Dr. McCoy) was originally offered the role of Spock.",
		"The U.S.S. Enterprise NCC-1701 from the original series has a crew complement of 430 men and women. The Enterprise NCC 1701-D from TNG has a crew complement of 1,012 men, women, and children, reflecting a more family-friendly and less warlike atmosphere than TOS.",
		"The Enterprise was initially a French sailing ship in 1671. A later ship was captured by the British royal navy in 1705 and renamed HMS Enterprise. The first Earth Starfleet vessel, commissioned Enterprise NX-01, launched in 2151 under the command of Captain Jonathan Archer (of the Star Trek: Enterprise series).",
		"Divorce Klingon style means slapping your spouse, reciting the words N’Gos tlhogh cha! (our marriage is done) and spitting in your spouse’s face.",
		"In the Klingon creation myth, Adam and Eve destroyed their gods and turned the heaven into ashes.",
		"Although Voyager was initially allotted only two shuttlecrafts, over the course of seven years, they went through dozens.",
		"Despite Picard’s British accent, he was born in France where his family owned a vineyard.",
		"Riker was born in Valdez, Alaska, and his mother died when he was two years old. His father was a civilian strategist who worked for Starfleet and essentially left Will on his own when he was 15 years old.",
		"Klingons prefer to eat food that’s still alive. A favorite Klingon meal is gagh, a slimy serpent-worm dish, followed by warm blood wine.",
		"A Romulan Warbird is nearly twice the length of the Enterprise in TNG and is powered by an artificial quantum singularity or a black hole.",
		"Captain Archer from Enterprise owns a dog named Porthos, a character in the novel The Three Musketeers by Alexandre Dumas. His litter mates were named after the two other Musketeers.",
		"Captain Kirk was born on Earth in Iowa. He is paradox in many ways—for example, he depends on technology but likes resolving conflict with a hands-on approach, and he deplores humankind’s violence but has a distrust of apparent peace. Additionally, although he has a reputation as a lady’s man, no woman has come between him and his career—or his ship.",
		"Spock was the first Vulcan to enlist in Starfleet. His father did not speak to him for 18 years because he opted to join Starfleet rather than attend the Vulcan Science Academy.",
		"The sign Spock makes for Live long and prosper is actually half of what is commonly done by the Cohanim Jewish priests when they bless the congregation. Both Nimoy and Shatner are from Jewish descent, and both are mentioned in Adam Sandler’s Hanukkah song.",
		"Spock’s fiancée, T’Pring, spurned him at the altar in favor of a more traditional Vulcan.",
		"The Enterprise’s Jefferies Tubes (small corridors or tunnels that provide access to critical starship systems) were named after Matt Jeffries, the TOS art director, who designed the original starship Enterprise.",
		"Art Director Matt Jeffries (1921-2003) was a bomber pilot during WWII and based the Enterprise’s identifying letters NCC on twentieth-century aircraft registration codes. For example, the N represents an aircraft registered in the United States, and the first C represents a civil aircraft. Jeffries added a second C because he thought it looked neat. In the Star Trek universe, NCC stands for Naval Construct Contract and USS stands for United Space Ship (not United States Ship).",
		"Randy Pausch—Carnegie Mellon computer science professor, author of the Last Lecture, and devoted Star Trek fan—appeared in the 2009 movie Star Trek. He died on July 25, 2008, of pancreatic cancer.",
		"Star Trek (2009) director J.J. Abrams glued Zachary Quinto’s (Spock’s) fingers together so he could perfect the Vulcan salute.",
		"Star Trek 2009 is dedicated to Gene Roddenberry and his wife Majel Barrett.",
		"According to Spock’s mother, Amanda, humans cannot pronounce Spock’s full name. It is written as S’chn-T Gai Spock, son of S’chn-T gai Sarek (of Skon and Solkar) of Vulcan.",
		"Shatner’s first wife left him after Star Trek: The Original Series was canceled.",
		"Shatner’s favorite episode is The Devil in the Dark because he says it contains all the elements that made Star Trek successful: intelligence and excitement.",
		"Captain Kirk’s dramatic pauses in speech have been called The Shatnerian.",
		"Fans of Star Trek have been called Trekologists, Treksters, Trekkies, and Trekkers. Some Star Trek fans prefer to be called Trekkers rather than Trekkies, though there is considerable debate about what the differences are between the terms.",
		"Roddenberry said Star Trek was influenced by A.E. van Vogt’s novel The Voyage of the Space Beagle, Eric Frank Russell’s Marathon series, Jonathan Swift’s Gulliver’s Travels, C. S. Forester’s Horatio Hornblower, and the film The Forbidden Planet.",
		"The original Star Trek concept included Captain April of the S.S. Yorktown, who later was reconceptualized as Captain Christopher Pike during the first pilot. After the first pilot was canceled, Captain Kirk replaced Pike.",
		"Hikaru Sulu was initially cast as the ship’s physicist before being cast as helmsman for the rest of the series.",
		"The number 47 seems to make recurrent appearances in Star Trek starting with the TNG. Apparently writer Joe Menosky, who attended Pomona College, heard that all numbers are equal to 47.",
		"Ferengi, the name of an alien race, is the Persian word for foreigner.",
		"In the Voyager episode Deadlock, the doctor has to deliver a baby of a human mother and Ktarian father. The baby has spiky ridges on its forehead arranged in such a way that it would have lacerated the mother’s uterus and vagina if the doctor had not been able to manage the delivery by transporter beam.",
		"Writers considered several other titles before deciding on Star Trek: The Next Generation, including Star Trek: Future Trek, Star Trek: Enterprise VII, and Star Trek: A New Generation.",
		"George Takei once urged Star Trek and Star Wars fans to end their rivalry to unite their hatred against the Twilight movies."
	]
};

```

These are the list of facts that Alexa will read from when the customer asks for a fact.

11. **Save** and **Deploy** your code.
12. Navigate to your `index.js`.
13. At the top of the file, add `const FACTS = require("./facts");`
14. Add the helper function to get a random number:

```
function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
```

15. Next, **add a handler** for the `FactIntent` to read off a random fact from this file:

```
const FactIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
    let randomFact = getRandom.call(this, 0, FACTS.FACTS.length-1);
    let speechText = "<voice name='Amy'>Here is your random fact: "
      + randomFact;
      + "</voice> ";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['ReturnHome']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  }
};
```

16. Finally, add `FactIntentHandler` to your **RequestHandler** builder.
17. **Save and deploy** your code.

### Task 4.2: Test that the Premium Feature works in your skill
At this point we should test that facts work within your Ship Commander skill. You can test your skill in the Developer Portal or in Lambda using the JSON Input from the testing console.

1. Navigate to the **Test** tab of the Developer Portal.
2. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
3. You should hear and see Alexa respond with the message in your LaunchRequest. Now type "i want a random fact".
4. Assure you get an appropriate response of a random fact and the correct display.

### Task 4.3: Add In-Skill Purchasing into your interaction model
Now we are going to add In-Skill purchasing into our skill. This will allow a customer to pay for a premium feature within your skill. You can integrate ISP into your skill through the Developer Portal or via the ASK-CLI.

1. Navigate to the **Build** tab of the Developer Portal.
2. Scroll down on the left-menu and select **IN-SKILL PRODUCTS**
3. You are now in the ISP management portal. Click the blue **Create In-Skill Product** button.
4. Type `fact_pack` in **Reference Name** field.
5. Assure that **One-Time Purchase** is selected as the product type.
6. Click the blue **Create In-Skill Product** button.
7. Fill all the metadata fields for `fact_pack` as follows:
	- **Display Name:** Fact Pack
	- **One Sentence Description:** Fact pack for the Ship Commander skill
	- **Detailed Description:** Unlock the fact pack to hear a random fact about Star Trek.
	- **Example Phrases:** Tell me a fact, Give me a random fact
	- **Icons:** Use the [Alexa Icon Builder](https://developer.amazon.com/docs/tools/icon-builder.html) to make the icons for your product, and upload each size appropriately
	- **Keywords:** fact, facts, random
	- **Purchase Prompt Description:** The fact pack includes multiple facts from the series Star Trek.
	- **Purchase confirmation description:** Purchase the fact pack?
	- **Privacy policy URL:** [https://privacy.com](https://privacy.com)
8. Click the **Save and Continue** button.
9. **Select a price** for your product (default is $0.99).
10. Assure the **Release Date** set to today.
11. Set the **Tax Category** for your product to "Information Services".
12. Click the **Save and Continue** button.
13. For **Testing Instructions**, insert your example phrases: Tell me a fact, Give me a fact.
14. Click the **Save and Finish** button.
15. You will see a prompt - “Link fact_pack to your skill?” - Click on **Link to skill**.

### Task 4.4: Add ISP into your service
Now that we can recognize ISP requests and responses within our skill, we need to handle it within our skill.

1. Firstly, we need two helper functions to let us know how to define an Entitlement within our skill. **Add** the following helper functions to `index.js` in the **Code** tab of the developer console:

```
function isProduct(product) {
  return product && product.length > 0;
}

function isEntitled(product) {
  return isProduct(product) && product[0].entitled == 'ENTITLED';
}
```

2. **Navigate** to our `FactIntentHandler` in `index.js`.
3. At the top of the `handle` function, **insert the following lines of code:**

```
handle(handlerInput) {
  const locale = handlerInput.requestEnvelope.request.locale;
  const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
```
The first line grabs the customer's local, and the second begins the monetization flow.

4. Wrap the logic we wrote in Task 4.1 in the following return statement:

```
  return ms.getInSkillProducts(locale).then(function(res) {
		// Task 4.1 logic here
  });
```
This statement will return an appropriate response depending on whether the customer has already made a purchase or not.

5. Now we need to determine what product a customer could purchase at this point in the skill, and if they have purchased it. **Insert the following code:**

```
  return ms.getInSkillProducts(locale).then(function(res) {
    var product = res.inSkillProducts.filter(record => record.referenceName == 'fact_pack');
    
    if (isEntitled(product)) {
      // Task 4.1 logic here
    } else {
      
    }
```
The customer will be pushed into the `else` statement if they have not purchased `fact_pack`. It will enter the ISP flow and ask if the user would like to complete a purchase.

6. **Insert the following code** into the `else` statement:

```
  const upsellMessage = "You don't currently own the fact pack. Want to learn more about it?";
  
  return handlerInput.responseBuilder
    .addDirective({
      'type': 'Connections.SendRequest',
      'name': 'Upsell',
      'payload': {
        'InSkillProduct': {
          'productId': product[0].productId
        },
        'upsellMessage': upsellMessage
      },
      'token': 'correlationToken'
    })
    .getResponse();
```

7. **Save and deploy** your code.

In this case, we are sending a directive with the name `Upsell`. This is indicating we are entering the ISP flow with the directive to tell the customer more information about the product before they purchase. We also need to create a similar intent for when the customer requests to buy something directly.

8. **Create a custom intent** named `BuyIntent` for your interaction model in the **Build** tab of Developer Portal with the following utterances

```
buy
buy facts
i want to buy facts
buy ship commander facts
buy me facts
purchase facts
purchase random facts
buy random facts
```

9. **Save and build** your interaction model.
10. In `index.js` in the **Code** tab, **create a handler** for `BuyIntent` that can send a directive of type `Connections.SendRequest` with the name `Buy` to buy the `fact_pack` directly:

```
const BuyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
       handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
  },
  handle(handlerInput) {  
    // Inform the user about what products are available for purchase
    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function(res) {
      let product = res.inSkillProducts.filter(record => record.referenceName == "fact_pack");

      return handlerInput.responseBuilder
        .addDirective({
          'type': 'Connections.SendRequest',
          'name': 'Buy',
          'payload': {
            'InSkillProduct': {
              'productId': product[0].productId
            }
          },
          'token': 'correlationToken'
        })
        .getResponse();
    });
  }
};
```
Once either the `Buy` or `Upsell` directive is sent, the customer has the option to ask for more information, or step out of the purchasing flow. We need to incorporate handlers for these steps.

11. **Create** a `BuyAndUpsellResponseHandler` that matches the following:

```
const BuyAndUpsellResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      (handlerInput.requestEnvelope.request.name === 'Buy' ||
        handlerInput.requestEnvelope.request.name === 'Upsell');
  },
  handle(handlerInput) {
    console.log('IN: BuyResponseHandler.handle');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function handlePurchaseResponse(res) {
      let product = res.inSkillProducts.filter(record => record.referenceName == 'fact_pack');

      if (handlerInput.requestEnvelope.request.status.code === '200') {
        let speechOutput = "";

        switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
          case 'ACCEPTED':
              speechOutput = "You have just purchased the ability to ask for facts. ";
              break;
          case 'DECLINED':
              speakOutput = "You can purchase facts at anytime during the game. "
              break;
          case 'ALREADY_PURCHASED':
              speechOutput = "You have just purchased the ability to ask for facts. ";
              break;
          default:
              speechOutput = "Something unexpected happened, but thanks for your interest in the fact pack. ";
              break;
        }

        return handlerInput.responseBuilder
          .speak(speechOutput + DEFAULT_REPROMPT)
          .reprompt(DEFAULT_REPROMPT)
          .getResponse();
      }

      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`);

      return handlerInput.responseBuilder
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
        .getResponse();
    });
  },
};
```

Notice how the returned response is just a normal speech response, indicating we are leaving the ISP flow.

We have now finished our intent handers for the ISP flow within our skill. We need to add these intents to our skill request handler.

12. **Add** `BuyIntentHandler` and `BuyAndUpsellResponseHandler` to your **RequestHandler** builder.
13. **Save and deploy** your code. 

### Task 4.5: Test that the ISP works in your skill

We will now test our skill again to assure that the ISP flow works and that our facts are accessible ONLY after a purchase flow is successful.

1. Navigate to the **Test** tab of the Developer Portal.
2. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
3. You should hear and see Alexa respond with the message in your LaunchRequest. Now type "i want a fact".
4. **Assure that she asks you if you want to purchase facts.**
5. She should respond with "You don't currently own the fact pack. Want to learn more about it?". Type "yes".
6. She should now read your **entitlement description**. Respond "yes" to buy it.
7. Now that you have purchased a fact pack, we can start a new game with facts! Say "i want a fact" and assure you get a random fact with an appropriate display.


### Congratulations! You have finished Task 4!


## License

This library is licensed under the Amazon Software License.