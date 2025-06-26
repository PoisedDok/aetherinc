        // JARVIS Multi-Provider AI System with Enhanced Visual Feedback - FULLY FIXED VERSION
        console.log('');
        
        class JarvisAI {
            constructor() {
                this.isInitialized = false;
                this.isListening = false;
                this.isSpeaking = false;
                this.audioContext = null;
                this.analyser = null;
                this.microphone = null;
                this.speechRecognition = null;
                this.speechSynthesis = window.speechSynthesis;
                this.startTime = Date.now();
                this.wakeWords = ['guru', 'hey guru', 'computer', 'aether'];
                this.neuralNetwork = null;
                this.audioData = new Uint8Array(256);
                this.micLevel = 0;
                this.lastHeard = 'None';
                this.manualTalkMode = false;
                this.currentSpeaker = 'none'; // 'user', 'guru', or 'none' - FIXED: Dynamic colors
                this.interimText = '';
                this.elevenLabsApiKey = '';
                this.currentVoiceProvider = 'elevenlabs'; // 'elevenlabs', 'edge', 'native'
                this.elevenLabsVoiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice - professional male
                this.elevenLabsVoices = []; // Store available ElevenLabs voices
                this.hasGreeted = false;
                this.conversationActive = false; // Track if we're in active conversation
                this.availableOllamaModels = []; // Store available Ollama models
                
                // ENHANCED CONVERSATIONAL AI FEATURES - Advanced VAD and turn-taking
                this.conversationalMode = {
                    enabled: true,
                    voiceActivityDetection: null,
                    turnTakingEngine: null,
                    streamingMode: false,
                    interruptionHandling: true,
                    contextAwareness: true,
                    naturalPauses: true,
                    responseLatency: 0,
                    lastResponseTime: 0,
                    conversationState: 'idle', // 'idle', 'listening', 'processing', 'responding', 'turn-taking'
                    silenceThreshold: -45, // dB threshold for silence detection
                    speechThreshold: -30, // dB threshold for speech detection
                    minimumSpeechDuration: 500, // minimum ms of speech to trigger
                    endOfSpeechPause: 1200, // ms of silence to end speech
                    turnTakingDelay: 800, // ms delay before responding to allow interruptions
                    audioBuffer: new Array(50).fill(0), // Rolling audio level buffer
                    vadConfidence: 0,
                    speechStartTime: null,
                    speechEndTime: null,
                    lastSpeechLevel: 0,
                    backgroundNoiseLevel: -50,
                    adaptiveThresholds: true
                };
                
                // Advanced conversation flow control
                this.conversationFlow = {
                    allowInterruptions: true,
                    waitForTurnSignals: true,
                    detectQuestionPatterns: true,
                    maintainContext: true,
                    streamingResponses: false,
                    maxResponseTime: 30000, // 30 seconds max response
                    turnTakingPatterns: [
                        /\?[\s]*$/, // Questions
                        /right\?[\s]*$/, /okay\?[\s]*$/,
                        /you know[\s]*$/, /understand[\s]*$/
                    ],
                    continuationPatterns: [
                        /and[\s]*$/, /but[\s]*$/, /so[\s]*$/,
                        /also[\s]*$/, /however[\s]*$/
                    ]
                };
                
                // Enhanced WebRTC-like audio processing
                this.audioProcessor = {
                    sampleRate: 16000,
                    bufferSize: 4096,
                    processingWorklet: null,
                    audioBuffer: [],
                    rmsLevels: new Array(100).fill(0),
                    frequencyAnalysis: {
                        lowFreq: new Array(20).fill(0),
                        midFreq: new Array(20).fill(0),
                        highFreq: new Array(20).fill(0)
                    }
                };
                
                // ENHANCED MEMORY SYSTEM - No backend needed
                this.conversations = new Map(); // In-memory conversation storage
                this.currentConversationId = null;
                this.conversationHistory = []; // Current conversation messages
                this.maxHistoryLength = 20; // Keep last 20 messages for context
                this.conversationStartTime = null;
                this.lastActivityTime = null;
                this.conversationTimeout = 5 * 60 * 1000; // 5 minutes of inactivity ends conversation
                
                // AI Provider Configuration - NEW: Gemini support
                this.currentProvider = 'gemini-2.0-flash';
                this.providers = {
                    ollama: {
                        name: 'Local Ollama',
                        url: 'http://localhost:11434',
                        model: 'llama3.2',
                        connected: false
                    },
                    'gemini-2.5-flash': {
                        name: 'Gemini 2.5 Flash',
                        model: 'gemini-2.0-flash-exp',
                        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
                        connected: false
                    },
                    'gemini-2.0-flash': {
                        name: 'Gemini 2.0 Flash',
                        model: 'gemini-2.0-flash-exp',
                        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
                        connected: false
                    }
                };
                
                // Enhanced visualizer controls - NEW: Interactive controls with damping
                this.visualizerControls = {
                    mouseDown: false,
                    lastMouseX: 0,
                    lastMouseY: 0,
                    rotationX: 0.01,
                    rotationY: 0.01,
                    rotationVelocityX: 0,
                    rotationVelocityY: 0,
                    zoom: 1,
                    touchStartDistance: 0,
                    damping: 0.95,
                    autoRotate: true,
                    lastInteraction: Date.now()
                };
                
                // ADVANCED SEARCH ENGINE INTEGRATION - Using separate GuruAdvancedSearchEngine module
                this.advancedSearchEngine = new GuruAdvancedSearchEngine();
                this.searchEnabled = true;
                this.searchResults = [];
                this.lastSearchQuery = '';
                
                // Legacy search support for fallback
                this.searchMethods = [
                    {
                        name: 'DuckDuckGo Instant Answers',
                        type: 'ddg',
                        url: 'https://api.duckduckgo.com/',
                        corsSupport: true,
                        working: null
                    },
                    {
                        name: 'Wikipedia API',
                        type: 'wikipedia',
                        url: 'https://en.wikipedia.org/w/api.php',
                        corsSupport: true,
                        working: null
                    }
                ];
                this.currentSearchMethod = 0;
                this.searchTimeout = 6000;
                this.searchFallbackEnabled = true;
                this.autoSearchKeywords = [
                    'search', 'find', 'look up', 'google', 'what is', 'who is', 
                    'when did', 'how to', 'current', 'latest', 'recent', 'news',
                    'weather', 'price', 'cost', 'today', 'yesterday', 'tomorrow'
                ];
                
                // Load saved settings and conversations
                this.loadSettings();
                this.loadConversations();
                
                this.init();
            }

            // ADVANCED VOICE ACTIVITY DETECTION - ML-based approach inspired by Silero VAD
            initializeAdvancedVAD() {
                console.log('ðŸŽ™ï¸ Initializing Advanced Voice Activity Detection...');
                
                this.conversationalMode.voiceActivityDetection = {
                    isActive: false,
                    confidence: 0,
                    speechProbability: 0,
                    noiseLevel: -50,
                    adaptiveThreshold: -35,
                    spectralFeatures: new Array(128).fill(0),
                    energyHistory: new Array(50).fill(0),
                    zeroCrossingRate: 0,
                    spectralCentroid: 0,
                    spectralRolloff: 0,
                    mfccFeatures: new Array(13).fill(0)
                };
                
                // Start VAD processing loop
                this.startVADProcessing();
                console.log('âœ… Advanced VAD initialized with ML-inspired features');
            }

            // Enhanced VAD processing with spectral analysis
            startVADProcessing() {
                if (!this.analyser) return;
                
                const processVAD = () => {
                    if (!this.conversationalMode.enabled) return;
                    
                    // Get frequency and time domain data
                    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
                    const timeData = new Uint8Array(this.analyser.frequencyBinCount);
                    this.analyser.getByteFrequencyData(frequencyData);
                    this.analyser.getByteTimeDomainData(timeData);
                    
                    // Calculate RMS energy
                    let rms = 0;
                    for (let i = 0; i < timeData.length; i++) {
                        const normalized = (timeData[i] - 128) / 128;
                        rms += normalized * normalized;
                    }
                    rms = Math.sqrt(rms / timeData.length);
                    const rmsDb = 20 * Math.log10(rms + 1e-10);
                    
                    // Update energy history for temporal smoothing
                    this.conversationalMode.voiceActivityDetection.energyHistory.shift();
                    this.conversationalMode.voiceActivityDetection.energyHistory.push(rmsDb);
                    
                    // Calculate spectral features
                    this.calculateSpectralFeatures(frequencyData);
                    
                    // Adaptive threshold adjustment
                    if (this.conversationalMode.adaptiveThresholds) {
                        this.updateAdaptiveThresholds(rmsDb);
                    }
                    
                    // Voice activity decision
                    const isVoiceActive = this.detectVoiceActivity(rmsDb, frequencyData);
                    
                    // Update conversation state based on VAD
                    this.updateConversationState(isVoiceActive, rmsDb);
                    
                    // Continue processing
                    if (this.conversationalMode.enabled) {
                        requestAnimationFrame(processVAD);
                    }
                };
                
                processVAD();
            }

            // Calculate advanced spectral features for VAD
            calculateSpectralFeatures(frequencyData) {
                const vad = this.conversationalMode.voiceActivityDetection;
                
                // Zero crossing rate (from time domain - approximated)
                let zeroCrossings = 0;
                for (let i = 1; i < frequencyData.length; i++) {
                    if ((frequencyData[i] > 128) !== (frequencyData[i-1] > 128)) {
                        zeroCrossings++;
                    }
                }
                vad.zeroCrossingRate = zeroCrossings / frequencyData.length;
                
                // Spectral centroid (frequency center of mass)
                let numerator = 0, denominator = 0;
                for (let i = 0; i < frequencyData.length; i++) {
                    const frequency = (i * this.audioContext.sampleRate) / (2 * frequencyData.length);
                    numerator += frequency * frequencyData[i];
                    denominator += frequencyData[i];
                }
                vad.spectralCentroid = denominator > 0 ? numerator / denominator : 0;
                
                // Spectral rolloff (95% of energy frequency)
                let totalEnergy = 0;
                for (let i = 0; i < frequencyData.length; i++) {
                    totalEnergy += frequencyData[i];
                }
                let cumulativeEnergy = 0;
                for (let i = 0; i < frequencyData.length; i++) {
                    cumulativeEnergy += frequencyData[i];
                    if (cumulativeEnergy >= 0.95 * totalEnergy) {
                        vad.spectralRolloff = (i * this.audioContext.sampleRate) / (2 * frequencyData.length);
                        break;
                    }
                }
                
                // Voice-specific frequency band analysis
                const lowBand = frequencyData.slice(0, 32).reduce((a, b) => a + b, 0);
                const midBand = frequencyData.slice(32, 96).reduce((a, b) => a + b, 0);
                const highBand = frequencyData.slice(96, 128).reduce((a, b) => a + b, 0);
                
                // Voice typically has more energy in mid frequencies
                const voiceLikelihood = midBand / (lowBand + midBand + highBand + 1);
                vad.speechProbability = Math.min(1, voiceLikelihood * 2);
            }

            // Adaptive threshold adjustment based on background noise
            updateAdaptiveThresholds(currentLevel) {
                const vad = this.conversationalMode.voiceActivityDetection;
                
                // Update background noise estimate during quiet periods
                if (currentLevel < vad.adaptiveThreshold - 10) {
                    vad.noiseLevel = vad.noiseLevel * 0.99 + currentLevel * 0.01;
                    vad.adaptiveThreshold = vad.noiseLevel + 15; // 15dB above noise floor
                }
                
                // Adjust thresholds based on environment
                this.conversationalMode.silenceThreshold = vad.noiseLevel + 5;
                this.conversationalMode.speechThreshold = vad.noiseLevel + 20;
            }

            // Advanced voice activity detection with multiple criteria
            detectVoiceActivity(rmsDb, frequencyData) {
                const vad = this.conversationalMode.voiceActivityDetection;
                
                // Multiple detection criteria
                const energyCriterion = rmsDb > this.conversationalMode.speechThreshold;
                const spectralCriterion = vad.spectralCentroid > 300 && vad.spectralCentroid < 4000; // Human voice range
                const zeroCrossingCriterion = vad.zeroCrossingRate > 0.1 && vad.zeroCrossingRate < 0.7;
                const voiceProbabilityCriterion = vad.speechProbability > 0.3;
                
                // Temporal smoothing - require multiple consecutive frames
                const recentEnergy = vad.energyHistory.slice(-5);
                const consistentEnergy = recentEnergy.filter(e => e > this.conversationalMode.speechThreshold).length >= 3;
                
                // Combined decision with weighted criteria
                const voiceScore = (
                    (energyCriterion ? 0.4 : 0) +
                    (spectralCriterion ? 0.3 : 0) +
                    (voiceProbabilityCriterion ? 0.2 : 0) +
                    (consistentEnergy ? 0.1 : 0)
                );
                
                vad.confidence = voiceScore;
                return voiceScore > 0.6; // Require high confidence for voice activity
            }

            // Enhanced conversation state management with turn-taking
            updateConversationState(isVoiceActive, audioLevel) {
                const now = Date.now();
                const currentState = this.conversationalMode.conversationState;
                
                if (isVoiceActive && !this.isSpeaking) {
                    // Voice detected while not speaking
                    if (currentState === 'idle') {
                        this.conversationalMode.conversationState = 'listening';
                        this.conversationalMode.speechStartTime = now;
                        console.log('ðŸŽ¤ Voice activity detected - entering listening state');
                    }
                    this.conversationalMode.speechEndTime = now; // Update end time continuously
                    
                } else if (!isVoiceActive && currentState === 'listening') {
                    // Voice stopped
                    const speechDuration = now - this.conversationalMode.speechStartTime;
                    const silenceDuration = now - this.conversationalMode.speechEndTime;
                    
                    if (speechDuration > this.conversationalMode.minimumSpeechDuration && 
                        silenceDuration > this.conversationalMode.endOfSpeechPause) {
                        
                        console.log('ðŸ"„ End of speech detected - processing turn');
                        this.conversationalMode.conversationState = 'turn-taking';
                        
                        // Implement turn-taking delay to allow interruptions
                        setTimeout(() => {
                            if (this.conversationalMode.conversationState === 'turn-taking') {
                                this.conversationalMode.conversationState = 'processing';
                                this.handleTurnTaking();
                            }
                        }, this.conversationalMode.turnTakingDelay);
                    }
                }
                
                // Handle interruptions during AI response
                if (isVoiceActive && this.isSpeaking && this.conversationFlow.allowInterruptions) {
                    this.handleInterruption();
                }
                
                // Update audio level for visualization
                this.conversationalMode.lastSpeechLevel = audioLevel;
            }

            // Handle natural turn-taking in conversation
            handleTurnTaking() {
                console.log('ðŸ"„ Processing turn-taking');
                
                // Check if this looks like a complete turn or continuation
                const lastTranscript = this.interimText || this.lastHeard;
                const isQuestion = this.conversationFlow.turnTakingPatterns.some(pattern => 
                    pattern.test(lastTranscript));
                const isContinuation = this.conversationFlow.continuationPatterns.some(pattern => 
                    pattern.test(lastTranscript));
                
                if (isContinuation) {
                    // Wait for more input
                    console.log('ðŸ"„ Detected continuation pattern - waiting for more input');
                    this.conversationalMode.conversationState = 'idle';
                    return;
                }
                
                // Process the complete turn
                if (lastTranscript && lastTranscript.trim().length > 0) {
                    this.processConversationalInput(lastTranscript);
                } else {
                    // No valid input, return to idle
                    this.conversationalMode.conversationState = 'idle';
                }
            }

            // Handle interruptions during AI speech
            handleInterruption() {
                console.log('');
                
                // Stop current speech immediately
                this.stopSpeech();
                
                // Switch to listening mode
                this.conversationalMode.conversationState = 'listening';
                this.conversationalMode.speechStartTime = Date.now();
                
                // Brief acknowledgment
                setTimeout(() => {
                    if (!this.isSpeaking) {
                        this.showSubtitle('(Listening...)', 'user');
                    }
                }, 100);
            }

            // Process input in conversational mode with enhanced context
            processConversationalInput(text) {
                console.log(`ðŸ'¬ Processing conversational input: "${text}"`);
                this.conversationalMode.conversationState = 'processing';
                
                // Enhanced context-aware processing
                const cleanText = text.trim();
                
                // Check for conversation control commands
                if (this.isConversationControlCommand(cleanText)) {
                    return;
                }
                
                // Start or continue conversation
                if (!this.conversationActive) {
                    this.startConversation();
                }
                
                // Process with full conversational context
                this.processCommand(cleanText);
            }

            // Check for conversation control commands
            isConversationControlCommand(text) {
                const lowerText = text.toLowerCase();
                
                // Stop commands
                const stopPatterns = [
                    /^stop$/i, /^halt$/i, /^enough$/i,
                    /stop.*please/i, /please.*stop/i,
                    /shut.*up/i, /be.*quiet/i
                ];
                
                if (stopPatterns.some(pattern => pattern.test(lowerText))) {
                    this.stopSpeech();
                    this.conversationalMode.conversationState = 'idle';
                    return true;
                }
                
                // End conversation commands
                if (lowerText.includes('bye guru') || lowerText.includes('goodbye guru')) {
                    this.endConversation();
                    return true;
                }
                
                return false;
            }

            // Enhanced streaming response system
            async generateStreamingResponse(prompt, searchData = null) {
                console.log('ðŸŒŠ Generating streaming response');
                this.conversationalMode.conversationState = 'responding';
                
                try {
                    if (this.conversationFlow.streamingResponses) {
                        return await this.queryAIStreaming(prompt, searchData);
                    } else {
                        return await this.queryAI(prompt, searchData);
                    }
                } catch (error) {
                    console.error('Streaming response error:', error);
                    throw error;
                }
            }

            // Streaming AI query (placeholder for future implementation)
            async queryAIStreaming(prompt, searchData = null) {
                // For now, use regular query with enhanced responsiveness
                const startTime = Date.now();
                const response = await this.queryAI(prompt, searchData);
                this.conversationalMode.responseLatency = Date.now() - startTime;
                this.conversationalMode.lastResponseTime = Date.now();
                return response;
            }

            // Enhanced speak method with better conversational flow
            async speakConversational(text, isInitial = false) {
                if (this.isSpeaking && !isInitial) return;
                
                // Enhanced text processing for conversational delivery
                text = this.optimizeTextForConversation(text);
                
                this.isSpeaking = true;
                this.currentSpeaker = 'jarvis';
                this.conversationalMode.conversationState = 'responding';
                this.stopListening();
                this.updateStatus('audio', 'speaking', 'Speaking...');
                console.log(`ðŸ—£ï¸ Speaking conversationally: "${text}"`);

                // Enhanced subtitle synchronization
                this.startEnhancedSubtitles(text);

                try {
                    // Use existing speech methods with conversational enhancements
                    if (this.currentVoiceProvider === 'elevenlabs' && this.elevenLabsApiKey) {
                        const success = await this.speakWithElevenLabsConversational(text);
                        if (success) return;
                        console.log('ðŸ"„ ElevenLabs failed, falling back to Edge TTS...');
                    }

                    if (this.currentVoiceProvider === 'edge') {
                        const success = await this.speakWithEdgeTTSConversational(text);
                        if (success) return;
                        console.log('ðŸ"„ Edge TTS failed, falling back to native...');
                    }

                    this.speakWithNativeConversational(text);

                } catch (error) {
                    console.log(`âŒ Conversational speech error: ${error.message}`);
                    this.speakWithNativeConversational(text);
                }
            }

            // Optimize text for conversational delivery
            optimizeTextForConversation(text) {
                return text
                    // Add natural pauses for better conversation flow
                    .replace(/\. /g, '. ... ')
                    .replace(/\! /g, '! ... ')
                    .replace(/\? /g, '? ... ')
                    
                    // Optimize for speech timing
                    .replace(/,/g, ', ')
                    .replace(/;/g, '. ')
                    
                    // Clean for TTS
                    .replace(/\*/g, '')
                    .replace(/\#/g, '')
                    .replace(/\`/g, '')
                    .replace(/\_/g, '')
                    
                    // Natural speech patterns
                    .replace(/(\d+)%/g, '$1 percent')
                    .replace(/(\d+)Â°([CF])/g, '$1 degrees $2')
                    .replace(/etc\./g, 'etcetera')
                    .replace(/vs\./g, 'versus')
                    
                    .replace(/\s+/g, ' ')
                    .trim();
            }

            // Enhanced ElevenLabs with conversational parameters
            async speakWithElevenLabsConversational(text) {
                try {
                    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.elevenLabsVoiceId}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'audio/mpeg',
                            'Content-Type': 'application/json',
                            'xi-api-key': this.elevenLabsApiKey
                        },
                        body: JSON.stringify({
                            text: text,
                            model_id: 'eleven_monolingual_v1',
                            voice_settings: {
                                stability: 0.4, // More natural variation
                                similarity_boost: 0.6,
                                style: 0.2,
                                use_speaker_boost: true
                            }
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`ElevenLabs API error: ${response.status}`);
                    }

                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);

                    return new Promise((resolve) => {
                        audio.onended = () => {
                            URL.revokeObjectURL(audioUrl);
                            this.onConversationalSpeechEnd();
                            resolve(true);
                        };

                        audio.onerror = () => {
                            URL.revokeObjectURL(audioUrl);
                            this.onConversationalSpeechEnd();
                            resolve(false);
                        };

                        audio.play();
                    });

                } catch (error) {
                    console.log(`âŒ ElevenLabs conversational error: ${error.message}`);
                    return false;
                }
            }

            // Enhanced native speech with conversational parameters
            speakWithNativeConversational(text) {
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Conversational speech parameters
                utterance.rate = 0.9; // Slightly faster for natural flow
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                
                // Select most natural voice
                const voices = this.speechSynthesis.getVoices();
                const naturalVoice = voices.find(voice => 
                    voice.lang.startsWith('en-') && 
                    (voice.name.includes('Neural') || 
                     voice.name.includes('Premium') ||
                     voice.name.includes('Enhanced'))
                );
                
                if (naturalVoice) {
                    utterance.voice = naturalVoice;
                }

                this.currentUtterance = utterance;
                
                utterance.onend = () => this.onConversationalSpeechEnd();
                utterance.onerror = () => this.onConversationalSpeechEnd();
                
                this.speechSynthesis.speak(utterance);
            }

            // Enhanced speech end handler for conversational flow
            onConversationalSpeechEnd() {
                if (!this.isSpeaking) return;
                
                console.log('ðŸ—£ï¸ Conversational speech ended');
                
                this.isSpeaking = false;
                this.currentSpeaker = 'none';
                this.currentUtterance = null;
                this.conversationalMode.conversationState = 'idle';
                
                this.hideSubtitle();
                
                // Update status
                const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                this.updateStatus('ai', statusType, statusText);
                
                // Resume conversational listening
                if (!this.manualTalkMode && this.conversationalMode.enabled) {
                    this.updateStatus('audio', 'listening', 'Ready for conversation...');
                    this.startListening();
                }
            }

            // Enhanced subtitle system for conversation
            startEnhancedSubtitles(text) {
                const words = text.split(' ').filter(word => word.trim());
                const wordsPerSecond = 3.2; // Faster for conversational flow
                const msPerWord = 1000 / wordsPerSecond;
                
                let currentWordIndex = 0;
                
                if (this.subtitleInterval) {
                    clearInterval(this.subtitleInterval);
                }
                
                if (words.length > 0) {
                    this.showSubtitle(words[0], 'jarvis');
                    currentWordIndex = 1;
                }
                
                this.subtitleInterval = setInterval(() => {
                    if (currentWordIndex < words.length && this.isSpeaking) {
                        const displayText = words.slice(0, currentWordIndex + 1).join(' ');
                        this.showSubtitle(displayText, 'jarvis');
                        currentWordIndex++;
                    } else {
                        clearInterval(this.subtitleInterval);
                        this.subtitleInterval = null;
                        
                        if (this.isSpeaking) {
                            this.showSubtitle(text, 'jarvis');
                        }
                    }
                }, msPerWord);
            }

            // Override the main init method to include conversational features
            async init() {
                console.log('ðŸ¤– Initializing GURU Multi-Provider AI with Conversational Features...');
                
                try {
                    await this.initializeThreeJS();
                    await this.initializeAudio();
                    await this.initializeAdvancedAudio(); // NEW: Advanced audio processing
                    await this.initializeSpeechRecognition();
                    this.initializeAdvancedVAD(); // NEW: Advanced VAD
                    this.startSystemMonitoring();
                    this.initializeEventListeners();
                    
                    // Enable conversational mode by default
                    this.conversationalMode.enabled = true;
                    this.conversationFlow.allowInterruptions = true;
                    
                    this.updateProviderDisplay();
                    await this.testCurrentProvider();
                    
                    this.isInitialized = true;
                    console.log('âœ… GURU initialization complete with conversational AI');
                    
                    this.startConversationMonitoring();
                    
                    // Enhanced welcome message
                    setTimeout(() => {
                        if (!this.hasGreeted) {
                            this.hasGreeted = true;
                            let welcomeMessage = "Hello! I'm GURU with advanced conversational capabilities. ";
                            if (this.conversationActive) {
                                welcomeMessage += "I remember our previous conversation. ";
                            }
                            welcomeMessage += "You can just start talking naturally - I'll detect when you're speaking and respond naturally.";
                            this.speakConversational(welcomeMessage, true);
                        }
                    }, 2000);
                    
                } catch (error) {
                    console.log(`âŒ GURU initialization failed: ${error.message}`);
                }
            }

            // NEW: Initialize advanced audio processing
            async initializeAdvancedAudio() {
                console.log('ðŸŽµ Initializing Advanced Audio Processing...');
                
                try {
                    // Create audio worklet for real-time processing (if supported)
                    if (this.audioContext && this.audioContext.audioWorklet) {
                        // Would load custom audio worklet here for production
                        console.log('ðŸŽµ Audio worklet supported - enhanced processing available');
                    }
                    
                    // Setup enhanced audio analysis
                    if (this.analyser) {
                        this.analyser.fftSize = 2048; // Higher resolution
                        this.analyser.smoothingTimeConstant = 0.3; // More responsive
                        this.analyser.minDecibels = -90;
                        this.analyser.maxDecibels = -10;
                    }
                    
                    console.log('âœ… Advanced audio processing initialized');
                    
                } catch (error) {
                    console.log(`âŒ Advanced audio initialization failed: ${error.message}`);
                }
            }

            // Override processInput for conversational mode
            processInput(text) {
                if (!text || text.trim().length === 0) return;
                
                const cleanText = text.trim().replace(/[^\w\s\-'.,!?]/g, '');
                this.lastHeard = cleanText;
                
                // In conversational mode, process all input naturally
                if (this.conversationalMode.enabled) {
                    this.processConversationalInput(cleanText);
                    return;
                }
                
                // Fall back to original wake-word based processing
                const lowerText = cleanText.toLowerCase();
                
                // Enhanced stop command detection
                const stopKeywords = ['stop', 'quit', 'exit', 'halt', 'shut up', 'be quiet', 'silence', 'enough'];
                const emergencyStopPatterns = [
                    /^stop$/i, /^halt$/i, /^quit$/i, /^exit$/i, /^enough$/i,
                    /stop.*please/i, /please.*stop/i, /shut.*up/i, /be.*quiet/i
                ];
                
                const isEmergencyStop = emergencyStopPatterns.some(pattern => pattern.test(lowerText));
                const hasBareStopWord = stopKeywords.some(word => lowerText === word);
                const hasStopCommand = stopKeywords.some(word => lowerText.includes(word));
                const hasEndCommand = lowerText.includes('bye guru') || lowerText.includes('goodbye guru');
                
                if (isEmergencyStop || hasBareStopWord) {
                    console.log(`ðŸš¨ EMERGENCY Stop command detected: "${lowerText}"`);
                    this.stopSpeech();
                    if (!hasEndCommand) {
                        console.log('');
                        return;
                    }
                }
                
                if (this.isSpeaking && hasStopCommand && !isEmergencyStop) {
                    console.log(`ðŸ›' Stop command detected during speech: "${lowerText}"`);
                    this.stopSpeech();
                    setTimeout(() => {
                        this.speak("Stopped. How else can I help?");
                    }, 300);
                    return;
                }
                
                if (hasEndCommand || (lowerText.includes('stop guru') && !this.isSpeaking)) {
                    console.log(`ðŸ'‹ Conversation end command detected: "${lowerText}"`);
                    this.stopSpeech();
                    this.endConversation();
                    return;
                }

                // Search control commands
                if (lowerText.includes('disable search') || lowerText.includes('turn off search')) {
                    this.searchEnabled = false;
                    this.saveSearchSettings();
                    this.updateProviderDisplay();
                    this.speak('Internet search disabled.');
                    return;
                }
                
                if (lowerText.includes('enable search') || lowerText.includes('turn on search')) {
                    this.searchEnabled = true;
                    this.saveSearchSettings();
                    this.updateProviderDisplay();
                    this.speak('Internet search enabled.');
                    return;
                }

                if (lowerText.includes('test search') || lowerText.includes('search test')) {
                    this.testSearchConnection();
                    return;
                }
                
                // Enhanced wake word detection
                if (this.conversationActive || this.manualTalkMode) {
                    this.processCommand(cleanText);
                    return;
                }
                
                const hasWakeWord = this.wakeWords.some(word => {
                    return lowerText.includes(word.toLowerCase()) || 
                           lowerText.startsWith(word.toLowerCase()) ||
                           new RegExp(`\\b${word.toLowerCase()}\\b`).test(lowerText);
                });
                
                if (hasWakeWord) {
                    this.startConversation();
                    
                    let command = cleanText;
                    for (const wakeWord of this.wakeWords) {
                        const patterns = [
                            new RegExp(`^${wakeWord}\\s+`, 'gi'),
                            new RegExp(`\\s+${wakeWord}\\s+`, 'gi'),
                            new RegExp(`\\s+${wakeWord}$`, 'gi'),
                            new RegExp(`^${wakeWord}$`, 'gi')
                        ];
                        
                        for (const pattern of patterns) {
                            command = command.replace(pattern, ' ').trim();
                        }
                    }
                    
                    command = command.replace(/\s+/g, ' ').trim();
                    
                    if (command && command.length > 1) {
                        this.processCommand(command);
                    } else {
                        this.speakConversational("Yes? How can I help you?");
                    }
                } else {
                    console.log(`ðŸŽ¤ No wake word detected in: "${cleanText}"`);
                }
            }

            // Override processCommand to use conversational features
            async processCommand(command) {
                if (!command || command.trim().length === 0) return;
                
                try {
                    this.updateStatus('ai', 'processing', 'Processing...');
                    console.log(`ðŸ§ Processing command: "${command}"`);
                    
                    this.addMessageToHistory('user', command);
                    
                    // Enhanced search detection and processing
                    let searchData = null;
                    if (this.needsInternetSearch(command)) {
                        console.log('ðŸ" Internet search detected, gathering current information...');
                        this.updateStatus('ai', 'processing', 'Searching Internet...');
                        
                        const searchQuery = this.extractSearchQuery(command);
                        try {
                            searchData = await this.searchInternet(searchQuery);
                            
                            if (searchData.results && searchData.results.length > 0) {
                                console.log(`âœ… Found ${searchData.results.length} search results`);
                            } else {
                                console.log('âŒ No search results found, continuing with AI knowledge only');
                                searchData = null;
                            }
                        } catch (searchError) {
                            console.log(`âŒ Search failed: ${searchError.message}, continuing with AI knowledge only`);
                            searchData = null;
                        }
                    }
                    
                    this.updateStatus('ai', 'processing', 'Generating Response...');
                    
                    // Use streaming response generation for better conversational feel
                    const response = await this.generateStreamingResponse(command, searchData);
                    
                    if (response) {
                        this.addMessageToHistory('assistant', response, {
                            provider: this.currentProvider,
                            model: this.providers[this.currentProvider].model,
                            timestamp: Date.now(),
                            searchUsed: searchData ? true : false,
                            searchQuery: searchData ? this.lastSearchQuery : null,
                            searchResults: searchData ? searchData.results.length : 0,
                            conversationalMode: this.conversationalMode.enabled
                        });
                        
                        // Use conversational speech
                        this.speakConversational(response);
                    } else {
                        const errorResponse = "I'm sorry, I couldn't process that command at the moment.";
                        this.addMessageToHistory('assistant', errorResponse, { error: true });
                        this.speakConversational(errorResponse);
                    }
                    
                } catch (error) {
                    console.log(`âŒ Command processing failed: ${error.message}`);
                    console.log('Full error:', error);
                    
                    let errorMessage = "I encountered an error while processing your request.";
                    if (error.message.includes('API key')) {
                        errorMessage = "Please check your API key configuration in settings.";
                    } else if (error.message.includes('network')) {
                        errorMessage = "I'm having trouble connecting to the AI service.";
                    } else if (error.message.includes('search')) {
                        errorMessage = "I had trouble accessing current internet information, but I'll try to help with my existing knowledge.";
                    }
                    
                    this.addMessageToHistory('assistant', errorMessage, { 
                        error: true, 
                        errorDetails: error.message 
                    });
                    
                    this.speakConversational(errorMessage);
                    const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                    const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                    this.updateStatus('ai', statusType, statusText);
                }
            }

            // Override speak method to use conversational speech
            async speak(text, isInitial = false) {
                return this.speakConversational(text, isInitial);
            }

            loadSettings() {
                // Delegate to settings module if available
                if (this.settings && typeof this.settings.loadSettings === 'function') {
                    this.settings.loadSettings();
                    return;
                }
                
                // Fallback to direct implementation if settings module not available
                try {
                    const saved = localStorage.getItem('jarvis-settings');
                    if (saved) {
                        const settings = JSON.parse(saved);
                        this.currentProvider = settings.provider || 'gemini-2.0-flash';
                        if (settings.geminiApiKey) {
                            this.geminiApiKey = settings.geminiApiKey;
                        }
                        if (settings.elevenLabsApiKey) {
                            this.elevenLabsApiKey = settings.elevenLabsApiKey;
                        }
                        this.currentVoiceProvider = settings.voiceProvider || 'elevenlabs';
                        this.elevenLabsVoiceId = settings.elevenLabsVoiceId || 'pNInz6obpgDQGcFmaJgB';
                        
                        // Load saved Ollama model
                        if (settings.ollamaModel) {
                            this.providers.ollama.model = settings.ollamaModel;
                        }
                        
                        // Load search settings
                        if (settings.searchEnabled !== undefined) {
                            this.searchEnabled = settings.searchEnabled;
                        }
                        if (settings.currentSearchMethod !== undefined) {
                            this.currentSearchMethod = settings.currentSearchMethod;
                        }
                    }
                    console.log('✅ Settings loaded successfully (core fallback)');
                } catch (error) {
                    console.error(`❌ Failed to load settings: ${error.message}`);
                }
            }

            // ENHANCED MEMORY SYSTEM - Persistent conversation storage
            loadConversations() {
                try {
                    const saved = localStorage.getItem('jarvis-conversations');
                    if (saved) {
                        const conversationData = JSON.parse(saved);
                        
                        // Convert saved data back to Map
                        this.conversations = new Map(conversationData.conversations || []);
                        this.currentConversationId = conversationData.currentConversationId || null;
                        
                        // Load current conversation history if exists
                        if (this.currentConversationId && this.conversations.has(this.currentConversationId)) {
                            const conversation = this.conversations.get(this.currentConversationId);
                            this.conversationHistory = conversation.messages || [];
                            this.conversationStartTime = conversation.startTime;
                            this.lastActivityTime = conversation.lastActivity;
                            
                            // Check if conversation is still active (not timed out)
                            if (Date.now() - this.lastActivityTime > this.conversationTimeout) {
                                this.endConversation(false); // Silent end
                            } else {
                                this.conversationActive = true;
                                console.log(`ðŸ"‚ Loaded conversation ${this.currentConversationId} with ${this.conversationHistory.length} messages`);
                            }
                        }
                        
                        console.log(`ðŸ"š Loaded ${this.conversations.size} conversations from storage`);
                    }
                } catch (error) {
                    console.error('Failed to load conversations:', error);
                    this.conversations = new Map();
                }
            }

            saveConversations() {
                try {
                    const conversationData = {
                        conversations: Array.from(this.conversations.entries()),
                        currentConversationId: this.currentConversationId
                    };
                    localStorage.setItem('jarvis-conversations', JSON.stringify(conversationData));
                } catch (error) {
                    console.error('Failed to save conversations:', error);
                }
            }

            createNewConversation() {
                const conversationId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                const conversation = {
                    id: conversationId,
                    title: '',
                    messages: [],
                    startTime: Date.now(),
                    lastActivity: Date.now(),
                    metadata: {
                        provider: this.currentProvider,
                        model: this.providers[this.currentProvider].model
                    }
                };
                
                this.conversations.set(conversationId, conversation);
                this.currentConversationId = conversationId;
                this.conversationHistory = [];
                this.conversationStartTime = Date.now();
                this.lastActivityTime = Date.now();
                this.conversationActive = true;
                
                console.log(`ðŸ†• Created new conversation: ${conversationId}`);
                this.saveConversations();
                return conversationId;
            }

            addMessageToHistory(role, content, metadata = {}) {
                const message = {
                    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    role: role, // 'user' or 'assistant'
                    content: content,
                    timestamp: Date.now(),
                    metadata: metadata
                };
                
                // Add to current conversation history
                this.conversationHistory.push(message);
                
                // Limit history length for context window management
                if (this.conversationHistory.length > this.maxHistoryLength) {
                    this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
                }
                
                // Update conversation in storage
                if (this.currentConversationId && this.conversations.has(this.currentConversationId)) {
                    const conversation = this.conversations.get(this.currentConversationId);
                    conversation.messages.push(message);
                    conversation.lastActivity = Date.now();
                    
                    // Auto-generate title from first user message
                    if (!conversation.title && role === 'user' && content.length > 0) {
                        conversation.title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
                    }
                    
                    // Limit stored messages (keep more in storage than in active memory)
                    if (conversation.messages.length > 50) {
                        conversation.messages = conversation.messages.slice(-50);
                    }
                    
                    this.conversations.set(this.currentConversationId, conversation);
                }
                
                this.lastActivityTime = Date.now();
                this.saveConversations();
                
                // Update provider display to show current memory status
                this.updateProviderDisplay();
                
                console.log(`ðŸ'¬ Added ${role} message to conversation: "${content.substring(0, 50)}..."`);
                return message;
            }

            buildConversationContext() {
                if (!this.conversationHistory || this.conversationHistory.length === 0) {
                    return '';
                }
                
                // Build context from recent conversation history
                const contextMessages = this.conversationHistory.slice(-10); // Last 10 messages for context
                let context = 'Previous conversation:\n';
                
                contextMessages.forEach(msg => {
                    const role = msg.role === 'user' ? 'Human' : 'GURU';
                    context += `${role}: ${msg.content}\n`;
                });
                
                context += '\nCurrent conversation continues...\n';
                return context;
            }

            getCurrentConversationSummary() {
                if (!this.conversationHistory || this.conversationHistory.length === 0) {
                    return 'No active conversation';
                }
                
                const messageCount = this.conversationHistory.length;
                const duration = Math.floor((Date.now() - this.conversationStartTime) / 1000 / 60);
                const lastMessage = this.conversationHistory[this.conversationHistory.length - 1];
                
                return `Active conversation: ${messageCount} messages over ${duration} minutes. Last: "${lastMessage.content.substring(0, 30)}..."`;
            }

            // FIXED: Added missing settings functions
            showSettings() {
                const panel = document.getElementById('settingsPanel');
                const overlay = document.getElementById('settingsOverlay');
                const subtitlePanel = document.getElementById('subtitlePanel');
                
                panel.classList.add('active');
                overlay.classList.add('active');
                
                // Hide subtitles when settings are open - ENHANCED
                if (subtitlePanel) {
                    subtitlePanel.classList.add('settings-open');
                    // Force hide immediately
                    subtitlePanel.style.opacity = '0';
                    subtitlePanel.style.visibility = 'hidden';
                    subtitlePanel.style.zIndex = '-1';
                }
                
                // Update UI to reflect current settings
                this.updateSettingsUI();
                
                // Ensure provider display is current
                this.updateProviderDisplay();
            }

            hideSettings() {
                const panel = document.getElementById('settingsPanel');
                const overlay = document.getElementById('settingsOverlay');
                const subtitlePanel = document.getElementById('subtitlePanel');
                
                panel.classList.remove('active');
                overlay.classList.remove('active');
                
                // Show subtitles again when settings are closed - ENHANCED
                if (subtitlePanel) {
                    subtitlePanel.classList.remove('settings-open');
                    // Restore normal behavior
                    subtitlePanel.style.opacity = '';
                    subtitlePanel.style.visibility = '';
                    subtitlePanel.style.zIndex = '';
                }
            }

            updateSettingsUI() {
                // Clear all active states
                document.querySelectorAll('.provider-option').forEach(option => {
                    option.classList.remove('active');
                });
                
                // Set active provider
                const activeOption = document.getElementById(`provider-${this.currentProvider}`);
                if (activeOption) {
                    activeOption.classList.add('active');
                }
                
                // Show/hide API key section for Gemini
                const apiSection = document.getElementById('geminiApiSection');
                if (this.currentProvider.startsWith('gemini')) {
                    apiSection.style.display = 'block';
                    // Populate API key if available
                    const apiKeyInput = document.getElementById('geminiApiKey');
                    if (this.geminiApiKey) {
                        apiKeyInput.value = this.geminiApiKey;
                    }
                } else {
                    apiSection.style.display = 'none';
                }
                
                // Show/hide Ollama model selection section
                const ollamaSection = document.getElementById('ollamaModelSection');
                if (this.currentProvider === 'ollama') {
                    ollamaSection.style.display = 'block';
                    // Update current model display first
                    this.updateOllamaModelDisplay();
                    // Then load available models
                    this.loadOllamaModels();
                } else {
                    ollamaSection.style.display = 'none';
                }
                
                // Update connection status indicators
                this.updateProviderStatus();
                
                // Update voice UI
                this.updateVoiceUI();

                // Update search UI
                this.updateSearchUI();
            }

            updateProviderStatus() {
                Object.keys(this.providers).forEach(provider => {
                    const statusElement = document.getElementById(`${provider.replace('-', '').replace('.', '')}Status`);
                    if (statusElement) {
                        if (this.providers[provider].connected) {
                            statusElement.classList.add('connected');
                        } else {
                            statusElement.classList.remove('connected');
                        }
                    }
                });
            }

            selectProvider(provider) {
                this.currentProvider = provider;
                this.updateSettingsUI();
                this.updateProviderDisplay();
                console.log(`ðŸ"„ Selected provider: ${this.providers[provider].name}`);
            }

            selectVoiceProvider(voice) {
                this.currentVoiceProvider = voice;
                this.updateVoiceUI();
                console.log(`ðŸŽ¤ Selected voice provider: ${voice}`);
            }

            updateVoiceUI() {
                // Clear all voice active states
                document.querySelectorAll('[data-voice]').forEach(option => {
                    option.classList.remove('active');
                });
                
                // Set active voice provider
                const activeVoice = document.getElementById(`voice-${this.currentVoiceProvider}`);
                if (activeVoice) {
                    activeVoice.classList.add('active');
                }

                // Update voice provider status indicators
                const elevenLabsStatus = document.getElementById('elevenLabsVoiceStatus');
                const edgeStatus = document.getElementById('edgeVoiceStatus');
                
                if (elevenLabsStatus) {
                    if (this.elevenLabsApiKey && this.elevenLabsApiKey.length > 10) {
                        elevenLabsStatus.classList.add('connected');
                    } else {
                        elevenLabsStatus.classList.remove('connected');
                    }
                }
                
                if (edgeStatus) {
                    edgeStatus.classList.add('connected'); // Edge TTS is always available
                }

                // Show/hide ElevenLabs API key section
                const elevenLabsSection = document.getElementById('elevenLabsSection');
                if (this.currentVoiceProvider === 'elevenlabs') {
                    elevenLabsSection.style.display = 'block';
                    const elevenLabsInput = document.getElementById('elevenLabsApiKey');
                    if (this.elevenLabsApiKey && elevenLabsInput) {
                        elevenLabsInput.value = this.elevenLabsApiKey;
                    }
                    // Show voice selection if API key is available
                    this.updateElevenLabsVoiceSection();
                } else {
                    elevenLabsSection.style.display = 'none';
                }
            }

            saveSettings() {
                try {
                    // Get API keys from inputs
                    const apiKeyInput = document.getElementById('geminiApiKey');
                    if (apiKeyInput && apiKeyInput.value.trim()) {
                        this.geminiApiKey = apiKeyInput.value.trim();
                    }
                    
                    const elevenLabsInput = document.getElementById('elevenLabsApiKey');
                    if (elevenLabsInput && elevenLabsInput.value.trim()) {
                        this.elevenLabsApiKey = elevenLabsInput.value.trim();
                    }
                    
                    const settings = {
                        provider: this.currentProvider,
                        geminiApiKey: this.geminiApiKey || '',
                        elevenLabsApiKey: this.elevenLabsApiKey || '',
                        voiceProvider: this.currentVoiceProvider,
                        elevenLabsVoiceId: this.elevenLabsVoiceId,
                        ollamaModel: this.providers.ollama.model || '',
                        searchEnabled: this.searchEnabled,
                        currentSearchMethod: this.currentSearchMethod
                    };
                    localStorage.setItem('jarvis-settings', JSON.stringify(settings));
                    
                    console.log('âœ… Settings saved successfully');
                    this.updateProviderDisplay();
                    this.testCurrentProvider();
                    this.hideSettings();
                } catch (error) {
                    console.log(`âŒ Failed to save settings: ${error.message}`);
                }
            }

            async testConnection() {
                await this.testCurrentProvider();
                await this.testVoiceProvider();
            }

            async testVoiceProvider() {
                if (this.currentVoiceProvider === 'elevenlabs' && this.elevenLabsApiKey) {
                    try {
                        // Test ElevenLabs connection and load voices
                        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
                            headers: {
                                'xi-api-key': this.elevenLabsApiKey
                            }
                        });
                        
                        if (response.ok) {
                            console.log('âœ… ElevenLabs API key valid');
                            const data = await response.json();
                            this.elevenLabsVoices = data.voices || [];
                            this.updateVoiceUI();
                            this.updateElevenLabsVoiceSection();
                        } else {
                            console.log('âŒ ElevenLabs API key invalid');
                        }
                    } catch (error) {
                        console.log(`âŒ ElevenLabs test failed: ${error.message}`);
                    }
                }
            }

            async loadElevenLabsVoices() {
                if (!this.elevenLabsApiKey) {
                    console.log('âŒ ElevenLabs API key not set');
                    return;
                }

                try {
                    console.log('ðŸ"„ Loading ElevenLabs voices...');
                    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
                        headers: {
                            'xi-api-key': this.elevenLabsApiKey
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        this.elevenLabsVoices = data.voices || [];
                        console.log(`âœ… Loaded ${this.elevenLabsVoices.length} ElevenLabs voices`);
                        this.updateElevenLabsVoiceDropdown();
                    } else {
                        console.log('âŒ Failed to load ElevenLabs voices - Check API key');
                    }
                } catch (error) {
                    console.log(`âŒ Error loading ElevenLabs voices: ${error.message}`);
                }
            }

            updateElevenLabsVoiceSection() {
                const voiceSection = document.getElementById('elevenLabsVoiceSection');
                if (this.elevenLabsApiKey && this.elevenLabsApiKey.length > 10) {
                    voiceSection.style.display = 'block';
                    this.loadElevenLabsVoices(); // Auto-load voices when section becomes visible
                } else {
                    voiceSection.style.display = 'none';
                }
            }

            updateElevenLabsVoiceDropdown() {
                const select = document.getElementById('elevenLabsVoiceSelect');
                if (!select) return;

                // Clear existing options
                select.innerHTML = '<option value="">Select a voice...</option>';

                // Add available voices
                this.elevenLabsVoices.forEach(voice => {
                    const option = document.createElement('option');
                    option.value = voice.voice_id;
                    option.textContent = `${voice.name} (${voice.labels?.gender || 'Unknown'} - ${voice.labels?.age || 'Unknown'})`;
                    if (voice.voice_id === this.elevenLabsVoiceId) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });

                // Update current voice name display
                const currentVoice = this.elevenLabsVoices.find(v => v.voice_id === this.elevenLabsVoiceId);
                const currentVoiceName = document.getElementById('currentVoiceName');
                if (currentVoiceName && currentVoice) {
                    currentVoiceName.textContent = `${currentVoice.name} (${currentVoice.labels?.gender || 'Unknown'})`;
                }
            }

            selectElevenLabsVoice(voiceId) {
                this.elevenLabsVoiceId = voiceId;
                const voice = this.elevenLabsVoices.find(v => v.voice_id === voiceId);
                if (voice) {
                    console.log(`ðŸŽ¤ Selected ElevenLabs voice: ${voice.name}`);
                    const currentVoiceName = document.getElementById('currentVoiceName');
                    if (currentVoiceName) {
                        currentVoiceName.textContent = `${voice.name} (${voice.labels?.gender || 'Unknown'})`;
                    }
                }
            }

            async initOld() { // RENAMED: duplicate method to avoid conflict
                console.log('ðŸ¤– Initializing JARVIS Multi-Provider AI (OLD)...');
                
                try {
                    await this.initializeThreeJS();
                    await this.initializeAudio();
                    await this.initializeSpeechRecognition();
                    this.startSystemMonitoring();
                    this.initializeEventListeners(); // FIXED: Add event listeners
                    
                    // Update initial display with loaded settings
                    this.updateProviderDisplay();
                    
                    // Test initial connection
                    await this.testCurrentProvider();
                    
                    this.isInitialized = true;
                    console.log('âœ… JARVIS initialization complete');
                    
                    // Start conversation timeout monitoring
                    this.startConversationMonitoring();
                    
                    // Welcome greeting
                    setTimeout(() => {
                        if (!this.hasGreeted) {
                            this.hasGreeted = true;
                            let welcomeMessage = "Good day. GURU is now online with persistent memory. ";
                            if (this.conversationActive) {
                                welcomeMessage += "I remember our previous conversation. ";
                            }
                            welcomeMessage += "You can say 'Hey GURU' to interact with me.";
                            this.speak(welcomeMessage, true);
                        }
                    }, 2000);
                    
                } catch (error) {
                    console.log(`âŒ JARVIS initialization failed: ${error.message}`);
                }
            }

            // FIXED: Added event listeners for settings panel
            initializeEventListeners() {
                // Settings panel controls
                document.getElementById('closeSettingsBtn').addEventListener('click', () => this.hideSettings());
                document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettings());
                document.getElementById('testConnectionBtn').addEventListener('click', () => this.testConnection());
                
                // Settings overlay click to close
                document.getElementById('settingsOverlay').addEventListener('click', () => this.hideSettings());
                
                // Provider selection
                document.querySelectorAll('.provider-option').forEach(option => {
                    option.addEventListener('click', () => {
                        const provider = option.getAttribute('data-provider');
                        if (provider) {
                        this.selectProvider(provider);
                        }
                        const voice = option.getAttribute('data-voice');
                        if (voice) {
                            this.selectVoiceProvider(voice);
                        }
                    });
                });

                // Ollama model selection
                document.getElementById('ollamaModelSelect').addEventListener('change', (e) => {
                    if (e.target.value) {
                        this.selectOllamaModel(e.target.value);
                        // Clear manual input when selecting from dropdown
                        document.getElementById('ollamaModelInput').value = '';
                    }
                });

                // Refresh Ollama models button
                document.getElementById('refreshModelsBtn').addEventListener('click', () => {
                    console.log('ðŸ"„ Refreshing Ollama models...');
                    this.loadOllamaModels();
                });

                // Set model button for manual input
                document.getElementById('setModelBtn').addEventListener('click', () => {
                    const manualInput = document.getElementById('ollamaModelInput');
                    if (manualInput.value.trim()) {
                        this.selectOllamaModel(manualInput.value.trim());
                        // Clear dropdown selection when using manual input
                        document.getElementById('ollamaModelSelect').value = '';
                        manualInput.value = '';
                    }
                });

                // Enter key support for manual model input
                document.getElementById('ollamaModelInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('setModelBtn').click();
                    }
                });

                // ElevenLabs voice selection
                document.getElementById('elevenLabsVoiceSelect').addEventListener('change', (e) => {
                    if (e.target.value) {
                        this.selectElevenLabsVoice(e.target.value);
                    }
                });

                // Load ElevenLabs voices button
                document.getElementById('loadVoicesBtn').addEventListener('click', () => {
                    this.loadElevenLabsVoices();
                });

                // Conversational Mode toggle
                document.getElementById('conversationalToggle').addEventListener('click', () => {
                    this.toggleConversationalMode();
                    this.updateConversationalUI();
                });

                // Search controls
                document.getElementById('searchToggle').addEventListener('click', () => {
                    this.toggleSearch();
                    this.updateSearchUI();
                });

                document.getElementById('searchMethodSelect').addEventListener('change', (e) => {
                    this.currentSearchMethod = parseInt(e.target.value);
                    this.updateSearchMethodDisplay();
                });

                document.getElementById('testSearchBtn').addEventListener('click', () => {
                    this.testSearchConnection();
                });

                document.getElementById('toggleSearchBtn').addEventListener('click', () => {
                    this.toggleSearch();
                    this.updateSearchUI();
                });
                
                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    // EMERGENCY STOP - Escape key (highest priority)
                    if (e.key === 'Escape' && this.isSpeaking) {
                        e.preventDefault();
                        console.log('ðŸš¨ EMERGENCY STOP via Escape key!');
                        this.stopSpeech();
                        return; // Don't process other Escape functionality
                    }
                    
                    // EMERGENCY STOP - Ctrl+Alt+X for absolute emergency
                    if (e.ctrlKey && e.altKey && (e.key === 'x' || e.key === 'X')) {
                        e.preventDefault();
                        console.log('ðŸš¨ ULTIMATE EMERGENCY STOP via Ctrl+Alt+X!');
                        this.stopSpeech();
                        // Also stop listening temporarily
                        this.stopListening();
                        setTimeout(() => {
                            if (!this.manualTalkMode) this.startListening();
                        }, 1000);
                        return;
                    }
                    
                    // Settings shortcut (Ctrl+Alt+S)
                    if (e.ctrlKey && e.altKey && e.key === 's') {
                        e.preventDefault();
                        this.showSettings();
                    }
                    
                    // Escape to close settings (only if not speaking)
                    if (e.key === 'Escape' && !this.isSpeaking) {
                        this.hideSettings();
                    }
                    
                    // Manual talk mode (Space)
                    if (e.code === 'Space' && !e.repeat) {
                        e.preventDefault();
                        this.startManualTalk();
                    }
                });
                
                document.addEventListener('keyup', (e) => {
                    if (e.code === 'Space') {
                        e.preventDefault();
                        this.stopManualTalk();
                    }
                });
                

            }

            async testCurrentProvider() {
                console.log(`ðŸ" Testing ${this.providers[this.currentProvider].name} connection...`);
                
                try {
                console.log(`ðŸ" Testing ${this.providers[this.currentProvider].name} connection...`);
                
                try {
                    if (this.currentProvider === 'ollama') {
                        await this.testOllamaConnection();
                    } else {
                        await this.testGeminiConnection();
                    }
                } catch (error) {
                    console.log(`âŒ Provider test failed: ${error.message}`);
                }
            }

            async testOllamaConnection() {
                try {
                    const response = await fetch(`${this.providers.ollama.url}/api/tags`);
                    if (response.ok) {
                        const data = await response.json();
                        this.providers.ollama.connected = true;
                        console.log('âœ… Ollama connection successful');
                        
                        // Store available models for selection
                        this.availableOllamaModels = data.models || [];
                        
                        // Find the best model or use the first available
                        if (data.models && data.models.length > 0) {
                            // If no model is currently set, pick the first available one
                            if (!this.providers.ollama.model || this.providers.ollama.model === 'llama3.2') {
                                const preferredModel = data.models.find(m => 
                                    m.name.includes('phi') || 
                                    m.name.includes('llama') || 
                                    m.name.includes('mistral')
                                );
                                this.providers.ollama.model = preferredModel ? preferredModel.name : data.models[0].name;
                            }
                        }
                    } else {
                        throw new Error(`HTTP ${response.status}`);
                    }
                } catch (error) {
                    this.providers.ollama.connected = false;
                    console.log(`âŒ Ollama connection failed: ${error.message}`);
                }
                this.updateProviderStatus();
                this.updateProviderDisplay();
            }

            async loadOllamaModels() {
                try {
                    const response = await fetch(`${this.providers.ollama.url}/api/tags`);
                    if (response.ok) {
                        const data = await response.json();
                        this.availableOllamaModels = data.models || [];
                        
                        const select = document.getElementById('ollamaModelSelect');
                        if (select) {
                            // Store current selection
                            const currentModel = this.providers.ollama.model;
                            
                            // Clear existing options
                            select.innerHTML = '<option value="">Select a model...</option>';
                            
                            // Add available models
                            data.models.forEach(model => {
                                const option = document.createElement('option');
                                option.value = model.name;
                                option.textContent = `${model.name} (${this.formatSize(model.size)})`;
                                if (model.name === currentModel) {
                                    option.selected = true;
                                }
                                select.appendChild(option);
                            });
                            
                            console.log(`âœ… Loaded ${data.models.length} Ollama models`);
                            
                            // If current model is not in the list, add it as an option
                            if (currentModel && !data.models.find(m => m.name === currentModel)) {
                                const customOption = document.createElement('option');
                                customOption.value = currentModel;
                                customOption.textContent = `${currentModel} (Custom/Not Downloaded)`;
                                customOption.selected = true;
                                select.appendChild(customOption);
                                console.log(`ðŸ" Added custom model: ${currentModel}`);
                            }
                        }
                    } else {
                        console.log('âŒ Failed to load Ollama models - Server may not be running');
                        this.handleOllamaOffline();
                    }
                } catch (error) {
                    console.log(`âŒ Error loading Ollama models: ${error.message}`);
                    this.handleOllamaOffline();
                }
            }

            handleOllamaOffline() {
                const select = document.getElementById('ollamaModelSelect');
                if (select) {
                    select.innerHTML = '<option value="">Ollama server not available</option>';
                    // Still allow manual input when server is offline
                    if (this.providers.ollama.model) {
                        const currentOption = document.createElement('option');
                        currentOption.value = this.providers.ollama.model;
                        currentOption.textContent = `${this.providers.ollama.model} (Current)`;
                        currentOption.selected = true;
                        select.appendChild(currentOption);
                    }
                }
            }

            formatSize(bytes) {
                if (!bytes) return 'Unknown';
                const sizes = ['B', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
            }

            selectOllamaModel(modelName) {
                if (modelName && modelName.trim()) {
                    this.providers.ollama.model = modelName.trim();
                    console.log(`ðŸ"„ Selected Ollama model: ${modelName}`);
                    
                    // Update displays
                    this.updateOllamaModelDisplay();
                    this.updateProviderDisplay();
                }
            }

            updateOllamaModelDisplay() {
                const currentModelSpan = document.getElementById('currentOllamaModel');
                if (currentModelSpan) {
                    currentModelSpan.textContent = this.providers.ollama.model || 'None';
                }
            }

            async testGeminiConnection() {
                if (!this.geminiApiKey) {
                    console.log('âŒ Gemini API key not configured');
                    this.providers[this.currentProvider].connected = false;
                    this.updateProviderStatus();
                    return;
                }

                try {
                    const testPayload = {
                        contents: [{
                            parts: [{ text: "Hello" }]
                        }]
                    };

                    const response = await fetch(`${this.providers[this.currentProvider].url}?key=${this.geminiApiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(testPayload)
                    });

                    if (response.ok) {
                        this.providers[this.currentProvider].connected = true;
                        console.log(`âœ… ${this.providers[this.currentProvider].name} connection successful`);
                    } else {
                        throw new Error(`HTTP ${response.status}`);
                    }
                } catch (error) {
                    this.providers[this.currentProvider].connected = false;
                    console.log(`âŒ ${this.providers[this.currentProvider].name} connection failed: ${error.message}`);
                }
                this.updateProviderStatus();
            }

            updateProviderDisplay() {
                const providerSpan = document.getElementById('aiProvider');
                const modelSpan = document.getElementById('aiModel');
                const memorySpan = document.getElementById('memoryStatus');
                
                let providerText = this.providers[this.currentProvider].name;
                let memoryText = 'Ready';
                
                if (this.conversationActive) {
                    providerText += ' (Memory Active)';
                    memoryText = `Active (${this.conversationHistory.length} msgs)`;
                } else if (this.conversations.size > 0) {
                    providerText += ' (Memory Ready)';
                    memoryText = `${this.conversations.size} conversations`;
                }

                // Add search status to provider text
                if (this.searchEnabled) {
                    providerText += ' + Search';
                }
                
                providerSpan.textContent = providerText;
                modelSpan.textContent = this.providers[this.currentProvider].model;
                if (memorySpan) {
                    memorySpan.textContent = memoryText;
                }

                // Update search status display
                const searchStatusDisplay = document.getElementById('searchStatusDisplay');
                if (searchStatusDisplay) {
                    searchStatusDisplay.textContent = this.searchEnabled ? 'Enabled' : 'Disabled';
                }
            }

            // ===== ENHANCED INTERNET SEARCH INTEGRATION =====
            
            // IMPROVED: More robust internet search detection with pattern matching
            needsInternetSearch(text) {
                if (!this.searchEnabled) return false;
                
                const lowerText = text.toLowerCase();
                
                // Define comprehensive keyword lists
                const weatherKeywords = [
                    'weather', 'temperature', 'climate', 'rain', 'snow', 'sunny', 'cloudy', 'forecast', 
                    'humidity', 'wind', 'precipitation', 'celsius', 'fahrenheit', 'degrees', 'cold', 'hot',
                    'storm', 'thunder', 'lightning', 'fog', 'mist', 'drizzle', 'shower', 'hail'
                ];
                
                const locationPatterns = [
                    /\bin\s+([a-z\s]+)/i,           // "in New York"
                    /\bfor\s+([a-z\s]+)/i,          // "for London"
                    /\bat\s+([a-z\s]+)/i,           // "at Miami Beach"
                    /([a-z\s]+)\b\s+weather/i,      // "Tokyo weather"
                    /([a-z\s]+)\b\s+temperature/i,  // "Paris temperature"
                    /([a-z\s]+)\b\s+forecast/i      // "Chicago forecast"
                ];
                
                const realtimeKeywords = [
                    'news', 'breaking', 'latest', 'current', 'today', 'now', 'happening', 'events', 
                    'live', 'real time', 'updated', 'recent', 'trending', 'headlines', 'this morning',
                    'this afternoon', 'this evening', 'tonight', 'report', 'update', 'bulletin'
                ];
                
                const dateKeywords = [
                    '2024', '2025', 'this year', 'this month', 'this week', 'today', 'yesterday',
                    'tomorrow', 'last week', 'next week', 'current', 'upcoming', 'ongoing'
                ];
                
                // Enhanced pattern detection for weather queries
                // Check for weather keyword + location pattern combinations
                const hasWeatherKeyword = weatherKeywords.some(keyword => lowerText.includes(keyword));
                const hasLocationPattern = locationPatterns.some(pattern => pattern.test(lowerText));
                
                if (hasWeatherKeyword) {
                    console.log('ðŸŒ¦ï¸ Weather query detected, enabling search');
                    // If it contains both weather keyword and location, we're very confident it's a weather query
                    if (hasLocationPattern) {
                        console.log('ðŸ" Location context detected for weather query');
                    }
                    return true;
                }
                
                // Enhanced real-time/news query detection
                if (realtimeKeywords.some(keyword => lowerText.includes(keyword))) {
                    console.log('ðŸ"° Real-time/news query detected, enabling search');
                    return true;
                }
                
                // Enhanced date-specific query detection
                if (dateKeywords.some(keyword => lowerText.includes(keyword))) {
                    console.log('ðŸ“… Date-specific query detected, enabling search');
                    return true;
                }
                
                // Question-type patterns that likely need search
                const questionPatterns = [
                    /^(what|who|where|when|why|how)\s+(is|are|was|were|do|does|did|has|have|had)\s+/i,  // What is, Who was, etc.
                    /^(can|could|should|would)\s+(you|I)\s+(find|tell|show|explain)/i,  // Can you find, Should I explain, etc.
                    /^(tell|show|find|search|look)\s+(me|for|up)\s+/i,  // Tell me, Show me, Find for, etc.
                    /^(I\s+want\s+to\s+know)/i  // I want to know
                ];
                
                if (questionPatterns.some(pattern => pattern.test(lowerText))) {
                    console.log('â“ Question pattern detected, likely needs search');
                    return true;
                }
                
                // Use advanced search engine's query classification if available
                if (this.advancedSearchEngine) {
                    const classifications = this.advancedSearchEngine.classifyQuery(text);
                    
                    if (classifications.includes('weather') || 
                        classifications.includes('news') || 
                        classifications.includes('realtime') ||
                        classifications.includes('technical')) {
                        console.log(`ðŸ” Advanced classification detected: ${classifications.join(', ')}`);
                        return true;
                    }
                }
                
                // Legacy keyword detection as fallback
                return this.autoSearchKeywords.some(keyword => lowerText.includes(keyword)) ||
                       lowerText.includes('what\'s happening') ||
                       lowerText.includes('current events') ||
                       lowerText.includes('check') ||
                       lowerText.includes('find out') ||
                       lowerText.includes('search') ||
                       lowerText.includes('google') ||
                       lowerText.includes('look up');
            }

            // Extract search query from user input
            extractSearchQuery(text) {
                let query = text.toLowerCase();
                
                // Remove wake words and common prefixes
                const prefixesToRemove = [
                    'guru', 'hey guru', 'computer', 'aether',
                    'search for', 'find', 'look up', 'google',
                    'tell me about', 'what is', 'who is',
                    'when did', 'how to', 'can you'
                ];
                
                prefixesToRemove.forEach(prefix => {
                    const regex = new RegExp(`\\b${prefix}\\b`, 'gi');
                    query = query.replace(regex, '').trim();
                });
                
                // Clean up extra spaces
                query = query.replace(/\s+/g, ' ').trim();
                
                return query || text; // Fallback to original text if cleaning removes everything
            }

            // Advanced search function using the new search engine with comprehensive fallback
            async searchInternet(query, maxResults = 10) {
                if (!this.searchEnabled || !query.trim()) {
                    return { results: [], error: 'Search disabled or empty query' };
                }

                console.log(`ðŸ” Advanced Internet Search for: "${query}"`);
                this.lastSearchQuery = query;

                try {
                    // Use the advanced search engine first
                    if (this.advancedSearchEngine) {
                        const searchOptions = {
                            maxResults: maxResults,
                            includeDetailed: true,
                            forceRefresh: false,
                            timeout: 15000
                        };
                        
                        const advancedResults = await this.advancedSearchEngine.performAdvancedSearch(query, searchOptions);
                        
                        if (advancedResults.results && advancedResults.results.length > 0) {
                            console.log(`âœ… Advanced search successful, found ${advancedResults.results.length} results from ${advancedResults.metadata?.successfulSources || 'multiple'} sources`);
                            this.searchResults = advancedResults.results;
                            return advancedResults;
                        } else if (advancedResults.fallback && advancedResults.fallback.results.length > 0) {
                            console.log(`ðŸ”„ Advanced search used fallback, found ${advancedResults.fallback.results.length} results`);
                            this.searchResults = advancedResults.fallback.results;
                            return advancedResults.fallback;
                        }
                    }
                } catch (error) {
                    console.log(`âŒ Advanced search engine failed: ${error.message}`);
                }

                // Fallback to legacy search methods if advanced search fails
                console.log('ðŸ”„ Falling back to legacy search methods...');
                const methodOrder = [
                    ...this.searchMethods.filter(m => m.corsSupport && m.working !== false),
                    ...this.searchMethods.filter(m => !m.corsSupport && m.working !== false)
                ];

                for (const method of methodOrder) {
                    try {
                        console.log(`ðŸ” Trying legacy ${method.name} (${method.type})`);
                        let results = null;
                        
                        switch (method.type) {
                            case 'ddg':
                                results = await this.searchDuckDuckGoLegacy(query, maxResults);
                                break;
                            case 'wikipedia':
                                results = await this.searchWikipediaLegacy(query, maxResults);
                                break;
                        }
                        
                        if (results && results.length > 0) {
                            method.working = true;
                            console.log(`âœ… Legacy ${method.name} search successful, found ${results.length} results`);
                            this.searchResults = results;
                            return { results, source: `Legacy ${method.name}`, isLegacy: true };
                        } else {
                            method.working = false;
                        }
                    } catch (error) {
                        console.log(`âŒ Legacy ${method.name} failed: ${error.message}`);
                        method.working = false;
                        continue;
                    }
                }
                
                console.log('âŒ All search methods (advanced and legacy) failed');
                return { results: [], error: 'All search methods unavailable' };
            }

            // Legacy DuckDuckGo search function (fallback)
            async searchDuckDuckGoLegacy(query, maxResults) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.searchTimeout);

                try {
                    const searchUrl = new URL('https://api.duckduckgo.com/');
                    searchUrl.searchParams.set('q', query);
                    searchUrl.searchParams.set('format', 'json');
                    searchUrl.searchParams.set('no_html', '1');
                    searchUrl.searchParams.set('skip_disambig', '1');
                    
                    console.log(`ðŸ” Querying DuckDuckGo: ${searchUrl.toString()}`);
                    
                    const response = await fetch(searchUrl.toString(), {
                        method: 'GET',
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();
                    
                    const results = [];
                    
                    // Add abstract if available
                    if (data.Abstract && data.AbstractText) {
                        results.push({
                            title: data.Heading || 'DuckDuckGo Answer',
                            url: data.AbstractURL || 'https://duckduckgo.com/?q=' + encodeURIComponent(query),
                            content: data.AbstractText,
                            engine: 'duckduckgo'
                        });
                    }
                    
                    // Add definition if available
                    if (data.Definition && data.DefinitionText) {
                        results.push({
                            title: 'Definition',
                            url: data.DefinitionURL || 'https://duckduckgo.com/?q=' + encodeURIComponent(query),
                            content: data.DefinitionText,
                            engine: 'duckduckgo'
                        });
                    }
                    
                    // Add related topics
                    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
                        data.RelatedTopics.slice(0, Math.min(3, maxResults - results.length)).forEach(topic => {
                            if (topic.Text && topic.FirstURL) {
                                results.push({
                                    title: topic.Text.split(' - ')[0] || 'Related Topic',
                                    url: topic.FirstURL,
                                    content: topic.Text,
                                    engine: 'duckduckgo'
                                });
                            }
                        });
                    }

                    console.log(`ðŸ“Š Parsed ${results.length} DuckDuckGo results`);
                    return results.slice(0, maxResults);

                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        throw new Error('DuckDuckGo search timeout');
                    }
                    throw error;
                }
            }

            // Search with specific SearXNG engine
            async searchWithEngine(searchEngine, query, maxResults) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.searchTimeout);

                try {
                    const searchUrl = new URL('/search', searchEngine);
                    searchUrl.searchParams.set('q', query);
                    searchUrl.searchParams.set('format', 'json');
                    searchUrl.searchParams.set('engines', 'duckduckgo,bing');
                    searchUrl.searchParams.set('categories', 'general');
                    searchUrl.searchParams.set('pageno', '1');
                    
                    console.log(`ðŸ” Querying SearXNG: ${searchUrl.toString()}`);
                    
                    const response = await fetch(searchUrl.toString(), {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    console.log(`ðŸ“¥ SearXNG Response status: ${response.status}`);

                    if (!response.ok) {
                        if (response.status === 429) {
                            throw new Error('Rate limited');
                        } else if (response.status === 403) {
                            throw new Error('Access forbidden - CORS issue');
                        }
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();
                    
                    if (!data.results || !Array.isArray(data.results)) {
                        throw new Error('Invalid response format or no results');
                    }

                    const results = data.results.slice(0, maxResults).map(result => ({
                        title: result.title || 'No title',
                        url: result.url || '',
                        content: result.content || result.description || 'No description available',
                        engine: result.engine || 'searxng'
                    }));

                    console.log(`ðŸ“Š Parsed ${results.length} SearXNG results`);
                    return results;

                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        throw new Error('Search timeout');
                    }
                    if (error.message.includes('CORS') || error.message.includes('fetch')) {
                        throw new Error('CORS restriction or network error');
                    }
                    throw error;
                }
            }

            // Legacy Wikipedia search function (fallback)
            async searchWikipediaLegacy(query, maxResults) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.searchTimeout);

                try {
                    // Try Wikipedia search API first for better results
                    const searchApiUrl = new URL('https://en.wikipedia.org/w/api.php');
                    searchApiUrl.searchParams.set('action', 'query');
                    searchApiUrl.searchParams.set('list', 'search');
                    searchApiUrl.searchParams.set('srsearch', query);
                    searchApiUrl.searchParams.set('format', 'json');
                    searchApiUrl.searchParams.set('origin', '*');
                    searchApiUrl.searchParams.set('srlimit', Math.min(maxResults, 5));

                    console.log(`ðŸ” Querying Wikipedia Search API: ${searchApiUrl.toString()}`);

                    const searchResponse = await fetch(searchApiUrl.toString(), {
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (searchResponse.ok) {
                        const searchData = await searchResponse.json();
                        if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
                            const results = searchData.query.search.slice(0, maxResults).map(result => ({
                                title: result.title || 'No title',
                                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
                                content: result.snippet ? result.snippet.replace(/<[^>]*>/g, '') : 'No description available',
                                engine: 'wikipedia'
                            }));
                            
                            console.log(`ðŸ“Š Parsed ${results.length} Wikipedia results`);
                            return results;
                        }
                    }

                    // If search API fails, try direct page lookup as fallback
                    const pageUrl = new URL('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(query));
                    
                    console.log(`ðŸ” Trying Wikipedia direct lookup: ${pageUrl.toString()}`);
                    
                    const pageResponse = await fetch(pageUrl.toString(), {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        },
                        signal: controller.signal
                    });

                    if (pageResponse.ok) {
                        const data = await pageResponse.json();
                        if (data.extract) {
                            return [{
                                title: data.title || query,
                                url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
                                content: data.extract || 'No description available',
                                engine: 'wikipedia'
                            }];
                        }
                    }

                    throw new Error('No Wikipedia results found');

                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        throw new Error('Wikipedia search timeout');
                    }
                    throw error;
                }
            }

            // Format search results for AI context - Enhanced with advanced search engine support
            formatSearchResults(searchData) {
                // Use advanced search engine formatter if available
                if (this.advancedSearchEngine && !searchData.isLegacy) {
                    return this.advancedSearchEngine.formatSearchResults(searchData);
                }

                // Legacy formatter for fallback results
                if (!searchData.results || searchData.results.length === 0) {
                    return 'No current internet information found.';
                }

                let formattedResults = `\n=== LEGACY SEARCH RESULTS ===\n`;
                formattedResults += `Search Query: "${this.lastSearchQuery}"\n`;
                formattedResults += `Source: ${searchData.source || 'Legacy Search'}\n\n`;

                searchData.results.forEach((result, index) => {
                    formattedResults += `[${index + 1}] ${result.title}\n`;
                    if (result.content && result.content.length > 0) {
                        // Don't truncate for legacy results either - provide full content
                        formattedResults += `Content: ${result.content}\n`;
                    }
                    if (result.url) {
                        formattedResults += `URL: ${result.url}\n`;
                    }
                    formattedResults += '\n---\n\n';
                });

                formattedResults += '=== END LEGACY SEARCH RESULTS ===\n\n';
                formattedResults += 'Note: These are legacy search results. Use this information to provide detailed, accurate responses.\n\n';
                return formattedResults;
            }

            // Enhanced web scraping for detailed content (optional)
            async scrapeWebContent(url, maxLength = 1000) {
                try {
                    console.log(`ðŸ“„ Attempting to scrape: ${url}`);
                    
                    // Use a CORS proxy for scraping (you might need to implement this)
                    // For now, we'll skip scraping and rely on search result snippets
                    console.log('ðŸ“„ Web scraping skipped - using search snippets only');
                    return null;
                    
                } catch (error) {
                    console.log(`âŒ Scraping failed for ${url}: ${error.message}`);
                    return null;
                }
            }

            // Toggle search functionality - Enhanced for advanced search engine
            toggleSearch() {
                this.searchEnabled = !this.searchEnabled;
                
                // Also toggle the advanced search engine
                if (this.advancedSearchEngine) {
                    this.advancedSearchEngine.toggleSearch();
                }
                
                console.log(`ðŸ” Advanced Search ${this.searchEnabled ? 'enabled' : 'disabled'}`);
                
                // Update display
                this.updateProviderDisplay();
                
                // Save setting
                this.saveSearchSettings();
            }

            // Save search settings
            saveSearchSettings() {
                try {
                    const saved = localStorage.getItem('jarvis-settings');
                    const settings = saved ? JSON.parse(saved) : {};
                    settings.searchEnabled = this.searchEnabled;
                    settings.currentSearchMethod = this.currentSearchMethod;
                    localStorage.setItem('jarvis-settings', JSON.stringify(settings));
                } catch (error) {
                    console.error('Failed to save search settings:', error);
                }
            }

            // Get advanced search engine statistics
            getSearchStats() {
                if (this.advancedSearchEngine) {
                    return this.advancedSearchEngine.getSearchStats();
                }
                return {
                    cacheSize: 0,
                    lastQuery: this.lastSearchQuery,
                    sourcesStatus: []
                };
            }

            // Clear search cache
            clearSearchCache() {
                if (this.advancedSearchEngine) {
                    this.advancedSearchEngine.clearCache();
                    console.log('ðŸ—‘ï¸ Advanced search cache cleared');
                } else {
                    console.log('âš ï¸ No advanced search engine available');
                }
            }

            // Update search UI elements
            updateSearchUI() {
                const searchStatus = document.getElementById('searchStatus');
                const searchToggle = document.getElementById('searchToggle');
                const searchMethodSelect = document.getElementById('searchMethodSelect');
                
                if (searchStatus) {
                    if (this.searchEnabled) {
                        searchStatus.classList.add('connected');
                        searchToggle.classList.add('active');
                    } else {
                        searchStatus.classList.remove('connected');
                        searchToggle.classList.remove('active');
                    }
                }

                if (searchMethodSelect) {
                    searchMethodSelect.value = this.currentSearchMethod.toString();
                }

                this.updateSearchMethodDisplay();
            }

            // Update search method display
            updateSearchMethodDisplay() {
                const currentMethodSpan = document.getElementById('currentSearchMethod');
                if (currentMethodSpan && this.searchMethods[this.currentSearchMethod]) {
                    currentMethodSpan.textContent = this.searchMethods[this.currentSearchMethod].name;
                }
            }

            // Comprehensive search diagnostics
            async debugSearchMethods() {
                console.log('ðŸ” DEBUG: Starting comprehensive search method analysis...');
                
                const testQueries = ['artificial intelligence', 'python programming', 'weather today'];
                const detailedResults = {
                    methods: {},
                    summary: {
                        totalMethods: this.searchMethods.length,
                        workingMethods: 0,
                        failedMethods: 0,
                        corsIssues: 0,
                        timeouts: 0
                    }
                };
                
                for (const method of this.searchMethods) {
                    console.log(`\nðŸ” DEBUG: Testing ${method.name} (${method.type})`);
                    detailedResults.methods[method.name] = {
                        type: method.type,
                        corsSupport: method.corsSupport,
                        url: method.url,
                        working: false,
                        errors: [],
                        results: []
                    };
                    
                    // Test with first query only for diagnostics
                    const query = testQueries[0];
                    
                    try {
                        let results = null;
                        
                        switch (method.type) {
                            case 'ddg':
                                results = await this.searchDuckDuckGo(query, 2);
                                break;
                            case 'wikipedia':
                                results = await this.searchWikipedia(query, 2);
                                break;
                            case 'searxng':
                                results = await this.searchWithEngine(method.url, query, 2);
                                break;
                        }
                        
                        if (results && results.length > 0) {
                            method.working = true;
                            detailedResults.methods[method.name].working = true;
                            detailedResults.methods[method.name].results = results;
                            detailedResults.summary.workingMethods++;
                            console.log(`âœ… DEBUG: ${method.name} working: ${results.length} results`);
                        } else {
                            method.working = false;
                            detailedResults.methods[method.name].errors.push('No results returned');
                            detailedResults.summary.failedMethods++;
                            console.log(`âŒ DEBUG: ${method.name} failed: no results`);
                        }
                        
                    } catch (error) {
                        method.working = false;
                        detailedResults.methods[method.name].errors.push(error.message);
                        detailedResults.summary.failedMethods++;
                        
                        if (error.message.includes('CORS') || error.message.includes('cors')) {
                            detailedResults.summary.corsIssues++;
                        }
                        if (error.message.includes('timeout')) {
                            detailedResults.summary.timeouts++;
                        }
                        
                        console.log(`âŒ DEBUG: ${method.name} failed: ${error.message}`);
                    }
                }
                
                console.log('\nðŸ“Š DEBUG: Search Method Analysis Summary:');
                console.log(`Total Methods: ${detailedResults.summary.totalMethods}`);
                console.log(`Working Methods: ${detailedResults.summary.workingMethods}`);
                console.log(`Failed Methods: ${detailedResults.summary.failedMethods}`);
                console.log(`CORS Issues: ${detailedResults.summary.corsIssues}`);
                console.log(`Timeouts: ${detailedResults.summary.timeouts}`);
                
                // Print working methods
                const workingMethods = Object.entries(detailedResults.methods)
                    .filter(([name, data]) => data.working)
                    .map(([name, data]) => `${name} (${data.results.length} results)`);
                
                if (workingMethods.length > 0) {
                    console.log(`âœ… Working methods: ${workingMethods.join(', ')}`);
                } else {
                    console.log('âŒ No working search methods found!');
                }
                
                return detailedResults;
            }

            // Test all search methods
            async testSearchConnection() {
                console.log('ðŸ” Testing all search methods...');
                this.updateStatus('ai', 'processing', 'Testing Search Methods...');
                
                try {
                    const testQuery = 'artificial intelligence';
                    console.log(`ðŸ§ª Testing all methods with query: "${testQuery}"`);
                    
                    let workingMethods = [];
                    let totalResults = 0;
                    
                    // Test each method individually
                    for (const method of this.searchMethods) {
                        console.log(`ðŸ” Testing ${method.name}...`);
                        
                        try {
                            let results = null;
                            
                            switch (method.type) {
                                case 'ddg':
                                    results = await this.searchDuckDuckGo(testQuery, 2);
                                    break;
                                case 'wikipedia':
                                    results = await this.searchWikipedia(testQuery, 2);
                                    break;
                                case 'searxng':
                                    results = await this.searchWithEngine(method.url, testQuery, 2);
                                    break;
                            }
                            
                            if (results && results.length > 0) {
                                method.working = true;
                                workingMethods.push(`${method.name} (${results.length} results)`);
                                totalResults += results.length;
                                console.log(`âœ… ${method.name} working: ${results.length} results`);
                            } else {
                                method.working = false;
                                console.log(`âŒ ${method.name} failed: no results`);
                            }
                        } catch (error) {
                            method.working = false;
                            console.log(`âŒ ${method.name} failed: ${error.message}`);
                        }
                    }
                    
                    // Report results
                    if (workingMethods.length > 0) {
                        const message = `Search test completed. ${workingMethods.length} of ${this.searchMethods.length} methods working: ${workingMethods.join(', ')}`;
                        console.log(`âœ… ${message}`);
                        this.speak(`Search test successful. ${workingMethods.length} methods working with ${totalResults} total results.`);
                        
                        // Update method display
                        this.updateSearchMethodDisplay();
                    } else {
                        console.log('âŒ All search methods failed');
                        this.speak('Search test failed. All methods unavailable. Check your internet connection.');
                    }
                } catch (error) {
                    console.log(`âŒ Search test error: ${error.message}`);
                    this.speak(`Search test failed with error: ${error.message}`);
                } finally {
                    // Reset status
                    const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                    const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                    this.updateStatus('ai', statusType, statusText);
                }
            }

            // ENHANCED: Interactive Three.js initialization
            async initializeThreeJS() {
                console.log('ðŸŽ¨ Initializing Enhanced Interactive Neural Network...');
                
                const canvas = document.getElementById('neuralCanvas');
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);
                
                // Enhanced neural network with more nodes and connections
                const nodes = [];
                const connections = [];
                const nodeCount = 100; // Increased node count
                
                // Create enhanced nodes with better distribution
                for (let i = 0; i < nodeCount; i++) {
                    const geometry = new THREE.SphereGeometry(0.03, 16, 16);
                    const material = new THREE.MeshBasicMaterial({ 
                        color: 0x00d4ff,
                        transparent: true,
                        opacity: 0.8
                    });
                    const node = new THREE.Mesh(geometry, material);
                    
                    // Better 3D distribution
                    const radius = 3 + Math.random() * 4;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.random() * Math.PI;
                    
                    node.position.x = radius * Math.sin(phi) * Math.cos(theta);
                    node.position.y = radius * Math.sin(phi) * Math.sin(theta);
                    node.position.z = radius * Math.cos(phi);
                    
                    node.originalPosition = node.position.clone();
                    node.velocity = new THREE.Vector3(
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01
                    );
                    
                    scene.add(node);
                    nodes.push(node);
                }
                
                // Create enhanced connections
                for (let i = 0; i < nodes.length; i++) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const distance = nodes[i].position.distanceTo(nodes[j].position);
                        if (distance < 2.5 && Math.random() > 0.7) { // More selective connections
                            const geometry = new THREE.BufferGeometry().setFromPoints([
                                nodes[i].position,
                                nodes[j].position
                            ]);
                            const material = new THREE.LineBasicMaterial({ 
                                color: 0x00d4ff,
                                transparent: true,
                                opacity: 0.3
                            });
                            const connection = new THREE.Line(geometry, material);
                            scene.add(connection);
                            connections.push({
                                line: connection,
                                node1: nodes[i],
                                node2: nodes[j]
                            });
                        }
                    }
                }
                
                camera.position.z = 8;
                
                // ENHANCED: Interactive controls
                this.setupVisualizerControls(canvas, camera, scene);
                
                // Enhanced animation with audio responsiveness and damping
                const animate = () => {
                    requestAnimationFrame(animate);
                    
                    // Get audio level for responsiveness
                    const audioLevel = this.getAudioLevel();
                    const baseScale = 1 + (audioLevel * 0.5);
                    
                    // Enhanced rotation with velocity-based system and damping
                    if (this.visualizerControls.autoRotate && !this.visualizerControls.mouseDown) {
                        // Auto-rotation when idle
                        this.visualizerControls.rotationX = 0.005;
                        this.visualizerControls.rotationY = 0.01;
                    scene.rotation.x += this.visualizerControls.rotationX * (1 + audioLevel * 0.5);
                    scene.rotation.y += this.visualizerControls.rotationY * (1 + audioLevel * 0.5);
                    } else {
                        // Use velocity-based rotation with damping
                        this.visualizerControls.rotationX += this.visualizerControls.rotationVelocityX;
                        this.visualizerControls.rotationY += this.visualizerControls.rotationVelocityY;
                        
                        // Apply damping to velocities
                        this.visualizerControls.rotationVelocityX *= this.visualizerControls.damping;
                        this.visualizerControls.rotationVelocityY *= this.visualizerControls.damping;
                        
                        // Stop very small velocities
                        if (Math.abs(this.visualizerControls.rotationVelocityX) < 0.001) {
                            this.visualizerControls.rotationVelocityX = 0;
                        }
                        if (Math.abs(this.visualizerControls.rotationVelocityY) < 0.001) {
                            this.visualizerControls.rotationVelocityY = 0;
                        }
                        
                        scene.rotation.x = this.visualizerControls.rotationX;
                        scene.rotation.y = this.visualizerControls.rotationY;
                    }
                    
                    // Audio-reactive scaling
                    scene.scale.setScalar(baseScale * this.visualizerControls.zoom);
                    
                    // Enhanced node animation
                    nodes.forEach((node, index) => {
                        // Audio-reactive movement
                        const audioInfluence = audioLevel * 0.1;
                        node.position.add(node.velocity.clone().multiplyScalar(1 + audioInfluence));
                        
                        // Boundary constraints with smooth bounce
                        if (Math.abs(node.position.x) > 6) {
                            node.velocity.x *= -0.8;
                            node.position.x = Math.sign(node.position.x) * 6;
                        }
                        if (Math.abs(node.position.y) > 6) {
                            node.velocity.y *= -0.8;
                            node.position.y = Math.sign(node.position.y) * 6;
                        }
                        if (Math.abs(node.position.z) > 6) {
                            node.velocity.z *= -0.8;
                            node.position.z = Math.sign(node.position.z) * 6;
                        }
                        
                        // Enhanced color changes based on speaker and audio
                        let targetColor;
                        switch (this.currentSpeaker) {
                            case 'user':
                                targetColor = new THREE.Color(1, 1, 1); // White for user
                                break;
                                                case 'jarvis':
                        targetColor = new THREE.Color(1, 0.42, 0); // Orange for JARVIS
                                break;
                            default:
                                targetColor = new THREE.Color(0, 0.83 + audioLevel * 0.17, 1); // Blue with audio brightness
                        }
                        
                        // Smooth color transition
                        node.material.color.lerp(targetColor, 0.05);
                        
                        // Audio-reactive size pulsing
                        const pulseScale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.2 * (0.5 + audioLevel * 0.5);
                        node.scale.setScalar(pulseScale);
                        
                        // Audio-reactive opacity
                        node.material.opacity = 0.6 + audioLevel * 0.4;
                    });
                    
                    // Enhanced connection updates
                    connections.forEach((conn) => {
                        // Update connection geometry
                        const positions = conn.line.geometry.attributes.position.array;
                        positions[0] = conn.node1.position.x;
                        positions[1] = conn.node1.position.y;
                        positions[2] = conn.node1.position.z;
                        positions[3] = conn.node2.position.x;
                        positions[4] = conn.node2.position.y;
                        positions[5] = conn.node2.position.z;
                        conn.line.geometry.attributes.position.needsUpdate = true;
                        
                        // Audio-reactive connection opacity
                        conn.line.material.opacity = 0.2 + audioLevel * 0.3;
                        
                        // Color matching nodes
                        const avgColor = new THREE.Color().addColors(
                            conn.node1.material.color,
                            conn.node2.material.color
                        ).multiplyScalar(0.5);
                        conn.line.material.color.copy(avgColor);
                    });
                    
                    renderer.render(scene, camera);
                };
                
                animate();
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });
                
                this.neuralNetwork = { scene, camera, renderer, nodes, connections };
                console.log('âœ… Enhanced Interactive Neural Network initialized');
            }

            // ENHANCED: Interactive visualizer controls with damping
            setupVisualizerControls(canvas, camera, scene) {
                // Mouse controls
                canvas.addEventListener('mousedown', (e) => {
                    this.visualizerControls.mouseDown = true;
                    this.visualizerControls.lastMouseX = e.clientX;
                    this.visualizerControls.lastMouseY = e.clientY;
                    this.visualizerControls.autoRotate = false;
                    this.visualizerControls.lastInteraction = Date.now();
                });
                
                canvas.addEventListener('mousemove', (e) => {
                    if (!this.visualizerControls.mouseDown) return;
                    
                    const deltaX = e.clientX - this.visualizerControls.lastMouseX;
                    const deltaY = e.clientY - this.visualizerControls.lastMouseY;
                    
                    // Update velocities instead of direct rotation
                    this.visualizerControls.rotationVelocityY = deltaX * 0.01;
                    this.visualizerControls.rotationVelocityX = deltaY * 0.01;
                    
                    this.visualizerControls.lastMouseX = e.clientX;
                    this.visualizerControls.lastMouseY = e.clientY;
                    this.visualizerControls.lastInteraction = Date.now();
                });
                
                document.addEventListener('mouseup', () => {
                    this.visualizerControls.mouseDown = false;
                    // Resume auto-rotation after 5 seconds of no interaction
                    setTimeout(() => {
                        if (Date.now() - this.visualizerControls.lastInteraction > 5000) {
                            this.visualizerControls.autoRotate = true;
                        }
                    }, 5000);
                });
                
                // Wheel zoom
                canvas.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const zoomSpeed = 0.1;
                    this.visualizerControls.zoom += e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
                    this.visualizerControls.zoom = Math.max(0.5, Math.min(3, this.visualizerControls.zoom));
                    this.visualizerControls.lastInteraction = Date.now();
                });
                
                // Touch controls
                canvas.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    if (e.touches.length === 1) {
                        this.visualizerControls.mouseDown = true;
                        this.visualizerControls.lastMouseX = e.touches[0].clientX;
                        this.visualizerControls.lastMouseY = e.touches[0].clientY;
                        this.visualizerControls.autoRotate = false;
                        this.visualizerControls.lastInteraction = Date.now();
                    } else if (e.touches.length === 2) {
                        this.visualizerControls.touchStartDistance = Math.hypot(
                            e.touches[0].clientX - e.touches[1].clientX,
                            e.touches[0].clientY - e.touches[1].clientY
                        );
                    }
                });
                
                canvas.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    if (e.touches.length === 1 && this.visualizerControls.mouseDown) {
                        const deltaX = e.touches[0].clientX - this.visualizerControls.lastMouseX;
                        const deltaY = e.touches[0].clientY - this.visualizerControls.lastMouseY;
                        
                        // Update velocities with touch sensitivity
                        this.visualizerControls.rotationVelocityY = deltaX * 0.015;
                        this.visualizerControls.rotationVelocityX = deltaY * 0.015;
                        
                        this.visualizerControls.lastMouseX = e.touches[0].clientX;
                        this.visualizerControls.lastMouseY = e.touches[0].clientY;
                        this.visualizerControls.lastInteraction = Date.now();
                    } else if (e.touches.length === 2) {
                        const currentDistance = Math.hypot(
                            e.touches[0].clientX - e.touches[1].clientX,
                            e.touches[0].clientY - e.touches[1].clientY
                        );
                        const zoomFactor = currentDistance / this.visualizerControls.touchStartDistance;
                        this.visualizerControls.zoom *= zoomFactor;
                        this.visualizerControls.zoom = Math.max(0.5, Math.min(3, this.visualizerControls.zoom));
                        this.visualizerControls.touchStartDistance = currentDistance;
                        this.visualizerControls.lastInteraction = Date.now();
                    }
                });
                
                canvas.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.visualizerControls.mouseDown = false;
                    // Resume auto-rotation after 5 seconds
                    setTimeout(() => {
                        if (Date.now() - this.visualizerControls.lastInteraction > 5000) {
                            this.visualizerControls.autoRotate = true;
                        }
                    }, 5000);
                });
            }

            getAudioLevel() {
                if (!this.analyser) return 0;
                
                this.analyser.getByteFrequencyData(this.audioData);
                let sum = 0;
                for (let i = 0; i < this.audioData.length; i++) {
                    sum += this.audioData[i];
                }
                return (sum / this.audioData.length) / 255;
            }

            async initializeAudio() {
                console.log('ðŸŽµ Initializing Audio System...');
                
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    
                    // Resume audio context if suspended
                    if (this.audioContext.state === 'suspended') {
                        await this.audioContext.resume();
                        console.log('ðŸŽµ Audio context resumed');
                    }
                    
                    this.analyser = this.audioContext.createAnalyser();
                    this.analyser.fftSize = 512;
                    this.analyser.smoothingTimeConstant = 0.8;
                    
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        this.microphone = this.audioContext.createMediaStreamSource(stream);
                        this.microphone.connect(this.analyser);
                        
                        // Start audio visualization update loop
                        this.updateAudioVisualization();
                        setInterval(() => this.updateAudioVisualization(), 50);
                        
                    } catch (error) {
                        console.log(`âŒ Microphone access denied: ${error.message}`);
                        this.initializeManualMode();
                        return;
                    }
                    
                    console.log('âœ… Audio system initialized successfully');
                    
                } catch (error) {
                    console.log(`âŒ Audio initialization failed: ${error.message}`);
                    this.initializeManualMode();
                }
            }

            async initializeSpeechRecognition() {
                console.log('ðŸŽ¤ Initializing Speech Recognition...');
                
                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                    const errorMsg = 'Speech recognition not supported in this browser';
                    console.log(`âŒ ${errorMsg}`);
                    this.initializeManualMode();
                    return;
                }
                
                try {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    this.speechRecognition = new SpeechRecognition();
                    
                    this.speechRecognition.continuous = true;
                    this.speechRecognition.interimResults = true;
                    this.speechRecognition.lang = 'en-US';
                    this.speechRecognition.maxAlternatives = 1;
                    
                    this.speechRecognition.onstart = () => {
                        this.isListening = true;
                        this.updateStatus('audio', 'listening', 'Listening...');
                        console.log('ðŸŽ¤ Speech recognition started');
                    };
                    
                    this.speechRecognition.onresult = (event) => {
                        let interimTranscript = '';
                        let finalTranscript = '';
                        
                        for (let i = event.resultIndex; i < event.results.length; i++) {
                            const transcript = event.results[i][0].transcript;
                            if (event.results[i].isFinal) {
                                finalTranscript += transcript;
                            } else {
                                interimTranscript += transcript;
                            }
                        }
                        
                        // IMPROVED: Check for stop commands even in interim results
                        const currentText = (finalTranscript + ' ' + interimTranscript).trim().toLowerCase();
                        const stopKeywords = ['stop', 'quit', 'exit', 'halt', 'shut up', 'be quiet', 'silence'];
                        const hasStopWord = stopKeywords.some(word => currentText.includes(word));
                        
                        // If we're speaking and detect a stop command in interim or final text
                        if (this.isSpeaking && hasStopWord) {
                            console.log(`ðŸ›‘ URGENT Stop command detected during speech: "${currentText}"`);
                            this.stopSpeech();
                            
                            // Stop speech recognition temporarily to avoid processing this as a command
                            this.speechRecognition.stop();
                            
                            // Clear any interim display
                            this.currentSpeaker = 'none';
                            this.hideSubtitle();
                            
                            // Acknowledge the stop and restart listening
                            setTimeout(() => {
                                this.speak("Stopped.");
                                setTimeout(() => {
                                    if (!this.manualTalkMode) {
                                        this.startListening();
                                    }
                                }, 1000);
                            }, 200);
                            return;
                        }
                        
                        // Show interim results in subtitle (if not stopping)
                        if (interimTranscript && !hasStopWord) {
                            this.currentSpeaker = 'user';
                            this.showSubtitle(interimTranscript, 'user');
                            this.interimText = interimTranscript;
                        }
                        
                        if (finalTranscript) {
                            this.currentSpeaker = 'none';
                            this.hideSubtitle();
                            console.log(`ðŸŽ¤ Final transcript: "${finalTranscript}"`);
                            this.processInput(finalTranscript.trim());
                        }
                    };
                    
                    this.speechRecognition.onerror = (event) => {
                        if (event.error === 'not-allowed') {
                            this.initializeManualMode();
                        }
                        console.log(`âŒ Speech error: ${event.error}`);
                    };
                    
                    this.speechRecognition.onaudiostart = () => {
                        this.currentSpeaker = 'user';
                    };
                    
                    this.speechRecognition.onaudioend = () => {
                        if (!this.isSpeaking) {
                            this.currentSpeaker = 'none';
                            this.hideSubtitle();
                        }
                    };
                    
                    this.speechRecognition.onend = () => {
                        this.isListening = false;
                        console.log('ðŸŽ¤ Speech recognition ended');
                        
                        // Restart listening if not in manual mode and not speaking
                        if (!this.manualTalkMode && !this.isSpeaking && this.isInitialized) {
                            setTimeout(() => this.startListening(), 1000);
                        }
                    };
                    
                    console.log('âœ… Speech recognition initialized');
                    this.startListening();
                    
                } catch (error) {
                    console.log(`âŒ Speech recognition initialization failed: ${error.message}`);
                    this.initializeManualMode();
                }
            }

            initializeManualMode() {
                this.manualTalkMode = true;
                this.updateStatus('audio', 'offline', 'Manual Mode');
                console.log('âœ… Manual talk mode initialized (Hold button or spacebar)');
            }

            startListening() {
                if (!this.speechRecognition || this.manualTalkMode || this.isSpeaking || this.isListening) return;
                
                try {
                    this.speechRecognition.start();
                } catch (error) {
                    // Recognition might already be running
                }
            }

            stopListening() {
                if (this.speechRecognition && this.isListening) {
                    this.speechRecognition.stop();
                }
            }

            startManualTalk() {
                if (!this.manualTalkMode || this.isSpeaking) return;
                
                console.log('ðŸŽ¤ Manual talk started');
                this.currentSpeaker = 'user';
                
                try {
                    if (this.speechRecognition) {
                        this.speechRecognition.start();
                    }
                } catch (error) {
                    console.log(`âŒ Manual speech start error: ${error.message}`);
                }
            }

            stopManualTalk() {
                if (!this.manualTalkMode) return;
                
                this.currentSpeaker = 'none';
                this.hideSubtitle();
                
                if (this.speechRecognition && this.isListening) {
                    this.speechRecognition.stop();
                }
                
                console.log('ðŸŽ¤ Manual talk stopped');
            }

            async startAutoListening() {
                if (this.manualTalkMode || this.isSpeaking) return;
                
                try {
                    await this.startListening();
                } catch (error) {
                    console.log(`âŒ Auto-listening start error: ${error.message}`);
                }
            }

            processInput(text) {
                if (!text || text.trim().length === 0) return;
                
                // Clean and normalize input
                const cleanText = text.trim().replace(/[^\w\s\-'.,!?]/g, '');
                this.lastHeard = cleanText;
                console.log(`ðŸŽ¤ Processing: "${cleanText}" | Conversation Active: ${this.conversationActive}`);
                
                const lowerText = cleanText.toLowerCase();
                
                // ENHANCED: More comprehensive stop command detection
                const stopKeywords = ['stop', 'quit', 'exit', 'halt', 'shut up', 'be quiet', 'silence', 'enough'];
                const emergencyStopPatterns = [
                    /^stop$/i,
                    /^halt$/i, 
                    /^quit$/i,
                    /^exit$/i,
                    /^enough$/i,
                    /stop.*please/i,
                    /please.*stop/i,
                    /shut.*up/i,
                    /be.*quiet/i
                ];
                
                // Check for emergency stop patterns (highest priority)
                const isEmergencyStop = emergencyStopPatterns.some(pattern => pattern.test(lowerText));
                const hasBareStopWord = stopKeywords.some(word => lowerText === word);
                const hasStopCommand = stopKeywords.some(word => lowerText.includes(word));
                const hasEndCommand = lowerText.includes('bye guru') || lowerText.includes('goodbye guru');
                
                // PRIORITY 1: Emergency stop commands (immediately stop, no questions asked)
                if (isEmergencyStop || hasBareStopWord) {
                    console.log(`ðŸš¨ EMERGENCY Stop command detected: "${lowerText}"`);
                    
                    // Immediately stop any ongoing speech
                    this.stopSpeech();
                    
                    // Don't speak a response if it's a bare stop word to avoid noise
                    if (!hasEndCommand) {
                        console.log('ðŸ›‘ Speech stopped by user command');
                        return; // Don't speak anything, just stop
                    }
                }
                
                // PRIORITY 2: General stop commands during speech
                if (this.isSpeaking && hasStopCommand && !isEmergencyStop) {
                    console.log(`ðŸ›‘ Stop command detected during speech: "${lowerText}"`);
                    this.stopSpeech();
                    
                    // Brief acknowledgment
                    setTimeout(() => {
                        this.speak("Stopped. How else can I help?");
                    }, 300);
                    return;
                }
                
                // PRIORITY 3: Conversation end commands
                if (hasEndCommand || (lowerText.includes('stop guru') && !this.isSpeaking)) {
                    console.log(`ðŸ‘‹ Conversation end command detected: "${lowerText}"`);
                    this.stopSpeech();
                    this.endConversation();
                    return;
                }

                // Check for search control commands
                if (lowerText.includes('disable search') || lowerText.includes('turn off search')) {
                    this.searchEnabled = false;
                    this.saveSearchSettings();
                    this.updateProviderDisplay();
                    this.speak('Internet search disabled.');
                    return;
                }
                
                if (lowerText.includes('enable search') || lowerText.includes('turn on search')) {
                    this.searchEnabled = true;
                    this.saveSearchSettings();
                    this.updateProviderDisplay();
                    this.speak('Internet search enabled.');
                    return;
                }

                // Manual search test command
                if (lowerText.includes('test search') || lowerText.includes('search test')) {
                    this.testSearchConnection();
                    return;
                }

                // Search debug command
                if (lowerText.includes('debug search') || lowerText.includes('search debug')) {
                    this.debugSearchMethods();
                    return;
                }
                
                // If conversation is active, process any input directly
                if (this.conversationActive || this.manualTalkMode) {
                    this.processCommand(cleanText);
                    return;
                }
                
                // Enhanced wake word detection for starting conversation
                const hasWakeWord = this.wakeWords.some(word => {
                    return lowerText.includes(word.toLowerCase()) || 
                           lowerText.startsWith(word.toLowerCase()) ||
                           new RegExp(`\\b${word.toLowerCase()}\\b`).test(lowerText);
                });
                
                if (hasWakeWord) {
                    // Start conversation
                    this.startConversation();
                    
                    // Enhanced command extraction
                    let command = cleanText;
                    
                    // Remove wake words more intelligently
                    for (const wakeWord of this.wakeWords) {
                        const patterns = [
                            new RegExp(`^${wakeWord}\\s+`, 'gi'),
                            new RegExp(`\\s+${wakeWord}\\s+`, 'gi'),
                            new RegExp(`\\s+${wakeWord}$`, 'gi'),
                            new RegExp(`^${wakeWord}$`, 'gi')
                        ];
                        
                        for (const pattern of patterns) {
                            command = command.replace(pattern, ' ').trim();
                        }
                    }
                    
                    // Clean up the command
                    command = command.replace(/\s+/g, ' ').trim();
                    
                    if (command && command.length > 1) {
                        this.processCommand(command);
                    } else {
                        // Just wake word detected, acknowledge and start conversation
                        this.speak("Yes? How can I help you?");
                    }
                } else {
                    console.log(`ðŸŽ¤ No wake word detected in: "${cleanText}"`);
                }
            }

            startConversation() {
                if (!this.conversationActive) {
                    // Create new conversation if not already active
                    if (!this.currentConversationId) {
                        this.createNewConversation();
                    }
                    this.conversationActive = true;
                    console.log('ðŸŸ¢ Conversation started');
                }
                
                // Update status indicator and provider display
                this.updateStatus('audio', 'listening', 'In Conversation...');
                this.updateProviderDisplay();
                this.lastActivityTime = Date.now();
            }

            endConversation(speak = true) {
                this.conversationActive = false;
                console.log('ðŸ”´ Conversation ended');
                
                if (speak) {
                    this.speak("Goodbye. Have a great day.");
                }
                
                // Keep conversation in storage but mark as inactive
                if (this.currentConversationId && this.conversations.has(this.currentConversationId)) {
                    const conversation = this.conversations.get(this.currentConversationId);
                    conversation.lastActivity = Date.now();
                    conversation.metadata.endTime = Date.now();
                    this.conversations.set(this.currentConversationId, conversation);
                    this.saveConversations();
                }
                
                // Clear current conversation context
                this.currentConversationId = null;
                this.conversationHistory = [];
                
                // Update status indicator and provider display back to normal
                setTimeout(() => {
                    this.updateStatus('audio', 'listening', 'Listening...');
                    this.updateProviderDisplay();
                }, speak ? 3000 : 100);
            }

            async processCommand(command) {
                if (!command || command.trim().length === 0) return;
                
                try {
                    this.updateStatus('ai', 'processing', 'Processing...');
                    console.log(`ðŸ§  Processing command: "${command}"`);
                    
                    // Add user message to conversation history
                    this.addMessageToHistory('user', command);
                    
                    // ENHANCED: Check if internet search is needed
                    let searchData = null;
                    if (this.needsInternetSearch(command)) {
                        console.log('ðŸ” Internet search detected, gathering current information...');
                        this.updateStatus('ai', 'processing', 'Searching Internet...');
                        
                        const searchQuery = this.extractSearchQuery(command);
                        try {
                            searchData = await this.searchInternet(searchQuery);
                            
                            if (searchData.results && searchData.results.length > 0) {
                                console.log(`âœ… Found ${searchData.results.length} search results from ${searchData.source}`);
                            } else {
                                console.log('âŒ No search results found, continuing with AI knowledge only');
                                // Continue without search data rather than failing
                                searchData = null;
                            }
                        } catch (searchError) {
                            console.log(`âŒ Search failed: ${searchError.message}, continuing with AI knowledge only`);
                            // Continue without search data rather than failing
                            searchData = null;
                        }
                    }
                    
                    this.updateStatus('ai', 'processing', 'Generating Response...');
                    const response = await this.queryAI(command, searchData);
                    
                    if (response) {
                        // Add assistant response to conversation history with search metadata
                        this.addMessageToHistory('assistant', response, {
                            provider: this.currentProvider,
                            model: this.providers[this.currentProvider].model,
                            timestamp: Date.now(),
                            searchUsed: searchData ? true : false,
                            searchQuery: searchData ? this.lastSearchQuery : null,
                            searchResults: searchData ? searchData.results.length : 0
                        });
                        
                        this.speak(response);
                    } else {
                        const errorResponse = "I'm sorry, I couldn't process that command at the moment.";
                        this.addMessageToHistory('assistant', errorResponse, { error: true });
                        this.speak(errorResponse);
                    }
                    
                } catch (error) {
                    console.log(`âŒ Command processing failed: ${error.message}`);
                    console.log('Full error:', error);
                    
                    // More specific error messages
                    let errorMessage = "I encountered an error while processing your request.";
                    if (error.message.includes('API key')) {
                        errorMessage = "Please check your API key configuration in settings.";
                    } else if (error.message.includes('network')) {
                        errorMessage = "I'm having trouble connecting to the AI service.";
                    } else if (error.message.includes('search')) {
                        errorMessage = "I had trouble accessing current internet information, but I'll try to help with my existing knowledge.";
                    }
                    
                    // Add error to conversation history
                    this.addMessageToHistory('assistant', errorMessage, { 
                        error: true, 
                        errorDetails: error.message 
                    });
                    
                    this.speak(errorMessage);
                    const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                    const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                    this.updateStatus('ai', statusType, statusText);
                }
            }

            // ENHANCED AI QUERY with memory context and internet search - No backend needed
            async queryAI(prompt, searchData = null) {
                console.log(`ðŸ¤– Querying AI with memory context and search: "${prompt}"`);
                
                try {
                    if (this.currentProvider === 'ollama') {
                        return await this.queryOllama(prompt, searchData);
                    } else {
                        return await this.queryGemini(prompt, searchData);
                    }
                } catch (error) {
                    console.error('AI query error:', error);
                    throw error;
                }
            }

            // Ollama API with conversation memory and internet search
            async queryOllama(prompt, searchData = null) {
                console.log('ðŸ”„ Using Ollama API with conversation memory and search');
                const enhancedPrompt = this.buildEnhancedPrompt(prompt, searchData);
                
                const requestBody = {
                    model: this.providers.ollama.model,
                    prompt: enhancedPrompt,
                    stream: false,
                    options: {
                        temperature: 0.4,
                        top_p: 0.9,
                        num_predict: searchData ? 200 : 150, // Allow more tokens when using search
                        stop: ['Human:', 'User:', '\n\nHuman:', '\n\nUser:']
                    }
                };

                const startTime = Date.now();
                
                try {
                    console.log(`ðŸ” Calling Ollama with context: ${enhancedPrompt.substring(0, 100)}...`);
                    
                    const response = await fetch(`${this.providers.ollama.url}/api/generate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });

                    if (!response.ok) {
                        throw new Error(`Ollama API error: ${response.status}`);
                    }

                    const data = await response.json();
                    const latency = Date.now() - startTime;
                    document.getElementById('latency').textContent = `${latency} ms`;
                    
                    let response_text = data.response || "I'm afraid I couldn't process that request.";
                    console.log(`âœ… Ollama response with memory: "${response_text}"`);
                    return this.cleanAIResponse(response_text);
                    
                } catch (error) {
                    console.error('Ollama query error:', error);
                    throw error;
                }
            }

            async queryGemini(prompt, searchData = null) {
                console.log('ðŸ”„ Using Gemini API with conversation memory and search');
                if (!this.geminiApiKey) {
                    throw new Error('Gemini API key not configured');
                }
                
                // Build enhanced prompt with conversation context and search
                const enhancedPrompt = this.buildEnhancedPrompt(prompt, searchData);
                
                const requestBody = {
                    contents: [{
                        parts: [{
                            text: enhancedPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        topP: 0.9,
                        maxOutputTokens: searchData ? 200 : 150, // Allow more tokens when using search
                        stopSequences: ['Human:', 'User:']
                    }
                };

                const startTime = Date.now();
                
                try {
                    const url = `${this.providers[this.currentProvider].url}?key=${this.geminiApiKey}`;
                    console.log(`ðŸ” Calling Gemini API with context: ${enhancedPrompt.substring(0, 100)}...`);
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });

                    console.log(`ðŸ“¥ Response status: ${response.status}`);

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        console.log(`âŒ Gemini API error: ${response.status}`, errorData);
                        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'API request failed'}`);
                    }

                    const data = await response.json();
                    
                    const latency = Date.now() - startTime;
                    document.getElementById('latency').textContent = `${latency} ms`;
                    
                    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                        let response_text = data.candidates[0].content.parts[0].text || "I'm afraid I couldn't process that request.";
                        console.log(`âœ… Gemini response with memory: "${response_text}"`);
                        return this.cleanAIResponse(response_text);
                    } else {
                        console.log(`âŒ Unexpected response format:`, data);
                        throw new Error('Unexpected response format from Gemini');
                    }
                    
                } catch (error) {
                    console.error('Gemini query error:', error);
                    throw error;
                }
            }

            // Enhanced prompt building with conversation context and internet search
            buildEnhancedPrompt(userPrompt, searchData = null) {
                const timeOfDay = this.getTimeOfDay();
                const conversationContext = this.buildConversationContext();
                const conversationInfo = this.conversationActive ? 
                    `We are in an ongoing conversation. ${this.getCurrentConversationSummary()}` : 
                    "Starting a new conversation.";
                
                // Add search context if available
                const searchContext = searchData ? this.formatSearchResults(searchData) : '';
                const hasSearchResults = searchData && searchData.results && searchData.results.length > 0;
                
                let prompt = `You are GURU (Global Universal Research Unit), a comprehensive AI assistant with memory and ${hasSearchResults ? 'advanced real-time internet search capabilities' : 'extensive knowledge'}. 

${conversationInfo}

ENHANCED INSTRUCTIONS:
- Be helpful, conversational, and highly informative
- Use conversation history for context and continuity
${hasSearchResults ? '- Leverage comprehensive internet search results for current, accurate information' : ''}
${hasSearchResults ? '- Provide detailed answers using weather data, news, and real-time information when available' : ''}
${hasSearchResults ? '- Cite sources from search results to build credibility' : ''}
${hasSearchResults ? '- For weather queries, include detailed current conditions, temperature, and forecasts' : ''}
${hasSearchResults ? '- For news queries, provide comprehensive current events with context' : ''}
- Adapt response length to topic complexity - detailed explanations for important subjects
- Use markdown formatting for better readability (headers, lists, code when appropriate)
- If information is outdated or unavailable, state limitations clearly
- Current time of day: ${timeOfDay}

${conversationContext}${searchContext}Current user message: ${userPrompt}

Respond as GURU with authority and comprehensive detail${hasSearchResults ? ', utilizing the rich search data provided' : ''}:`;
                
                return prompt;
            }

            // Clean and optimize AI responses - Enhanced for comprehensive answers and TTS
            cleanAIResponse(text) {
                if (!text) return "I apologize, but I couldn't generate a response.";
                
                // Remove common AI prefixes and suffixes
                let cleaned = text
                    .replace(/^(GURU:|Assistant:|AI:|Bot:)/i, '')
                    .trim();
                
                // ENHANCED: Clean up formatting characters for TTS
                cleaned = cleaned
                    // Remove markdown formatting
                    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove **bold**
                    .replace(/\*(.*?)\*/g, '$1')      // Remove *italic*
                    .replace(/_(.*?)_/g, '$1')        // Remove _underline_
                    .replace(/`(.*?)`/g, '$1')        // Remove `code`
                    .replace(/#{1,6}\s*/g, '')        // Remove # headers
                    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove [text](url) links
                    
                    // Clean up punctuation for better TTS
                    .replace(/\s*\*\s*/g, '. ')       // Replace * with period
                    .replace(/\s*â€¢\s*/g, '. ')        // Replace bullets with period
                    .replace(/\s*-\s*/g, '. ')        // Replace dashes with period (when used as bullets)
                    .replace(/\.\.\./g, '. ')         // Replace ... with period
                    .replace(/\s*:\s*/g, ': ')        // Clean up colons
                    .replace(/\s*;\s*/g, '. ')        // Replace semicolons with periods
                    .replace(/\s*,\s*/g, ', ')        // Clean up commas
                    .replace(/\s*\.\s*/g, '. ')       // Clean up periods
                    .replace(/\s*!\s*/g, '! ')        // Clean up exclamations
                    .replace(/\s*\?\s*/g, '? ')       // Clean up questions
                    
                    // Remove extra whitespace
                    .replace(/\s+/g, ' ')
                    .trim();
                
                // Remove repetitive patterns
                cleaned = cleaned.replace(/(.{10,})\1+/g, '$1');
                
                // Allow longer responses for comprehensive information
                // Only limit if response is excessively long (over 1000 characters)
                if (cleaned.length > 1000) {
                    const lastSentence = cleaned.lastIndexOf('.', 1000);
                    if (lastSentence > 500) {
                        cleaned = cleaned.substring(0, lastSentence + 1);
                    } else {
                        cleaned = cleaned.substring(0, 1000) + '.';
                    }
                }
                
                return cleaned || "I apologize, but I couldn't process that request properly.";
            }

            getTimeOfDay() {
                const hour = new Date().getHours();
                if (hour < 12) return 'morning';
                if (hour < 17) return 'afternoon';
                if (hour < 21) return 'evening';
                return 'night';
            }

            // ENHANCED: Multi-provider speech with better stop handling
            async speak(text, isInitial = false) {
                if (this.isSpeaking && !isInitial) return;
                
                // Clean text for TTS before speaking
                text = this.cleanAIResponse(text);
                
                this.isSpeaking = true;
                this.currentSpeaker = 'jarvis';
                this.stopListening();
                this.updateStatus('audio', 'speaking', 'Speaking...');
                console.log(`ðŸ—£ï¸ Speaking: "${text}"`);

                // Cancel any ongoing speech
                this.speechSynthesis.cancel();
                
                // Store current utterance for stop functionality
                this.currentUtterance = null;

                // Start synchronized subtitle display
                this.startSynchronizedSubtitles(text);

                try {
                    // Try ElevenLabs first if available
                    if (this.currentVoiceProvider === 'elevenlabs' && this.elevenLabsApiKey) {
                        const success = await this.speakWithElevenLabs(text);
                        if (success) return;
                        console.log('ðŸ”„ ElevenLabs failed, falling back to Edge TTS...');
                        this.currentVoiceProvider = 'edge';
                    }

                    // Try Edge TTS
                    if (this.currentVoiceProvider === 'edge') {
                        const success = await this.speakWithEdgeTTS(text);
                        if (success) return;
                        console.log('ðŸ”„ Edge TTS failed, falling back to native...');
                        this.currentVoiceProvider = 'native';
                    }

                    // Fallback to native speech synthesis
                    this.speakWithNative(text);

                } catch (error) {
                    console.log(`âŒ Speech error: ${error.message}`);
                    this.speakWithNative(text);
                }
            }

            // ElevenLabs TTS implementation
            async speakWithElevenLabs(text) {
                try {
                    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.elevenLabsVoiceId}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'audio/mpeg',
                            'Content-Type': 'application/json',
                            'xi-api-key': this.elevenLabsApiKey
                        },
                        body: JSON.stringify({
                            text: text,
                            model_id: 'eleven_monolingual_v1',
                            voice_settings: {
                                stability: 0.5,
                                similarity_boost: 0.5
                            }
                        })
                    });

                    if (!response.ok) {
                        if (response.status === 401) {
                            console.log('âŒ ElevenLabs API key invalid');
                        } else if (response.status === 402) {
                            console.log('âŒ ElevenLabs credits exhausted, switching to Edge TTS');
                            this.currentVoiceProvider = 'edge';
                        }
                        throw new Error(`ElevenLabs API error: ${response.status}`);
                    }

                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);

                    return new Promise((resolve) => {
                        audio.onended = () => {
                            URL.revokeObjectURL(audioUrl);
                            this.onSpeechEnd();
                            resolve(true);
                        };

                        audio.onerror = () => {
                            URL.revokeObjectURL(audioUrl);
                            this.onSpeechEnd();
                            resolve(false);
                        };

                        audio.play();
                    });

                } catch (error) {
                    console.log(`âŒ ElevenLabs error: ${error.message}`);
                    return false;
                }
            }

            // Edge TTS implementation (Web Speech API with Edge voices)
            async speakWithEdgeTTS(text) {
                try {
                    // Check if speechSynthesis supports Edge voices
                    const voices = this.speechSynthesis.getVoices();
                    const edgeVoice = voices.find(voice => 
                        voice.name.includes('Microsoft') && 
                        voice.lang.startsWith('en-') &&
                        (voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Guy'))
                    );

                    if (!edgeVoice) {
                        return false;
                    }

                const utterance = new SpeechSynthesisUtterance(text);
                    utterance.voice = edgeVoice;
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                
                    return new Promise((resolve) => {
                        utterance.onend = () => {
                            this.onSpeechEnd();
                            resolve(true);
                        };

                        utterance.onerror = () => {
                            this.onSpeechEnd();
                            resolve(false);
                        };

                        this.speechSynthesis.speak(utterance);
                    });

                } catch (error) {
                    console.log(`âŒ Edge TTS error: ${error.message}`);
                    return false;
                }
            }

            // IMPROVED: Native speech synthesis with better TTS handling
            speakWithNative(text) {
                // First clean the text again to make it more TTS-friendly
                text = this.cleanTextForTTS(text);
                
                // Create and configure utterance
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Slower rate for better clarity
                utterance.rate = 0.85;
                utterance.pitch = 1.0; 
                utterance.volume = 1.0;
                
                // Store for stop functionality
                this.currentUtterance = utterance;
                
                // Try to find a good voice - prioritize natural-sounding ones
                const voices = this.speechSynthesis.getVoices();
                
                // First try premium voices (higher quality)
                let preferredVoice = voices.find(voice => 
                    voice.lang.startsWith('en-') && 
                    (voice.name.includes('Premium') || voice.name.includes('Enhanced'))
                );
                
                // Fall back to standard male voices if no premium ones
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.lang.startsWith('en-') && 
                        (voice.name.toLowerCase().includes('male') || 
                         voice.name.toLowerCase().includes('david') || 
                         voice.name.toLowerCase().includes('guy'))
                    );
                }
                
                // Fall back to any English voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang.startsWith('en-'));
                }
                
                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                    console.log(`ðŸ”Š Using voice: ${preferredVoice.name}`);
                }

                // Add safety timeout in case speech synthesis fails to fire events
                const safetyTimeout = setTimeout(() => {
                    if (this.isSpeaking) {
                        console.log('âš ï¸ Safety timeout triggered for speech end');
                        this.onSpeechEnd();
                    }
                }, text.length * 60 + 5000); // Approximate timeout based on text length
                
                // Set up event handlers
                utterance.onend = () => {
                    clearTimeout(safetyTimeout);
                    this.onSpeechEnd();
                };
                
                utterance.onerror = (event) => {
                    console.log(`âŒ Speech synthesis error: ${event.error}`);
                    clearTimeout(safetyTimeout);
                    this.onSpeechEnd();
                };
                
                // Speak
                this.speechSynthesis.speak(utterance);
            }
            
            // New helper function to clean text specifically for TTS
            cleanTextForTTS(text) {
                return text
                    // Replace special characters that cause TTS issues
                    .replace(/\*/g, '')
                    .replace(/\#/g, '')
                    .replace(/\~/g, '')
                    .replace(/\`/g, '')
                    .replace(/\_/g, '')
                    .replace(/\&/g, ' and ')
                    .replace(/\+/g, ' plus ')
                    .replace(/\=/g, ' equals ')
                    .replace(/\^/g, '')
                    .replace(/\$/g, ' dollars ')
                    
                    // Fix common TTS pronunciation issues
                    .replace(/(\d+)Â°([CF])/g, '$1 degrees $2')  // Temperatures
                    .replace(/(\d+)%/g, '$1 percent')           // Percentages
                    .replace(/etc\./g, 'etcetera')              // etc.
                    .replace(/vs\./g, 'versus')                 // vs.
                    .replace(/e\.g\./g, 'for example')          // e.g.
                    .replace(/i\.e\./g, 'that is')              // i.e.
                    
                    // Add pauses between sentences for more natural speech
                    .replace(/\. /g, '. , ')
                    .replace(/\! /g, '! , ')
                    .replace(/\? /g, '? , ')
                    
                    // Clean up extra spaces
                    .replace(/\s+/g, ' ')
                    .trim();
            }

            // ENHANCED: Ultra-responsive force stop speech with emergency handling
            stopSpeech() {
                console.log('ðŸš¨ EMERGENCY STOP SPEECH INITIATED');
                
                // Cancel speech synthesis immediately (multiple times for reliability)
                try {
                    this.speechSynthesis.cancel();
                    setTimeout(() => this.speechSynthesis.cancel(), 50);
                    setTimeout(() => this.speechSynthesis.cancel(), 100);
                } catch (e) {
                    console.log('Error canceling speech:', e);
                }
                
                // Force reset ALL speech-related states immediately
                this.isSpeaking = false;
                this.currentSpeaker = 'none';
                this.currentUtterance = null;
                
                // Clear ALL speech-related timeouts and intervals
                if (this.speakTimeout) {
                    clearTimeout(this.speakTimeout);
                    this.speakTimeout = null;
                }
                
                if (this.subtitleInterval) {
                    clearInterval(this.subtitleInterval);
                    this.subtitleInterval = null;
                }
                
                if (this.listenTimeout) {
                    clearTimeout(this.listenTimeout);
                    this.listenTimeout = null;
                }
                
                // Stop any Web Audio API sources
                if (this.audioContext) {
                    try {
                        // Stop all audio sources
                        this.audioContext.suspend();
                        setTimeout(() => {
                            if (this.audioContext.state === 'suspended') {
                                this.audioContext.resume();
                            }
                        }, 100);
                    } catch (e) {}
                }
                
                // Stop any HTML5 audio elements
                document.querySelectorAll('audio').forEach(audio => {
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.volume = 0;
                    } catch (e) {}
                });
                
                // Force UI cleanup immediately
                this.hideSubtitle();
                
                // Update status to stopped state
                this.updateStatus('ai', 'offline', 'Speech Stopped');
                
                console.log('ðŸ›‘ ALL SPEECH FORCIBLY TERMINATED');
                
                // Resume normal operation after emergency stop
                setTimeout(() => {
                    // Restore normal AI status
                    const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                    const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                    this.updateStatus('ai', statusType, statusText);
                    
                    // Resume listening if not in manual mode
                    if (!this.manualTalkMode && !this.isListening) {
                        this.updateStatus('audio', 'listening', 'Listening...');
                        this.startListening();
                    }
                }, 300);
            }

            // IMPROVED: Common speech end handler with more robust cleanup
            onSpeechEnd() {
                // Prevent multiple executions if already called
                if (!this.isSpeaking) return;
                
                console.log('ðŸ—£ï¸ Finished speaking');
                
                // Reset all speech state
                this.isSpeaking = false;
                this.currentSpeaker = 'none';
                this.currentUtterance = null;
                
                // Clean up UI
                this.hideSubtitle();
                
                // Clear any subtitle intervals
                if (this.subtitleInterval) {
                    clearInterval(this.subtitleInterval);
                    this.subtitleInterval = null;
                }
                
                // Update AI status
                const statusType = this.currentProvider === 'ollama' ? 'online' : 'cloud';
                const statusText = this.currentProvider === 'ollama' ? 'AI Online (Local)' : 'AI Online (Cloud)';
                this.updateStatus('ai', statusType, statusText);
                
                // Resume listening with a slight delay to prevent feedback loops
                clearTimeout(this.listenTimeout); // Clear any previous timeout
                this.listenTimeout = setTimeout(() => {
                    if (!this.manualTalkMode) {
                        const statusMsg = this.conversationActive ? 'In Conversation...' : 'Listening...';
                        this.updateStatus('audio', 'listening', statusMsg);
                        this.startListening();
                    }
                }, 600);
            }

            // ENHANCED: Robust synchronized subtitle display
            startSynchronizedSubtitles(text) {
                const words = text.split(' ').filter(word => word.trim());
                const wordsPerSecond = 2.8; // More natural speech rate
                const msPerWord = 1000 / wordsPerSecond;
                
                let currentWordIndex = 0;
                let displayText = '';
                
                // Clear any existing interval
                if (this.subtitleInterval) {
                    clearInterval(this.subtitleInterval);
                }
                
                // Show first word immediately
                if (words.length > 0) {
                                            this.showSubtitle(words[0], 'jarvis');
                    currentWordIndex = 1;
                }
                
                this.subtitleInterval = setInterval(() => {
                    if (currentWordIndex < words.length && this.isSpeaking) {
                        // Build text progressively
                        displayText = words.slice(0, currentWordIndex + 1).join(' ');
                        this.showSubtitle(displayText, 'jarvis');
                        currentWordIndex++;
                    } else {
                        // Subtitle complete or speech stopped
                        clearInterval(this.subtitleInterval);
                        this.subtitleInterval = null;
                        
                        // Show full text briefly at the end
                        if (this.isSpeaking) {
                            this.showSubtitle(text, 'jarvis');
                        }
                    }
                }, msPerWord);
            }

            // ENHANCED: Subtitle system (replaces chat)
            showSubtitle(text, speaker) {
                const panel = document.getElementById('subtitlePanel');
                const subtitleText = document.getElementById('subtitleText');
                
                if (panel && subtitleText) {
                subtitleText.textContent = text;
                subtitleText.className = `subtitle-text ${speaker}-speaking`;
                panel.classList.add('active');
                    console.log(`ðŸ“ Subtitle: "${text}" (${speaker})`);
                }
            }

            hideSubtitle() {
                const panel = document.getElementById('subtitlePanel');
                if (panel) {
                panel.classList.remove('active');
                }
                // Clear subtitle interval if running
                if (this.subtitleInterval) {
                    clearInterval(this.subtitleInterval);
                    this.subtitleInterval = null;
                }
            }

            updateAudioVisualization() {
                if (!this.analyser) return;
                
                const audioViz = document.getElementById('audioViz');
                const barCount = 20;
                
                // Create bars if they don't exist
                if (audioViz.children.length !== barCount) {
                    audioViz.innerHTML = '';
                    for (let i = 0; i < barCount; i++) {
                        const bar = document.createElement('div');
                        bar.className = 'audio-bar';
                        audioViz.appendChild(bar);
                    }
                }
                
                // Update bar heights based on audio data
                for (let i = 0; i < barCount; i++) {
                    const dataIndex = Math.floor((i / barCount) * this.audioData.length);
                    const value = this.audioData[dataIndex] / 255;
                    const height = Math.max(2, value * 32);
                    audioViz.children[i].style.height = `${height}px`;
                }
            }

            updateStatus(type, status, text) {
                const statusDot = document.getElementById(`${type}Status`);
                const statusText = document.getElementById(`${type}StatusText`);
                
                statusDot.className = `status-dot status-${status}`;
                statusText.textContent = text;
            }

            startSystemMonitoring() {
                // Update uptime every second
                setInterval(() => {
                    const uptime = Date.now() - this.startTime;
                    const hours = Math.floor(uptime / 3600000);
                    const minutes = Math.floor((uptime % 3600000) / 60000);
                    const seconds = Math.floor((uptime % 60000) / 1000);
                    
                    document.getElementById('uptime').textContent = 
                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }, 1000);

                // Mock CPU usage (you could implement real monitoring)
                setInterval(() => {
                    const usage = 15 + Math.random() * 25;
                    document.getElementById('cpuUsage').textContent = `${usage.toFixed(1)} %`;
                }, 2000);

                // Test connections periodically
                setInterval(() => {
                    if (this.currentProvider === 'ollama' && !this.providers.ollama.connected) {
                        this.testOllamaConnection();
                    }
                }, 30000);
            }

            startConversationMonitoring() {
                // Check for conversation timeout every 30 seconds
                setInterval(() => {
                    if (this.conversationActive && this.lastActivityTime) {
                        const timeSinceActivity = Date.now() - this.lastActivityTime;
                        
                        if (timeSinceActivity > this.conversationTimeout) {
                            console.log('ðŸ• Conversation timed out due to inactivity');
                            this.endConversation(false); // Silent timeout
                        }
                    }
                    
                    // Clean up old conversations (keep last 10)
                    if (this.conversations.size > 10) {
                        const sortedConversations = Array.from(this.conversations.entries())
                            .sort((a, b) => b[1].lastActivity - a[1].lastActivity);
                        
                        // Keep only the 10 most recent conversations
                        const toKeep = sortedConversations.slice(0, 10);
                        this.conversations.clear();
                        toKeep.forEach(([id, conv]) => this.conversations.set(id, conv));
                        
                        console.log('ðŸ§¹ Cleaned up old conversations, kept 10 most recent');
                        this.saveConversations();
                    }
                }, 30000);

                // Save conversations periodically
                setInterval(() => {
                    if (this.conversations.size > 0) {
                        this.saveConversations();
                    }
                }, 60000); // Save every minute
            }
        }

        // Initialize JARVIS when page loads
        window.addEventListener('load', () => {
            console.log('ðŸš€ Starting JARVIS Multi-Provider AI System...');
            window.jarvis = new JarvisAI();
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (window.jarvis) {
                if (document.hidden) {
                    // Page is hidden, you might want to reduce processing
                } else {
                    // Page is visible, resume full functionality
                    if (!window.jarvis.isListening && window.jarvis.isInitialized && !window.jarvis.manualTalkMode) {
                        window.jarvis.startListening();
                    }
                }
            }
        });

        // Resume audio context on user interaction
        document.addEventListener('click', () => {
            if (window.jarvis && window.jarvis.audioContext && window.jarvis.audioContext.state === 'suspended') {
                window.jarvis.audioContext.resume();
                console.log('ðŸŽµ Audio context resumed by user interaction');
            }
        });

