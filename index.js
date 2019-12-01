const { NlpManager } = require('node-nlp');
 
const manager = new NlpManager({ languages: ['en', 'hi'], nlu: { log: false } });
// Adds the utterances and intents for the Natural Language Processor (NLP)
manager.addNamedEntityText('begin', 'begin', ['en'], ['begin']);
manager.addNamedEntityText('begin', 'start', ['en'], ['start']);
manager.addNamedEntityText('action', 'ask', ['en'], ['ask']);
manager.addNamedEntityText('action', 'can', ['en'], ['can']);
manager.addNamedEntityText('action', 'display', ['en'], ['display']);
manager.addNamedEntityText('action', 'help', ['en'], ['help']);
manager.addNamedEntityText('action', 'how', ['en'], ['how']);
manager.addNamedEntityText('action', 'i', ['en'], ['i']);
manager.addNamedEntityText('action', 'info', ['en'], ['info']);
manager.addNamedEntityText('action', 'list', ['en'], ['list']);
manager.addNamedEntityText('action', 'need', ['en'], ['need']);
manager.addNamedEntityText('action', 'show', ['en'], ['show']);
manager.addNamedEntityText('action', 'tell', ['en'], ['tell']);
manager.addNamedEntityText('action', 'what', ['en'], ['what']);
manager.addNamedEntityText('action', 'when', ['en'], ['when']);
manager.addNamedEntityText('action', 'where', ['en'], ['where']);
manager.addNamedEntityText('mgt', 'mgt', ['en'], ['mgt']);
manager.addNamedEntityText('mgt', 'management', ['en'], ['management']);
manager.addNamedEntityText('mgr', 'mgr', ['en'], ['manager']);
manager.addNamedEntityText('mgr', 'manager', ['en'], ['manager']);
manager.addNamedEntityText('mgr', 'pm', ['en'], ['manager']);
manager.addNamedEntityText('pp', 'pp', ['en'], ['pair programming']);
manager.addNamedEntityText('pp', 'pair prog', ['en'], ['pair prog']);
manager.addNamedEntityText('pp', 'pair programming', ['en'], ['pair programming']);
manager.addNamedEntityText('proj', 'pm', ['en'], ['pm']);
manager.addNamedEntityText('proj', 'proj', ['en'], ['proj']);
manager.addNamedEntityText('proj', 'project', ['en'], ['project']);
manager.addNamedEntityText('res', 'res', ['en'], ['resource']);
manager.addNamedEntityText('res', 'resource', ['en'], ['resource']);
manager.addNamedEntityText('sched', 'cal', ['en'], ['calendar']);
manager.addNamedEntityText('sched', 'calendar', ['en'], ['calendar']);
manager.addNamedEntityText('sched', 'sched', ['en'], ['schedule']);
manager.addNamedEntityText('sched', 'schedule', ['en'], ['schedule']);
manager.addNamedEntityText('tech', 'tech', ['en'], ['tech']);
manager.addNamedEntityText('tech', 'technical', ['en'], ['technical']);
manager.addNamedEntityText('tech', 'technology', ['en'], ['technical']);

manager.addDocument('en', '%action% help', 'ask.all');
manager.addDocument('en', 'I need help', 'ask.all');
manager.addDocument('en', '%action% question', 'ask.all');

manager.addDocument('en', '%action% chingu', 'doc.chingu');

manager.addDocument('en', '%action% %pp%', 'doc.pair');

manager.addDocument('en', '%action% %proj%', 'doc.proj');
manager.addDocument('en', '%action% %proj% %mgr%', 'doc.proj');
manager.addDocument('en', '%action% %proj% %mgt%', 'doc.proj');
manager.addDocument('en', '%action% %proj% %res%', 'doc.proj');

manager.addDocument('en', '%action% %tech%', 'doc.tech');
manager.addDocument('en', '%action% %tech% %mgt%', 'doc.tech');
manager.addDocument('en', '%action% %tech% %res%', 'doc.tech');

manager.addDocument('en', '%action% voyage', 'doc.voyage');

manager.addDocument('en', 'voyage %sched%', 'schedule.voyage');
manager.addDocument('en', 'when does the next voyage %begin%', 'schedule.voyage');
manager.addDocument('en', '%display% voyage %sched%', 'schedule.voyage');
 
// Train the Natural Language Generator (NLG)
manager.addAnswer('en', 'ask.all', 'Use the #ask-cohort-n-code questions channel to get help from your fellow Chingu\'s');

manager.addAnswer('en', 'ask.question', 'https://chingu.docs.chingu.io/about/askhelp');
manager.addAnswer('hi', 'ask.question', 'https://chingu.docs.chingu.io/about/askhelp');

manager.addAnswer('en', 'doc.chingu', 'https://chingu.docs.chingu.io');
manager.addAnswer('en', 'doc.pair', 'https://pairprog.docs.chingu.io');
manager.addAnswer('en', 'doc.proj', 'https://projres.docs.chingu.io');
manager.addAnswer('en', 'doc.tech', 'https://techres.docs.chingu.io');
manager.addAnswer('en', 'doc.voyage', 'https://voyage.docs.chingu.io');

manager.addAnswer('en', 'ask.voyage', 'https://voyage.docs.chingu.io');

manager.addAnswer('en', 'schedule.voyage', 'https://chingu.docs.chingu.io/intro/schedule');
 
// Train and save the model.
(async() => {
  await manager.train();
  manager.save();
  //const response = await manager.process('en', 'what is the voyage schedule');
  const questions = [
    'help',
    'question',
    'i have a question',
    'i need help',
    'help chingu',
    'tell me about chingu',
    'help pp',
    'tell me about pair programming',
    'what is pair prog',
    'tell me about the project mgt',
    'what does a pm do?',
    'what is a project manager?',
    'list project resources',
    'what project resources',
    'list tech resources',
    'what technical resources are there?',
    'show technical resources',
    'what is the voyage schedule?',
    'when is the next voyage?',
    'tell me about the voyage',
    'need voyage info please',
  ];
  for (let i = 0; i<questions.length; i++) {
    const response = await manager.process(questions[i]);
    console.log(`Q: ${response.utterance} A: ${response.answer}`);
  };
 
})();