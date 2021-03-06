/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const FACTS = require("./facts");

const HELP = "<voice name='Amy'>You can say either: analyze ship status, beam me up, "
    + "set hyper drive to warp speed, read the captains log, attack, defend or return "
    + "home.</voice>";
const DEFAULT_REPROMPT = "<voice name='Amy'>What would you like to do next?</voice>";
const GOODBYE = "<voice name='Amy'>Until next time commander.</voice>";

const VIDEO_URLS = {
  "AnalyzeShipStatus": "https://s3.amazonaws.com/apl-community-code/space/rocket-horizontal.mp4",
  "Attack": "https://s3.amazonaws.com/apl-community-code/space/attack.mp4",
  "BeamMeUp": "https://s3.amazonaws.com/apl-community-code/space/nebula.mp4",
  "CaptainsLog": "https://s3.amazonaws.com/apl-community-code/space/controls.mp4",
  "Defend": "https://s3.amazonaws.com/apl-community-code/space/defend.mp4",
  "HyperDrive": "https://s3.amazonaws.com/apl-community-code/space/warp.mp4",
  "ReturnHome": "https://s3.amazonaws.com/apl-community-code/space/space.mp4"
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent')

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'home');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://s3.amazonaws.com/apl-community-code/space/spacelr2.mp3'></audio>";

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
      .reprompt(HELP)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const AnalyzeShipStatusIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'analyze');
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Analyzing the ship status "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_open_airlock_01'/>"
      + "Ship is under well condition. No damage, fuel levels are full. "
      + "No immediate cause for concern.</voice>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['AnalyzeShipStatus']
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
  },
};

const AttackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'attack');
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Deploy the rockets"
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_incoming_explosion_01'/>"
     + "Engage in initial attack</voice> "
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_2x_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['Attack']
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
  },
};

const BeamMeUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'beam');
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Prepare to beam "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_large_01'/> "
      + "Engage</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_short_burst_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['BeamMeUp']
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
  },
};

const SetHyperDriveIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'warp');
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Engaging hyper drive now</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_long_explosion_1x_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['HyperDrive']
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
  },
};

const CaptainsLogIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'checkLog');
  },
  handle(handlerInput) {
    const speechText = "<speak>"
        + "<voice name='Amy'>Most recent entry of the Captains log</voice>"
        + "<break time='1s'/>"
        + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>"
        + "<voice name='Matthew'>Day <say-as interpret-as='digits'>537</say-as>"
        + "on the exploration mission. The crew is in good spirits and happy to be aboard the ship. "
        + "Today we are going to attempt entry into the Dominion, the gamma galactic quadrant. "
        + "<amazon:effect name='whispered'>I hope we will be safe.</amazon:effect>"
        + "Until next time.</voice>"
        + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>"
    +"</speak>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['CaptainsLog']
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
  },
};

const DefendIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'defend');
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Engage defensive shields</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_sheilds_up_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['Defend']
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
  },
};

const FactIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    return ms.getInSkillProducts(locale).then(function(res) {
      var product = res.inSkillProducts.filter(record => record.referenceName == 'fact_pack');
    
      if (isEntitled(product)) {
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
      } else {
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
      }
    });
  }
};

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

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
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
      .speak(HELP)
      .reprompt(HELP)
      .withSimpleCard('Ship Commander', HELP)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(GOODBYE)
      .withSimpleCard('Ship Commander', GOODBYE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AnalyzeShipStatusIntentHandler,
    AttackIntentHandler,
    BeamMeUpIntentHandler,
    SetHyperDriveIntentHandler,
    CaptainsLogIntentHandler,
    DefendIntentHandler,
    FactIntentHandler,
    BuyAndUpsellResponseHandler,
    BuyIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
