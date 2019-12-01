const { NlpManager } = require('node-nlp');
 
const manager = new NlpManager({ languages: ['en', 'hi'] });
// Adds the utterances and intents for the NLP
manager.addDocument('en', 'how can I get technical help', 'ask.question');
manager.addDocument('hi', 'mujhe takaneekee madad kaise mil sakatee hai');
manager.addDocument('en', 'I need technical help', 'ask.question');
manager.addDocument('en', 'can anyone help me', 'ask.question');
manager.addDocument('en', 'where can I get help', 'ask.doc');
manager.addDocument('en', 'when does the next voyage start', 'schedule.voyage');
manager.addDocument('en', 'display the voyage schedule', 'schedule.voyage');
manager.addDocument('en', 'list the voyage schedule', 'schedule.voyage');
manager.addDocument('en', 'show the voyage schedule', 'schedule.voyage');
 
// Train also the NLG
manager.addAnswer('en', 'ask.doc', 'https://docs.chingu.io');
manager.addAnswer('en', 'ask.question', 'https://chingu.docs.chingu.io/about/askhelp');
manager.addAnswer('hi', 'ask.question', 'https://chingu.docs.chingu.io/about/askhelp');
manager.addAnswer('en', 'schedule.voyage', 'https://chingu.docs.chingu.io/intro/schedule');
 
// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    //const response = await manager.process('en', 'what is the voyage schedule');
    const response = await manager.process('I need help');
    console.log(response);
})();