/**
 * GURU Conversation Enhancement Module
 * 
 * This module enhances GURU's conversational capabilities with:
 * - More human-like speech patterns and pauses
 * - Advanced turn-taking mechanisms
 * - Improved interruption detection and handling
 * - Natural conversation flow management
 * - Realistic timing and cadence
 */

class GuruConversationEnhancer {
    constructor(jarvisInstance) {
        // Store reference to main JARVIS instance
        this.jarvis = jarvisInstance;
        
        // Natural conversation parameters
        this.naturalConversation = {
            // Speech patterns
            naturalPauses: true,
            pausePatterns: {
                shortPause: 300,  // ms pause for commas
                mediumPause: 500, // ms pause for periods
                longPause: 800,   // ms pause for paragraphs
                thoughtPause: 1200 // ms pause when "thinking"
            },
            
            // Turn-taking parameters (enhanced)
            turnTaking: {
                endOfTurnCues: [
                    /\?\s*$/,         // Questions
                    /what do you think\??$/i,
                    /your thoughts\??$/i,
                    /wouldn't you say\??$/i,
                    /don't you think\??$/i,
                    /right\??$/i,
                    /isn't that so\??$/i
                ],
                continuationCues: [
                    /^so\b/i,
                    /^and\b/i,
                    /^but\b/i,
                    /^because\b/i,
                    /^however\b/i,
                    /^although\b/i,
                    /^now\b/i,
                    /^anyway\b/i,
                    /^as I was saying\b/i
                ],
                minSilenceForTurn: 800,  // ms of silence to consider turn complete
                maxTurnDuration: 30000,  // ms maximum turn duration (prevent monopolizing)
                turnGracePeriod: 1200,   // ms to wait after detecting end of turn
                backchannelResponses: [
                    "Mmm-hmm",
                    "I see",
                    "Yes",
                    "Right",
                    "Got it",
                    "Interesting",
                    "Okay"
                ]
            },
            
            // Human-like listening behaviors
            listeningBehavior: {
                showActiveListening: true,     // Show visual/audio cues when listening
                activeListeningInterval: 5000, // ms between active listening cues
                listeningCues: [
                    "I'm listening",
                    "Go on",
                    "Tell me more",
                    "I understand"
                ],
                showThinking: true,           // Show when "thinking" about response
                thinkingDuration: {
                    min: 400,                 // Minimum ms to "think"
                    max: 2000,                // Maximum ms to "think"
                    perCharacter: 0.5         // Additional ms per character of input
                }
            },
            
            // Interruption handling (enhanced)
            interruptionHandling: {
                detectInterruptions: true,    // Listen for user interruptions
                interruptionThreshold: -25,   // Audio dB threshold for interruption
                interruptionDuration: 250,    // Min ms of speech to qualify as interruption
                gracefulCutoff: true,         // Finish current sentence when interrupted
                resumeInterruptedThought: true, // Resume from interruption point
                acknowledgePriority: [        // Priority of responses to interruptions
                    "full-acknowledgment",    // "Let me address your point about X"
                    "brief-acknowledgment",   // "About your question..."
                    "implicit-acknowledgment", // Just switch to new topic
                    "no-acknowledgment"       // Just stop and start new response
                ]
            },
            
            // Human-like speech variations
            speechVariations: {
                useFillers: true,            // Use filler words occasionally
                fillerFrequency: 0.05,       // Probability of inserting a filler
                fillerWords: [
                    "um", "uh", "well", "you know", 
                    "like", "so", "actually", "basically"
                ],
                useDisfluencies: true,       // Use realistic disfluencies 
                disfluencyFrequency: 0.02,   // Probability of disfluency
                useSpeechCorrections: true,  // Self-corrections in speech
                correctionFrequency: 0.03,   // Probability of self-correction
                correctionPatterns: [
                    "Actually, what I mean is",
                    "Sorry, I meant to say",
                    "Rather",
                    "I should say",
                    "Or better yet"
                ]
            },
            
            // Realistic response timing
            responseTiming: {
                useVariableTiming: true,     // Vary response times naturally
                baseResponseDelay: 300,      // Base ms delay before responding
                complexityFactor: 15,        // Additional ms per word in query
                maxResponseDelay: 2000,      // Maximum ms to delay response
                contextSwitchDelay: 600,     // Additional ms when changing topics
                firstResponseFaster: true    // First response in conversation is faster
            }
        };
        
        // Stop words detection (enhanced)
        this.stopWordDetection = {
            enabled: true,
            immediateStopPatterns: [
                /^stop$/i,
                /^wait$/i,
                /stop talking/i,
                /shut up/i,
                /be quiet/i,
                /enough$/i,
                /hold on/i
            ],
            politeStopPatterns: [
                /please stop/i,
                /could you stop/i,
                /would you mind stopping/i,
                /that's enough/i,
                /let me speak/i,
                /I'd like to say something/i
            ],
            emergencyStopSignals: [
                "STOP",
                "QUIET",
                "SILENCE"
            ],
            // Audio-based stop detection
            audioStopDetection: true,
            audioStopThreshold: 0.8, // Loud interruption threshold
            audioStopDuration: 300   // ms of loud audio to trigger stop
        };
        
        // Conversation flow management
        this.conversationFlow = {
            trackTopics: true,
            currentTopic: null,
            previousTopics: [],
            topicShiftDetection: true,
            topicReturnCues: [
                /back to what (we|you) were (saying|talking about)/i,
                /as (we|you) were saying/i,
                /on the (original|previous) (topic|subject)/i,
                /to return to/i
            ],
            greetingDetection: true,
            greetingPatterns: [
                /^hi\b/i,
                /^hello\b/i,
                /^hey\b/i,
                /^greetings\b/i,
                /^good (morning|afternoon|evening)/i
            ],
            farewellDetection: true,
            farewellPatterns: [
                /^bye\b/i,
                /^goodbye\b/i,
                /^farewell\b/i,
                /^see you/i,
                /^talk to you later/i,
                /^have a (good|great|nice) day/i,
                /^until next time/i
            ]
        };
        
        // Initialize the enhancer
        this.init();
    }
    
    /**
     * Initialize the conversation enhancer
     */
    init() {
        console.log('🗣️ Initializing GURU Conversation Enhancer...');
        
        // Override the core methods to enhance conversational abilities
        this.patchCoreMethods();
        
        // Set up enhanced event listeners for conversation
        this.setupEnhancedListeners();
        
        console.log('✅ GURU Conversation Enhancer initialized');
    }
    
    /**
     * Patch core methods to inject enhanced conversational capabilities
     */
    patchCoreMethods() {
        const jarvis = this.jarvis;
        
        // Store original methods to call them from our enhanced versions
        if (!jarvis) return;
        
        this.originalMethods = {
            speakMethod: jarvis.speak,
            speakConversationalMethod: jarvis.speakConversational,
            processInputMethod: jarvis.processInput,
            detectVoiceActivityMethod: jarvis.detectVoiceActivity,
            updateConversationStateMethod: jarvis.updateConversationState,
            handleTurnTakingMethod: jarvis.handleTurnTaking,
            optimizeTextForConversationMethod: jarvis.optimizeTextForConversation,
            processConversationalInputMethod: jarvis.processConversationalInput
        };
        
        // Enhance the speak method with more natural patterns
        jarvis.speak = this.enhancedSpeak.bind(this);
        
        // Enhance conversational speak with better pauses and variations
        jarvis.speakConversational = this.enhancedSpeakConversational.bind(this);
        
        // Enhance text optimization with more natural patterns
        jarvis.optimizeTextForConversation = this.enhancedOptimizeTextForConversation.bind(this);
        
        // Enhance input processing with better stop word detection
        jarvis.processInput = this.enhancedProcessInput.bind(this);
        
        // Enhance turn-taking with more sophisticated detection
        jarvis.handleTurnTaking = this.enhancedHandleTurnTaking.bind(this);
        
        // Enhance conversational input processing
        jarvis.processConversationalInput = this.enhancedProcessConversationalInput.bind(this);
        
        console.log('🔄 Core methods enhanced with conversational capabilities');
    }
    
    /**
     * Set up enhanced event listeners for conversation
     */
    setupEnhancedListeners() {
        // Add enhanced listeners here
        if (!this.jarvis) return;
        
        // Set conversational mode to always enabled
        this.jarvis.conversationalMode.enabled = true;
        
        console.log('👂 Enhanced conversation listeners activated');
    }
    
    /**
     * Enhanced speak method with more natural patterns
     */
    enhancedSpeak(text, isInitial = false) {
        if (!this.jarvis) return;
        
        // Always use the conversational version
        return this.enhancedSpeakConversational(text, isInitial);
    }
    
    /**
     * Enhanced conversational speaking with better natural patterns
     */
    enhancedSpeakConversational(text, isInitial = false) {
        if (!this.jarvis || this.jarvis.isSpeaking && !isInitial) return;
        
        // Apply enhanced text optimization
        text = this.enhancedOptimizeTextForConversation(text);
        
        // Add thinking pause for more natural response (only if not initial greeting)
        if (!isInitial) {
            const thinkingTime = this.calculateThinkingTime(text);
            
            // Update status to show thinking
            if (this.naturalConversation.listeningBehavior.showThinking) {
                this.jarvis.updateStatus('ai', 'processing', 'Thinking...');
                this.jarvis.showSubtitle('Thinking...', 'jarvis');
                
                // Delay actual speech for thinking time
                setTimeout(() => {
                    // Call original method after thinking delay
                    this.originalMethods.speakConversationalMethod.call(this.jarvis, text, false);
                }, thinkingTime);
                
                return;
            }
        }
        
        // Call original method directly if not using thinking delay
        return this.originalMethods.speakConversationalMethod.call(this.jarvis, text, isInitial);
    }
    
    /**
     * Enhanced text optimization for more natural conversation
     */
    enhancedOptimizeTextForConversation(text) {
        if (!this.jarvis) return text;
        
        // Start with original optimization
        let optimized = this.originalMethods.optimizeTextForConversationMethod.call(this.jarvis, text);
        
        // Add filler words if enabled
        if (this.naturalConversation.speechVariations.useFillers) {
            optimized = this.addFillerWords(optimized);
        }
        
        // Add speech corrections if enabled
        if (this.naturalConversation.speechVariations.useSpeechCorrections) {
            optimized = this.addSpeechCorrections(optimized);
        }
        
        // Add more sophisticated natural pausing
        optimized = this.addNaturalPauses(optimized);
        
        return optimized;
    }
    
    /**
     * Add filler words for more natural speech
     */
    addFillerWords(text) {
        if (!this.naturalConversation.speechVariations.useFillers) {
            return text;
        }
        
        const fillerFrequency = this.naturalConversation.speechVariations.fillerFrequency;
        const fillerWords = this.naturalConversation.speechVariations.fillerWords;
        
        // Split text into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Process each sentence with a chance of adding fillers
        return sentences.map(sentence => {
            // Skip very short sentences
            if (sentence.split(' ').length < 4) return sentence;
            
            // Random chance to add filler at start
            if (Math.random() < fillerFrequency) {
                const filler = fillerWords[Math.floor(Math.random() * fillerWords.length)];
                return `${filler}, ${sentence}`;
            }
            
            return sentence;
        }).join(' ');
    }
    
    /**
     * Add speech corrections for more natural speech
     */
    addSpeechCorrections(text) {
        if (!this.naturalConversation.speechVariations.useSpeechCorrections) {
            return text;
        }
        
        const correctionFrequency = this.naturalConversation.speechVariations.correctionFrequency;
        const correctionPatterns = this.naturalConversation.speechVariations.correctionPatterns;
        
        // Random chance to add a correction
        if (Math.random() > correctionFrequency) {
            return text;
        }
        
        // Split text into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Skip if too few sentences
        if (sentences.length < 2) return text;
        
        // Pick a random sentence in the first half to correct
        const correctionIndex = Math.floor(Math.random() * Math.floor(sentences.length / 2));
        
        // Get a correction phrase
        const correctionPhrase = correctionPatterns[Math.floor(Math.random() * correctionPatterns.length)];
        
        // Create a slightly different version of the sentence
        const originalSentence = sentences[correctionIndex];
        let correctedSentence = originalSentence;
        
        // Simple word replacement for correction
        const words = originalSentence.split(' ');
        if (words.length > 3) {
            const wordToReplace = Math.floor(Math.random() * (words.length - 2)) + 1;
            const replacements = {
                'very': 'extremely',
                'good': 'great',
                'bad': 'poor',
                'big': 'large',
                'small': 'tiny',
                'important': 'critical',
                'interesting': 'fascinating'
            };
            
            // Try to find a word we can replace
            for (let i = 0; i < words.length; i++) {
                const word = words[i].toLowerCase().replace(/[^\w]/g, '');
                if (replacements[word]) {
                    words[i] = words[i].replace(new RegExp(word, 'i'), replacements[word]);
                    correctedSentence = words.join(' ');
                    break;
                }
            }
        }
        
        // Apply the correction
        sentences[correctionIndex] = `${originalSentence} ${correctionPhrase} ${correctedSentence}`;
        
        return sentences.join(' ');
    }
    
    /**
     * Add more sophisticated natural pauses
     */
    addNaturalPauses(text) {
        // Add natural pause markers
        return text
            // Longer pauses at the end of questions
            .replace(/\?\s+/g, '? ... ... ')
            
            // Medium pauses after statements
            .replace(/\.\s+/g, '. ... ')
            
            // Shorter pauses after commas
            .replace(/,\s+/g, ', ... ')
            
            // Emphasis pauses around important phrases
            .replace(/(important|critical|essential|crucial|significant)/gi, '... $1 ...')
            
            // Thoughtful pauses before conclusions
            .replace(/(in conclusion|to summarize|therefore|thus|hence)/gi, '... ... $1')
            
            // Clean up any excessive pauses
            .replace(/\.{3,}/g, '...')
            .replace(/\s+/g, ' ');
    }
    
    /**
     * Enhanced process input with better stop word detection
     */
    enhancedProcessInput(text) {
        if (!this.jarvis || !text) {
            return;
        }
        
        // Check for stop words first with enhanced detection
        if (this.checkStopWords(text)) {
            return;
        }
        
        // Call original method
        return this.originalMethods.processInputMethod.call(this.jarvis, text);
    }
    
    /**
     * Enhanced processing of conversational input
     */
    enhancedProcessConversationalInput(text) {
        if (!this.jarvis || !text) {
            return;
        }
        
        // Check for greetings and farewells
        if (this.handleSpecialConversationCues(text)) {
            return;
        }
        
        // Call original method
        return this.originalMethods.processConversationalInputMethod.call(this.jarvis, text);
    }
    
    /**
     * Enhanced handle turn-taking with more sophisticated detection
     */
    enhancedHandleTurnTaking() {
        if (!this.jarvis) {
            return;
        }
        
        console.log('🔄 Processing enhanced turn-taking');
        
        // Get the latest transcript
        const lastTranscript = this.jarvis.interimText || this.jarvis.lastHeard;
        
        // Use enhanced turn detection patterns
        const isEndOfTurn = this.naturalConversation.turnTaking.endOfTurnCues.some(pattern => 
            pattern.test(lastTranscript));
            
        const isContinuation = this.naturalConversation.turnTaking.continuationCues.some(pattern => 
            pattern.test(lastTranscript));
        
        if (isContinuation) {
            // Wait for more input with continuation cues
            console.log('🔄 Detected continuation pattern - waiting for more input');
            this.jarvis.conversationalMode.conversationState = 'idle';
            return;
        }
        
        // Add a more natural pause before responding
        const pauseDuration = this.naturalConversation.pausePatterns.thoughtPause;
        
        // Process the turn after a natural pause
        setTimeout(() => {
            // Process the complete turn
            if (lastTranscript && lastTranscript.trim().length > 0) {
                // Add backchannel response occasionally for long inputs
                if (lastTranscript.length > 50 && Math.random() > 0.7) {
                    const backchannel = this.getRandomBackchannel();
                    this.jarvis.showSubtitle(backchannel, 'jarvis');
                }
                
                this.jarvis.processCommand(lastTranscript);
            } else {
                // No valid input, return to idle
                this.jarvis.conversationalMode.conversationState = 'idle';
            }
        }, pauseDuration);
    }
    
    /**
     * Check for stop words with enhanced patterns
     * @returns {boolean} True if stop word detected and handled
     */
    checkStopWords(text) {
        if (!text || !this.stopWordDetection.enabled || !this.jarvis) {
            return false;
        }
        
        const lowerText = text.toLowerCase().trim();
        
        // Check for immediate stop patterns (highest priority)
        const isImmediateStop = this.stopWordDetection.immediateStopPatterns.some(pattern => 
            pattern.test(lowerText));
            
        // Check for polite stop patterns
        const isPoliteStop = this.stopWordDetection.politeStopPatterns.some(pattern => 
            pattern.test(lowerText));
        
        // Check for emergency stop signals (exact match, case sensitive)
        const isEmergencyStop = this.stopWordDetection.emergencyStopSignals.some(signal => 
            text.includes(signal));
        
        if (isImmediateStop || isPoliteStop || isEmergencyStop) {
            console.log(`🚨 Stop command detected: "${text}"`);
            
            // Stop speech immediately
            this.jarvis.stopSpeech();
            
            // For emergency stops, don't respond
            if (isEmergencyStop) {
                return true;
            }
            
            // For polite stops, acknowledge
            if (isPoliteStop && !isImmediateStop) {
                setTimeout(() => {
                    this.jarvis.speak("I'll pause. Let me know when you'd like me to continue.");
                }, 300);
            }
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Handle special conversation cues like greetings and farewells
     * @returns {boolean} True if special cue handled
     */
    handleSpecialConversationCues(text) {
        if (!text || !this.jarvis) {
            return false;
        }
        
        const lowerText = text.toLowerCase().trim();
        
        // Handle greetings
        if (this.conversationFlow.greetingDetection) {
            const isGreeting = this.conversationFlow.greetingPatterns.some(pattern => 
                pattern.test(lowerText));
                
            if (isGreeting) {
                console.log(`👋 Greeting detected: "${text}"`);
                
                // Get time-appropriate greeting
                const greeting = this.getTimeBasedGreeting();
                this.jarvis.speak(`${greeting}! How can I help you today?`);
                return true;
            }
        }
        
        // Handle farewells
        if (this.conversationFlow.farewellDetection) {
            const isFarewell = this.conversationFlow.farewellPatterns.some(pattern => 
                pattern.test(lowerText));
                
            if (isFarewell) {
                console.log(`👋 Farewell detected: "${text}"`);
                
                // End conversation with farewell
                this.jarvis.speak("Goodbye! Have a great day. Let me know if you need anything else later.");
                
                // End the conversation after response
                setTimeout(() => {
                    this.jarvis.endConversation(false);
                }, 5000);
                
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Get a time-appropriate greeting
     */
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        
        if (hour < 12) {
            return "Good morning";
        } else if (hour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }
    
    /**
     * Get a random backchannel response
     */
    getRandomBackchannel() {
        const responses = this.naturalConversation.turnTaking.backchannelResponses;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    /**
     * Calculate thinking time based on input complexity
     */
    calculateThinkingTime(text) {
        const config = this.naturalConversation.listeningBehavior.thinkingDuration;
        
        // Base thinking time
        let thinkingTime = Math.random() * (config.max - config.min) + config.min;
        
        // Add time based on last heard complexity
        const lastHeard = this.jarvis?.lastHeard || '';
        if (lastHeard) {
            thinkingTime += lastHeard.length * config.perCharacter;
        }
        
        // Cap at maximum
        return Math.min(thinkingTime, config.max);
    }
}

// Export the enhancer
if (typeof window !== 'undefined') {
    window.GuruConversationEnhancer = GuruConversationEnhancer;
} 